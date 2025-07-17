# 📝 Interactive Article Publishing Platform

A modern, full-featured article publishing platform built with React, TypeScript, and Supabase.

## 🚀 Features

- **Rich Text Editor** with bold/italic formatting
- **Image Upload** with drag & drop support
- **Article Management** (create, edit, delete, publish)
- **User Authentication** with secure login
- **Real-time Database** with Supabase
- **Responsive Design** for all devices
- **Preview Mode** for articles
- **Tag System** for organization

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- VS Code
- Supabase account

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Environment Setup
1. Click "Connect to Supabase" button in the interface
2. Copy your Supabase URL and Anon Key
3. Update the `.env` file with your credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
- The app will be available at `http://localhost:5173`
- Hot reload is enabled for instant updates

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── ArticleEditor.tsx
│   │   ├── ArticleList.tsx
│   │   ├── ArticleView.tsx
│   │   ├── AuthForm.tsx
│   │   └── ImageUpload.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useArticles.ts
│   ├── lib/                # Utilities
│   │   └── supabase.ts
│   ├── types/              # TypeScript types
│   │   └── Article.ts
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── supabase/
│   └── migrations/         # Database migrations
├── package.json
└── README.md
```

## 🗄️ Database Schema

The application uses Supabase with the following table:

### Articles Table
- `id` - Unique identifier
- `title` - Article title
- `content` - Rich HTML content
- `excerpt` - Auto-generated summary
- `cover_image` - Cover image URL
- `author` - Author name
- `published` - Publication status
- `tags` - Article tags (array)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
- `user_id` - User reference (auth)

## 🔐 Authentication

- Email/password authentication via Supabase Auth
- Row Level Security (RLS) enabled
- Users can only access their own articles
- Secure session management

## 🚀 Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

## 📝 Usage

1. **Sign Up/Sign In** - Create account or login
2. **Create Article** - Click "New Article" button
3. **Rich Editing** - Use formatting tools and image upload
4. **Preview** - Toggle preview mode to see final result
5. **Publish** - Set publish status and save
6. **Manage** - View, edit, or delete existing articles

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Development Tips

- Use VS Code with TypeScript extension
- Hot reload is enabled for instant feedback
- Check browser console for any errors
- Use React Developer Tools for debugging

## 📄 License

MIT License - feel free to use for personal or commercial projects.