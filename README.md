# SafeBridge AI

**You're never alone. Your first safe conversation starts here.**

SafeBridge AI is an AI-powered early-support platform that helps children, teenagers, and adults
safely express difficult experiences, privately document their thoughts, learn about abuse
awareness, and connect with trusted organizations and support resources.

> **The AI does not replace therapists, doctors, lawyers, or emergency services.**
> It is designed to be the first safe conversation — a bridge to real human help, not a
> substitute for it.

---

## Table of contents

- [Problem](#problem)
- [Solution](#solution)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Deployment](#deployment)
- [Future roadmap](#future-roadmap)
- [Responsible AI](#responsible-ai)

---

## Problem

Most people who experience abuse, bullying, or serious hardship tell no one for a long time —
often over a year. The first step (telling a trusted adult, calling a helpline, naming what
happened) feels too big to take alone, and existing resources are frequently written for adults,
buried in dense language, or hard to find in the moment they're needed.

## Solution

SafeBridge AI lowers the barrier to that first step with:

1. A private, judgment-free AI Companion that adapts its tone to the person's age and always
   routes serious disclosures toward trusted adults or emergency services.
2. A private journal for processing thoughts at their own pace.
3. Age-appropriate education on safety, consent, and healing.
4. A directory of verified helplines, NGOs, and emergency contacts by country.

## Features

| Feature | Description |
|---|---|
| 🤖 AI Companion | ChatGPT-style chat, age-tiered system prompts, independent crisis-keyword safety net |
| 📖 Journal | Create/edit/delete entries, mood tracking, optional AI reflection summaries |
| 📚 Learn | 8 topics: Safe Touch, Unsafe Touch, Consent, Bullying, Online Safety, Healing, Helping a Friend, Emotional Wellbeing |
| 🆘 Find Help | Country selector with verified helplines, NGOs, WHO/UNICEF links |
| 🔐 Auth | Email/password, Google sign-in, password reset (Firebase Auth) |
| 🎯 Onboarding | Age-tier selection (Child 8–12 / Teen 13–17 / Young Adult 18–24 / Adult 25+) drives AI behavior |

## Tech stack

- **Framework:** Next.js 15+ (App Router), TypeScript
- **Styling:** Tailwind CSS v4, custom design tokens, glassmorphism
- **Auth & data:** Firebase Authentication, Firestore
- **AI:** Google Gemini API (`gemini-2.0-flash`), called server-side only
- **Deployment:** Vercel

## Architecture

```
src/
├── app/
│   ├── page.tsx                      Landing page
│   ├── login/, signup/, forgot-password/
│   ├── onboarding/                   Age-tier selection
│   ├── dashboard/                    4-card hub
│   ├── companion/                    AI Companion chat UI
│   ├── journal/                      Private journal
│   ├── learn/, learn/[slug]/         Safety education
│   ├── help/                         Public — no auth required
│   ├── about/
│   └── api/
│       ├── chat/route.ts             Server-side Gemini proxy + crisis safety net
│       └── journal-summary/route.ts  Non-diagnostic AI journal reflections
├── components/
│   ├── ui/                           Button, Card, Input, MoodPicker, etc.
│   └── layout/                       Navbar, Footer, AuthShell, AuthGuard, DashboardShell
├── lib/
│   ├── firebase.ts, auth-context.tsx
│   ├── gemini-prompts.ts             Age-tiered system prompts (safety-critical — read before editing)
│   ├── journal.ts, types.ts
└── content/
    ├── learn-topics.ts               Real, researched safety-education content
    └── help-resources.ts             Verified helpline data by country
```

### Why the API keys never reach the browser

`GEMINI_API_KEY` is only read inside `src/app/api/*/route.ts` (server-side Next.js route
handlers). The client sends only an age tier and message history; the system prompt is looked up
server-side from a fixed table the client cannot influence.

## Screenshots

_Add screenshots here after your first deploy: landing page, AI Companion, Journal, Learn topic
page, and Find Help._

## Installation

```bash
git clone <your-repo-url>
cd safebridge-ai
npm install
cp .env.local.example .env.local
# Fill in .env.local with your Firebase project config and Gemini API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Firebase setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication** → Email/Password and Google sign-in providers.
3. Create a **Firestore** database (start in production mode, add rules restricting each user to
   their own `users/{uid}` and `journalEntries` where `uid == request.auth.uid`).
4. Copy your web app config into `.env.local`.

### Gemini setup

1. Get an API key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
2. Add it to `.env.local` as `GEMINI_API_KEY` (no `NEXT_PUBLIC_` prefix — it must stay
   server-side).

## Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

Add the same environment variables from `.env.local` in your Vercel project settings
(Settings → Environment Variables), then redeploy.

## Future roadmap

- [ ] Multi-language support (starting with Urdu, Spanish, French)
- [ ] Optional parent/guardian dashboard for the Child tier, with the child's consent
- [ ] Expanded country coverage in Find Help, sourced from Child Helpline International's API
- [ ] Human-reviewed escalation: connect directly to a live crisis counselor from the AI Companion
- [ ] Clinical, legal, and child-safety professional review of all AI system prompts
- [ ] Accessibility audit (screen reader pass, WCAG 2.2 AA compliance check)
- [ ] Anonymous / no-account mode for the AI Companion for people not ready to sign up

## Responsible AI

- **Not a replacement.** The AI Companion does not replace therapists, doctors, lawyers, or
  emergency services.
- **No diagnosis, no legal advice.** System prompts explicitly forbid diagnosing conditions or
  giving legal guidance.
- **Safety over engagement.** A keyword-based crisis safety net runs independently of the model,
  so real crisis resources are surfaced even if a single model response underplays a disclosure.
- **Age-appropriate by design.** Tone and vocabulary adapt per age tier; the underlying safety
  rules never change.
- **Privacy first.** Journal entries and chats are private per account; nothing is sold or used
  to train external models.
- **This is a solo-built MVP.** The prompts in `lib/gemini-prompts.ts` are a strong starting
  scaffold, not a finished safety system — they have not yet been reviewed by a clinical
  psychologist, child-safety specialist, or lawyer. That review is a prerequisite before any
  real-world deployment involving actual children.

---

© SafeBridge AI. Built for safety, not for diagnosis.
