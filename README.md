# AI YouTube Automation App

A full-stack application for automating YouTube video creation using AI. Generate trending content, create scripts, produce videos, and upload directly to YouTube.

## 🎯 Features

- **Trending Topic Finder** - Discover what's trending across multiple categories
- **AI Script Generator** - Generate scripts using 5 different templates
- **AI Image/Video Generation** - Create stunning visuals with AI
- **Voiceover Generation** - Multi-language text-to-speech
- **Automatic Subtitles** - Auto-generate subtitles for accessibility
- **YouTube Upload** - Direct upload with metadata management
- **Modern Dashboard** - Beautiful, responsive UI with Tailwind CSS

## 🏗️ Tech Stack

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + OAuth
- **AI Services**: 
  - OpenAI GPT-4 (Script generation)
  - Replicate (Image/Video generation)
  - Eleven Labs (Voiceover)
  - Assembly AI (Subtitles)
- **APIs**: YouTube Data API

### Frontend
- **Framework**: React 18+ with Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v6

## 📁 Project Structure

```
ai-youtube-automation/
├── backend/
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── upload.js
│   │   └── validation.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── scripts.js
│   │   ├── videos.js
│   │   ├── uploads.js
│   │   └── trending.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── TrendingTopics.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── projects.js
│   │   ├── store/
│   │   │   └── authSlice.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account
- API keys for: OpenAI, Eleven Labs, Assembly AI, Replicate, YouTube

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your API keys to `.env`

5. Start development server:
   ```bash
   npm run dev
   ```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Set API URL in `.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

App runs on `http://localhost:5173`

## 🔑 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=your_supabase_database_url
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

# JWT
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret

# AI & APIs
OPENAI_API_KEY=your_openai_key
ELEVEN_LABS_API_KEY=your_eleven_labs_key
ASSEMBLY_AI_API_KEY=your_assembly_ai_key
REPLICATE_API_TOKEN=your_replicate_token
YOUTUBE_API_KEY=your_youtube_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/duplicate` - Duplicate project

### Scripts
- `GET /api/scripts/templates/list` - Get script templates
- `POST /api/scripts/generate` - Generate script
- `POST /api/scripts/improve` - Improve script
- `POST /api/scripts/:id/variations` - Generate variations

### Videos
- `POST /api/videos/generate-image` - Generate images
- `POST /api/videos/generate-video` - Generate videos
- `POST /api/videos/voiceover` - Generate voiceover
- `POST /api/videos/subtitles` - Generate subtitles
- `POST /api/videos/:projectId/combine` - Combine assets

### Uploads
- `POST /api/uploads/youtube` - Upload to YouTube
- `PUT /api/uploads/youtube/:videoId` - Update metadata
- `DELETE /api/uploads/youtube/:videoId` - Delete video

### Trending
- `GET /api/trending/topics/:category` - Get trending by category
- `POST /api/trending/topics/search` - Search topics
- `GET /api/trending/hashtags` - Get trending hashtags
- `POST /api/trending/saved` - Save topic
- `GET /api/trending/saved` - Get saved topics

## 🔄 Data Flow

1. **User Registration/Login** - Authenticate via JWT
2. **Create Project** - Initialize a new video project
3. **Find Trending Topics** - Browse and save trending content
4. **Generate Script** - AI creates script from topic
5. **Generate Media** - Create images/video/voiceover
6. **Combine Assets** - Merge all components
7. **Upload to YouTube** - Direct upload with metadata

## 🛠️ Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 💡 Features to Implement

- [ ] Complete Supabase integration
- [ ] YouTube OAuth integration
- [ ] Video composition with FFmpeg
- [ ] Enhanced error handling
- [ ] Unit tests
- [ ] E2E tests
- [ ] Deployment to Vercel/Railway
- [ ] Advanced analytics dashboard
- [ ] Batch video processing
- [ ] Scheduled uploads

## 📞 Support

For support, email support@example.com or create an issue in the repository.

---

**Made with ❤️ by Bapugouda01**
