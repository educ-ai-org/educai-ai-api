import { load } from 'cheerio';

const RE_YOUTUBE =
  /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;

const RE_CAPTION_TRACKS = /"captionTracks":\s*(\[.*?\])/;

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)';

export interface YoutubeTranscriptResponse {
  text: string;
  duration: number;
  offset: number;
}

export interface YoutubeFetchConfig {
  /**
   * Locale code
   * @example en, es, hk, uk
   */
  lang?: string;
}

export class YoutubeTranscriptError extends Error {
  constructor(message: string) {
    super(`[YoutubeTranscript] ${message}`);
  }
}

// Adicionando a interface para os objetos em captionTracks
interface CaptionTrack {
  languageCode: string;
  baseUrl?: string; // Assumindo que esse objeto também contenha a propriedade baseUrl.
}

/**
 * Fetch transcript from Youtube Video
 * @param {string} videoUrlOrId - Video url or identifier
 * @param {YoutubeFetchConfig} [config]
 * @return {Promise<YoutubeTranscriptResponse[]>} - If locale available, the localized transcription or default or null.
 */
export const fetchTranscript = async (
  videoUrlOrId: string,
  config: YoutubeFetchConfig = {}
): Promise<YoutubeTranscriptResponse[]> => {
  try {
    const videoId = getVideoId(videoUrlOrId);

    if (!videoId) {
      throw new Error('Invalid Youtube video identifier.');
    }

    const url = await getTranscriptUrl(videoId, config?.lang ?? 'en');

    if (!url) {
      throw new Error('Transcription unavailable.');
    }

    return await getTranscript(url);
  } catch (err) {
    throw new YoutubeTranscriptError(String(err));
  }
};

/**
 * @deprecated Use named export `fetchTranscript`.
 */
export const YoutubeTranscript = {
  fetchTranscript,
};

const getTranscriptUrl = async (identifier: string, lang?: string) => {
  const response = await fetch(`https://www.youtube.com/watch?v=${identifier}`, {
    headers: {
      'User-Agent': USER_AGENT,
    },
  });
  const body = await response.text();

  return getCaptionTrack(body, lang);
};

const getTranscript = async (url: string): Promise<YoutubeTranscriptResponse[]> => {
  const response = await fetch(url);
  const body = await response.text();

  const $ = load(body);

  return $('text')
    .map((_, element) => ({
      text: $(element).text(),
      offset: toMs($(element).attr('start') ?? '0'),
      duration: toMs($(element).attr('dur') ?? '0'),
    }))
    .get();
};

const getCaptionTrack = (
  html: string,
  lang?: string
): string | null => {
  try {
    const captionTracks: CaptionTrack[] = JSON.parse(html.match(RE_CAPTION_TRACKS)?.[1] ?? '[]');

    return (
      ((lang && captionTracks.find((e: CaptionTrack) => e.languageCode.includes(lang))) || captionTracks[0])
        ?.baseUrl ?? null
    );
  } catch (err) {
    throw new YoutubeTranscriptError(String(err));
  }
};

const getVideoId = (videoId: string) => {
  if (videoId.length === 11) {
    return videoId;
  }

  return getVideoIdFromSearchParams(videoId) || videoId.match(RE_YOUTUBE)?.[1] || null;
};

const getVideoIdFromSearchParams = (videoId: string) => {
  try {
    return new URL(videoId).searchParams.get('v');
  } catch (err) {
    return null;
  }
};

const toMs = (n: string): number => Math.round(parseFloat(n) * 1000);
