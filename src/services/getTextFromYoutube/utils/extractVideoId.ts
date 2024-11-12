const URL_PATTERNS = {
  standard: /(?:v=|\/)([\w-]{11})(?:\?|&|\/|$)/,
  shortened: /youtu\.be\/([\w-]{11})(?:\?|&|\/|$)/,
  embed: /embed\/([\w-]{11})(?:\?|&|\/|$)/
}

export function extractVideoId(urlOrId: string): string {
  if (/^[\w-]{11}$/.test(urlOrId)) {
    return urlOrId
  }

  for (const pattern of Object.values(URL_PATTERNS)) {
    const match = urlOrId.match(pattern)
    if (match?.[1]) {
      return match[1]
    }
  }

  throw new Error('URL do YouTube inválida ou ID do vídeo incorreto')
}
