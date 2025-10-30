# Educ.AI - Artificial Intelligence API

Educ.AI is an advanced educational AI API that leverages artificial intelligence to generate educational content, transcribe audio, extract text from multiple sources, and create personalized learning materials. The system uses Google's Gemini AI and OpenAI models to provide intelligent educational assistance.

## 🎯 Overview

This API serves as the backbone for the Educ.AI platform, providing intelligent content processing and generation capabilities for educational purposes. It handles multiple input formats (documents, audio, video, URLs) and transforms them into structured educational materials including study guides, questions, and personalized feedback.

## ✨ Features

### Core Functionalities

#### 📄 Document Processing
- **Multi-format text extraction** from various document types:
  - PDF documents (`.pdf`)
  - Microsoft Word documents (`.docx`)
  - Plain text files (`.txt`)
  - CSV files (`.csv`)
- Automatic format detection and content extraction
- Preserve text structure and formatting

#### 🎤 Audio Processing
- **Audio transcription** using Google Cloud Speech-to-Text
- Support for MP3 audio files
- Automatic upload to Google Cloud Storage
- High-accuracy speech recognition
- English language support (configurable)

#### 🎥 YouTube Integration
- **Extract transcripts** from YouTube videos
- Automatic video ID extraction from URLs
- Support for multiple YouTube URL formats
- Combine transcript segments into coherent text

#### 🌐 Web Scraping
- **Extract content from web pages**
- Automated URL scraping with Puppeteer
- Clean HTML parsing with Cheerio
- Handle dynamic web content

#### 🤖 AI-Powered Features

##### Educational Content Generation
- **Generate comprehensive study materials** from multiple sources
- Combine inputs from:
  - YouTube videos
  - Documents (PDF, Word, TXT, CSV)
  - Audio files
  - Web URLs
  - Custom instructions
- AI-powered content synthesis and organization
- Export as professionally formatted PDF

##### Question Generation
- **Create educational questions** automatically
- Customizable parameters:
  - Number of questions
  - Difficulty level
  - Theme/subject
  - Related themes
- Multiple choice format with correct answer keys
- JSON-formatted output for easy integration

##### AI Chat Assistance
- **Interactive educational chat** powered by AI
- Support for multiple AI models:
  - Google Gemini
  - OpenAI (via Azure)
- Context-aware responses
- Conversation history support

##### Personalized Feedback
- **Generate student feedback reports**
- Analyze chat conversations
- Create personalized recommendations
- Export feedback as PDF reports
- Student-specific insights

#### 📊 PDF Generation
- **Professional PDF creation** from AI-generated content
- Customizable templates
- Support for multiple AI models (Gemini/OpenAI)
- Headers and footers
- Proper formatting and styling

### Technical Features

- **RESTful API** with Express.js
- **CORS support** for allowed origins
- **File upload handling** with Multer
- **TypeScript** for type safety
- **Error handling** and validation
- **Cloud integration** with Google Cloud Services
- **Multi-model AI support** (Gemini and OpenAI)

## 🛠️ Technology Stack

### Languages & Runtime
- **TypeScript** - Primary language with strict type checking
- **Node.js** - Runtime environment (v18.x)

### Frameworks & Libraries
- **Express.js** (v4.19.2) - Web framework
- **LangChain** (v0.1.31) - AI model orchestration
- **@langchain/google-genai** (v0.0.10) - Google Gemini integration
- **@langchain/core** (v0.1.54) - LangChain core functionality

### AI & ML Services
- **Google Cloud Speech-to-Text** (@google-cloud/speech v6.5.0)
- **Google Gemini AI** - Text generation and chat
- **OpenAI** (via Azure) - Alternative AI model
- **Replicate** (v0.29.1) - AI model hosting

### Document Processing
- **pdf-parse** (v1.1.1) - PDF text extraction
- **pdf-lib** (v1.17.1) - PDF manipulation
- **mammoth** (v1.7.1) - Word document processing
- **Cheerio** (v1.0.0-rc.12) - HTML parsing

### Cloud Services
- **@google-cloud/storage** (v7.11.0) - Cloud storage
- **Google Cloud Platform** - Infrastructure

### Web Scraping & Automation
- **Puppeteer** (v19.11.1) - Headless browser automation
- **axios** (v1.6.8) - HTTP client

### Utilities
- **Multer** (v1.4.5-lts.1) - File upload handling
- **Handlebars** (v4.7.8) - Template engine
- **dotenv-cli** (v7.4.2) - Environment configuration
- **youtube-transcript** (v1.1.0) - YouTube transcript extraction

### Development Tools
- **ts-node** (v10.9.2) - TypeScript execution
- **@types/express** - Express type definitions
- **@types/multer** - Multer type definitions
- **@types/pdf-parse** - PDF-parse type definitions

## 🏗️ Architecture

### Project Structure

```
educai-ai-api/
├── src/
│   ├── app.ts                    # Application entry point
│   ├── routes/
│   │   └── index.ts              # API route definitions
│   ├── services/                 # Business logic layer
│   │   ├── convertTextToPdf/     # PDF generation
│   │   ├── generateQuestions/    # Question generation
│   │   ├── getEduResponse/       # AI chat responses
│   │   ├── getEducationalResource/ # Content aggregation
│   │   ├── getFeedback/          # Feedback generation
│   │   ├── getTextFromYoutube/   # YouTube processing
│   │   ├── getTranscription/     # Audio transcription
│   │   ├── scrapeUrl/            # Web scraping
│   │   └── TranscribeAudio/      # Audio processing
│   ├── clients/                  # External service clients
│   │   ├── google-client.ts      # Google Gemini client
│   │   ├── openai-client.ts      # OpenAI client
│   │   └── replicate-client.ts   # Replicate client
│   ├── models/                   # Data models & types
│   │   ├── Question.ts           # Question type definition
│   │   └── ResourcesUploaded.ts  # Resource input types
│   └── types/                    # TypeScript type definitions
│       ├── BrowserOptions.ts
│       ├── TranscriptSegment.ts
│       └── index.ts
├── test/                         # Test files
├── dist/                         # Compiled JavaScript output
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── key.json                      # Google Cloud service account key
└── .env                          # Environment variables

```

### Data Flow

1. **Input Processing**: Files/URLs/text received via REST endpoints
2. **Content Extraction**: Service layer extracts/processes content based on type
3. **AI Processing**: Content sent to AI models (Gemini/OpenAI) for generation
4. **Output Generation**: Results formatted and returned (JSON/PDF)

### Key Components

- **Express Server** (`app.ts`): Handles HTTP requests, CORS, and routing
- **Route Handler** (`routes/index.ts`): Maps endpoints to service functions
- **Service Layer** (`services/*`): Implements business logic and AI integration
- **Clients** (`clients/*`): Manages connections to external AI services
- **Models** (`models/*`): Defines data structures and types

## 📋 Prerequisites

- **Node.js** v18.x or higher
- **npm** or **yarn** package manager
- **Google Cloud Platform account** with:
  - Speech-to-Text API enabled
  - Cloud Storage API enabled
  - Service account with appropriate permissions
- **API Keys**:
  - Google API Key (for Gemini)
  - GitHub Token (for OpenAI via Azure)
- **Google Cloud Storage Bucket** (`educai-bucket` or custom name)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/educ-ai-org/educai-ai-api.git
cd educai-ai-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Google Cloud

1. Create a Google Cloud project
2. Enable Speech-to-Text and Cloud Storage APIs
3. Create a service account and download the JSON key
4. Save the key as `key.json` in the project root

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Google AI
GOOGLE_API_KEY=your_google_api_key_here

# OpenAI (Azure)
GITHUB_TOKEN=your_github_token_for_azure_openai

# Environment
ENVIROMENT=development
```

### 5. Build the Project

```bash
npm run build
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GOOGLE_API_KEY` | Google Gemini API key | Yes | - |
| `GITHUB_TOKEN` | GitHub token for Azure OpenAI access | Yes | - |
| `ENVIROMENT` | Environment (development/production) | No | development |

### Google Cloud Storage

- Default bucket: `educai-bucket`
- Audio files are uploaded with their original filenames
- Files are referenced using `gs://` URIs

### CORS Configuration

Allowed origins are configured in `src/app.ts`:
- `http://localhost:5173`
- `http://20.51.193.153`
- `http://educai.eastus.cloudapp.azure.com`
- `https://main.d1xp88b22uwwmk.amplifyapp.com`
- `https://www.educai.xyz`

## 🎮 Usage

### Starting the Server

#### Development Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

#### Production Mode

```bash
npm run build
node dist/app.js
```

### Health Check

```bash
curl http://localhost:3000/health
```

Expected response: `OK`

## 📡 API Reference

### Endpoints

#### 1. Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```
OK
```

---

#### 2. Extract Text from File

**POST** `/extract-text`

Extract text from uploaded documents (PDF, Word, TXT, CSV).

**Request:**
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `file`: Document file (PDF, DOCX, TXT, CSV)

**Response:**
```json
{
  "text": "Extracted text content..."
}
```

**Example (curl):**
```bash
curl -X POST http://localhost:3000/extract-text \
  -F "file=@document.pdf"
```

---

#### 3. Extract YouTube Transcript

**POST** `/youtube-extract`

Extract transcript from a YouTube video.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "text": "Video transcript text..."
}
```

**Example (curl):**
```bash
curl -X POST http://localhost:3000/youtube-extract \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

---

#### 4. Scrape Web URL

**POST** `/scrape-url`

Extract content from a web page.

**Request:**
```json
{
  "url": "https://example.com/article"
}
```

**Response:**
```json
{
  "text": "Scraped web page content..."
}
```

**Example (curl):**
```bash
curl -X POST http://localhost:3000/scrape-url \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

---

#### 5. Audio Transcription

**POST** `/transcription`

Transcribe audio file to text using Google Speech-to-Text.

**Request:**
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `file`: Audio file (MP3)

**Response:**
```json
{
  "text": "Transcribed audio text..."
}
```

**Example (curl):**
```bash
curl -X POST http://localhost:3000/transcription \
  -F "file=@audio.mp3"
```

---

#### 6. AI Chat Response

**POST** `/edu-response`

Get AI-powered educational responses.

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Explain photosynthesis"
    }
  ],
  "openai": false
}
```

**Parameters:**
- `messages`: Array of conversation messages
- `openai`: Boolean (true for OpenAI, false for Gemini)

**Response:**
```json
{
  "response": "AI generated response..."
}
```

**Example (curl):**
```bash
curl -X POST http://localhost:3000/edu-response \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "What is AI?"}],
    "openai": false
  }'
```

---

#### 7. Convert Text to PDF

**POST** `/convert-text-to-pdf`

Convert text content to a formatted PDF document.

**Request:**
```json
{
  "content": "Text content to convert...",
  "model": "gemini"
}
```

**Parameters:**
- `content`: Text content to convert
- `model`: AI model used for generation ("gemini" or "openai")

**Response:**
- PDF file download

**Example (curl):**
```bash
curl -X POST http://localhost:3000/convert-text-to-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "content": "# My Study Guide\n\nThis is the content...",
    "model": "gemini"
  }' \
  --output output.pdf
```

---

#### 8. Generate Educational Resource

**POST** `/generate-educational-resource?model=gemini`

Generate comprehensive educational materials from multiple sources.

**Request:**
- **Content-Type:** `multipart/form-data`
- **Query Parameters:**
  - `model`: AI model to use ("gemini" or "openai", default: "gemini")
- **Body:**
  - `youtubeLink`: (optional) YouTube video URL
  - `document`: (optional) Document file
  - `audio`: (optional) Audio file
  - `instructions`: (optional) Additional instructions

**Response:**
- PDF file with generated educational content

**Example (curl):**
```bash
curl -X POST "http://localhost:3000/generate-educational-resource?model=gemini" \
  -F "youtubeLink=https://www.youtube.com/watch?v=VIDEO_ID" \
  -F "document=@lecture.pdf" \
  -F "instructions=Create a comprehensive study guide" \
  --output study-guide.pdf
```

---

#### 9. Generate Questions

**POST** `/generate-questions`

Generate educational questions from content sources.

**Request:**
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `youtubeLink`: (optional) YouTube video URL
  - `document`: (optional) Document file
  - `audio`: (optional) Audio file
  - `instructions`: (optional) Additional instructions
  - `numberOfQuestions`: Number of questions to generate
  - `level`: Difficulty level (e.g., "beginner", "intermediate", "advanced")
  - `theme`: Main topic/subject
  - `relatedTheme`: Related topics

**Response:**
```json
[
  {
    "description": "What is the primary function of mitochondria?",
    "correctAnswerKey": "B",
    "options": [
      {
        "key": "A",
        "description": "Protein synthesis"
      },
      {
        "key": "B",
        "description": "Energy production"
      },
      {
        "key": "C",
        "description": "DNA replication"
      },
      {
        "key": "D",
        "description": "Cell division"
      }
    ]
  }
]
```

**Example (curl):**
```bash
curl -X POST http://localhost:3000/generate-questions \
  -F "document=@biology-notes.pdf" \
  -F "numberOfQuestions=5" \
  -F "level=intermediate" \
  -F "theme=Cell Biology" \
  -F "relatedTheme=Organelles"
```

---

#### 10. Generate Feedback Report

**POST** `/feedback`

Generate personalized student feedback from chat conversations.

**Request:**
```json
{
  "messages": [
    {
      "message": "What is photosynthesis?",
      "isUser": true
    },
    {
      "message": "Photosynthesis is the process...",
      "isUser": false
    }
  ],
  "studentName": "John Doe",
  "model": "gemini"
}
```

**Parameters:**
- `messages`: Array of conversation messages
- `studentName`: Student's name for personalization
- `model`: AI model to use

**Response:**
- PDF file with personalized feedback report

**Example (curl):**
```bash
curl -X POST http://localhost:3000/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"message": "Question about topic", "isUser": true},
      {"message": "AI response", "isUser": false}
    ],
    "studentName": "John Doe",
    "model": "gemini"
  }' \
  --output feedback-report.pdf
```

---

## 💻 Development

### Running in Development Mode

```bash
npm start
```

This uses `dotenv-cli` to load environment variables and `ts-node` to run TypeScript directly.

### Building the Project

```bash
npm run build
```

This compiles TypeScript files to JavaScript in the `dist/` directory.

### Code Structure Guidelines

- **Services**: Put business logic in `src/services/`
- **Routes**: Define API endpoints in `src/routes/`
- **Clients**: External service integrations in `src/clients/`
- **Models**: Type definitions in `src/models/`
- **Types**: Reusable types in `src/types/`

### TypeScript Configuration

The project uses strict TypeScript configuration:
- Strict mode enabled
- ES2016 target
- CommonJS modules
- Output to `dist/` directory

## 🚢 Deployment

### CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

1. **CI Pipeline** (on push to main):
   - Version bumping and tagging
   - Dependency installation
   - TypeScript compilation
   - Artifact creation

2. **CD Pipeline**:
   - Artifact deployment to AWS VM
   - Docker container orchestration
   - Environment configuration

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Copy required files to server:
   - `dist/` directory
   - `package.json`
   - `key.json` (Google Cloud credentials)
   - `.env` file

3. Install production dependencies:
```bash
npm install --production
```

4. Start the server:
```bash
node dist/app.js
```

### Docker Deployment

The project is configured for Docker deployment (see `.github/workflows/main.yml`).

### Environment-Specific Configuration

- Set `ENVIROMENT=production` in production
- Ensure all API keys are properly configured
- Configure CORS origins for your domain
- Set up proper logging and monitoring

## 🐛 Troubleshooting

### Common Issues

#### 1. "No file uploaded" Error

**Problem:** File upload endpoint returns 400 error.

**Solution:**
- Ensure you're using `multipart/form-data` content type
- Check that the field name matches the endpoint specification
- Verify file size is within limits

#### 2. Google Cloud Authentication Failed

**Problem:** Transcription or storage operations fail.

**Solution:**
- Verify `key.json` exists in project root
- Check service account has required permissions
- Ensure APIs are enabled in Google Cloud Console

#### 3. "File format not supported" Error

**Problem:** Document extraction fails.

**Solution:**
- Check file mimetype is supported:
  - PDF: `application/pdf`
  - Word: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
  - Text: `text/plain`
  - CSV: `text/csv`

#### 4. YouTube Transcript Extraction Fails

**Problem:** Cannot extract transcript from YouTube video.

**Solution:**
- Verify video has captions/subtitles available
- Check if video is publicly accessible
- Ensure URL format is correct

#### 5. CORS Errors

**Problem:** Browser requests are blocked by CORS policy.

**Solution:**
- Add your frontend origin to the allowed origins list in `src/app.ts`
- Restart the server after changes

### Debug Mode

To enable detailed logging, set the environment to development:

```env
ENVIROMENT=development
```

### Logs Location

- Application logs: Console output
- Google Cloud Storage: Google Cloud Console
- Speech-to-Text: Google Cloud Console

### Getting Help

If you encounter issues:
1. Check the error message in console logs
2. Verify all environment variables are set correctly
3. Ensure all required APIs are enabled in Google Cloud
4. Check network connectivity to external services

## 📄 API Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Missing or invalid parameters |
| 500 | Internal Server Error - Check server logs |

## 🔒 Security Considerations

- API keys should never be committed to version control
- Use environment variables for sensitive data
- Implement rate limiting in production
- Validate and sanitize all user inputs
- Keep dependencies up to date
- Use HTTPS in production
- Restrict CORS origins to trusted domains

## 📝 License

This project is part of the Educ.AI platform.

## 👥 Contributors

Developed by the Educ.AI team.

## 🙏 Acknowledgments

- Google Cloud Platform for AI and cloud services
- OpenAI for language models
- LangChain for AI orchestration
- The open-source community for excellent libraries

---

**Note:** This API is designed specifically for educational purposes and integrates with the Educ.AI learning platform. For access and usage questions, please contact the project maintainers.