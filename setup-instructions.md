# 🚀 Setting Up Article Publishing Platform in VS Code

## Step 1: Create New Project
```bash
# Create project directory
mkdir article-publishing-platform
cd article-publishing-platform

# Initialize React + TypeScript project
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install
```

## Step 2: Install Additional Dependencies
```bash
# Install Supabase and UI libraries
npm install @supabase/supabase-js lucide-react

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Step 3: Configure Tailwind CSS
Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Step 4: Copy Project Files
Copy all the component files from this interface to your local project:

### Required Files:
- `src/App.tsx`
- `src/components/ArticleEditor.tsx`
- `src/components/ArticleList.tsx`
- `src/components/ArticleView.tsx`
- `src/components/AuthForm.tsx`
- `src/components/ImageUpload.tsx`
- `src/hooks/useAuth.ts`
- `src/hooks/useArticles.ts`
- `src/lib/supabase.ts`
- `src/types/Article.ts`
- `.env.example`

## Step 5: Environment Setup
1. Copy `.env.example` to `.env`
2. Add your Supabase credentials
3. Set up Supabase database (click "Connect to Supabase" button)

## Step 6: Run Development Server
```bash
npm run dev
```

## Step 7: Open in VS Code
```bash
code .
```

Your project is now ready for development in VS Code!