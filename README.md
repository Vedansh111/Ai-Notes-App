# AI-Powered Notes App

An AI-powered notes application that allows users to create, update, delete, and summarize notes with the help of OpenAI's GPT models. This app stores user notes in a database and generates short summaries for each note using AI.

## Features

- **Create Notes:** Add new notes with titles and content.
- **Update Notes:** Edit existing notes.
- **Delete Notes:** Remove notes permanently.
- **AI Summarization:** Generate a concise 1-2 line summary for each note using OpenAI.
- **User Authentication:** Sign in and create personal notes with authentication.

## Tech Stack

- **Frontend:** React (with Next.js)
- **Backend:** Node.js with Supabase (for database and authentication)
- **AI Integration:** OpenAI or other AI services (for summarization)
- **Authentication:** Supabase or other OAuth solutions
- **Deployment:** Vercel / Netlify (for frontend), Heroku or other cloud providers (for backend)

## Installation

### Prerequisites

1. **Node.js** - Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
2. **Supabase Account** - You'll need a Supabase account to manage your database. Sign up at [Supabase](https://supabase.io/).
3. **OpenAI API Key** - To use the AI summarization feature, you'll need an OpenAI API key. You can get it from [OpenAI](https://beta.openai.com/signup/).

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ai-powered-notes-app.git
   cd ai-powered-notes-app

   ```

2. **Install dependencies**
   npm install

3. **Setup Environment Variables**

   - Create a .env.local file in the root of the project.
   - Add the following variables (replace with your actual keys and URL):


    ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key

   ```
  

4. **Run the application**

   Start the development server:
   ```bash
   npm run dev

   ```
   

   Visit http://localhost:3000 in your browser to view the application.
