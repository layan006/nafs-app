# NAFS

**NAFS** is an AI fitness coach that gives personalized training guidance based on your goal, experience, equipment and schedule.

**Live demo:** _coming soon_

## Features

- Profile form (age, sex, height, weight, goal, experience, equipment, days per week, session length, limitations) with metric and imperial units
- AI coach that builds plans around your profile and answers follow-up questions
- Structured plain-text answers, with sets, reps and rest times
- Safety behavior: not a medical professional, refers to a doctor for pain or medical concerns, adults only
- Responsive design for desktop and mobile
- Loading, empty and error states, keyboard-friendly and accessible forms
- No accounts and no database: the profile is stored only in your browser

## Tech stack

- **Frontend:** HTML, CSS and vanilla JavaScript
- **Backend:** Node.js and Express 5
- **AI:** Groq API (OpenAI-compatible) through the `openai` SDK
- **Security and validation:** Helmet, express-rate-limit, Zod, CORS allowlist

## Getting started

**Requirements:** Node.js 20 or newer and a free [Groq API key](https://console.groq.com/keys).

```bash
git clone https://github.com/YOUR-USERNAME/REPO-NAME.git
cd REPO-NAME
npm install
cp .env.example .env     # on Windows PowerShell: Copy-Item .env.example .env
```

Open `.env` and set your key:

```
GROQ_API_KEY=your_key_here
```

Start the app:

```bash
npm run dev
```

Then open http://localhost:3000.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | Your Groq API key. Used only on the server. |
| `GROQ_MODEL` | No | Model name. Defaults to `openai/gpt-oss-120b`. |
| `PORT` | No | Server port. Defaults to `3000`. |
| `NODE_ENV` | No | Set to `production` when deployed. |
| `ALLOWED_ORIGINS` | No | Comma-separated origins allowed to call the API from another site. |

## Project structure

```
nafs-app/
├── public/          # Frontend (index.html, css/, js/, assets/)
├── server/
│   └── ai.js        # Groq call and system prompt (the only provider-specific file)
├── server.js        # Express app: security, validation, rate limiting, routes
├── .env.example
└── package.json
```

## How it works

1. The browser validates the profile and stores it in `localStorage`.
2. Each question is sent to `POST /ask` with the profile and the last few messages.
3. The server validates everything with Zod, then builds a system prompt plus profile and calls Groq.
4. Errors from the provider are converted to friendly messages. The API key never reaches the browser.

## Security notes

- API key kept in environment variables and ignored by Git
- Strict input validation (types, ranges, unknown fields rejected) and a 32 KB body limit
- Rate limit of 20 requests per 15 minutes per visitor
- Content Security Policy and other headers through Helmet
- User-written text is rendered with `textContent`, never as HTML
- The system prompt treats profile text and messages as data, not instructions

## Limitations

- The coach is an AI assistant, not a medical professional.
- The free Groq tier has shared rate limits, so heavy traffic may see "coach is busy" messages.
- Conversations are not saved. Reloading starts a new chat.

## Future improvements

- Saved workout history with optional accounts
- Streaming responses
- Exportable plans
- Arabic interface

## License

MIT
