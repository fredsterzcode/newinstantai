# InstantList.ai - AI Website Builder

Create beautiful, professional websites instantly with AI. Just describe what you want and watch your website come to life.

## Features

- 🤖 **AI-Powered Generation**: Create complete websites from natural language descriptions
- ⚡ **Lightning Fast**: Generate websites in seconds, not hours
- 🎨 **Professional Quality**: Modern, responsive designs with best practices
- 💳 **Credit System**: Pay only for what you use
- 🔄 **Iterative Improvements**: Refine your website with additional prompts
- 📱 **Responsive Design**: All websites work perfectly on any device
- 🔐 **User Authentication**: Secure account system with Supabase
- 💾 **Download Ready**: Get production-ready HTML files

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT-4
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key

### 1. Clone the Repository

```bash
git clone https://github.com/fredsterzcode/newinstantai.git
cd newinstantai
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

### 4. Database Setup

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the contents of `database-setup.sql` to create the necessary tables

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

### Users Table
- `id`: UUID (references auth.users)
- `email`: TEXT (unique)
- `credits`: INTEGER (default: 5)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Websites Table
- `id`: UUID (primary key)
- `user_id`: UUID (references users)
- `prompt`: TEXT (user's description)
- `html`: TEXT (generated HTML)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## API Endpoints

### POST /api/generate-site
Generates a website from a prompt.

**Request Body:**
```json
{
  "prompt": "Create a modern landing page for a tech startup"
}
```

**Response:**
```json
{
  "website": {
    "id": "uuid",
    "prompt": "string",
    "html": "string",
    "created_at": "timestamp"
  },
  "remainingCredits": 4
}
```

## Usage

1. **Sign Up/Login**: Create an account or sign in
2. **Describe Your Website**: Enter a detailed description of what you want
3. **Generate**: Click "Generate Website" to create your site
4. **Preview**: View your website in the preview panel
5. **Iterate**: Use the "Improve" feature to refine your website
6. **Download**: Get your production-ready HTML file

## Pricing

- **$2 per website generation**
- **5 free credits** for new users
- **Unlimited iterations** on existing websites
- **No monthly fees**

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
3. Deploy automatically on push to main branch

### Build Command
```bash
npm run build
```

## Development

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── auth-form.tsx      # Authentication form
│   ├── header.tsx         # Navigation header
│   └── website-builder.tsx # Main builder component
├── lib/                   # Utility libraries
│   ├── auth-context.tsx   # Authentication context
│   ├── supabase.ts        # Supabase client
│   └── icons.tsx          # Custom icons
├── api/                   # API routes
│   └── generate-site/     # Website generation endpoint
└── database-setup.sql     # Database schema
```

### Key Components

- **AuthProvider**: Manages user authentication state
- **WebsiteBuilder**: Main interface for website generation
- **AuthForm**: User registration and login
- **Header**: Navigation and user info display

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support, email support@instantlist.ai or create an issue in the repository.

---

Built with ❤️ using Next.js, Supabase, and OpenAI 