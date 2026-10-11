# ShopEase AI-Powered E-commerce App

ShopEase is a modern e-commerce storefront built with React, Vite, Bootstrap, and Redux Toolkit. The app includes product browsing, category filtering, search, cart management, and AI-generated product summaries powered by Google Gemini.

## Features

- Responsive storefront with hero section and curated product collection
- Product category navigation and filtering
- Search and sorting for product discovery
- Product detail pages with image gallery, color selection, quantity controls, and stock info
- Shopping cart with add/remove functionality
- AI-generated product summaries using Gemini API
- Mock product catalog and category data

## Tech Stack

- React 19
- Vite 8
- React Router DOM
- Redux Toolkit
- Bootstrap 5
- Google GenAI SDK

## Project Structure

```text
src/
├── api/
│   └── ai.service.js
├── Components/
│   ├── CartList.jsx
│   ├── Categories.jsx
│   ├── Home.jsx
│   ├── ProductById.jsx
│   └── ProductCard.jsx
├── Layout/
│   ├── Footer.jsx
│   └── Header.jsx
├── Slices/
│   ├── cartSlice.js
│   └── search.js
├── Store/
│   └── Store.js
├── App.jsx
├── App.css
├── index.css
├── main.jsx
└── assets/
public/
├── assets/
│   └── mock/
│       ├── Category.json
│       └── Products.json
└── favicon.ico
```

## Prerequisites

- Node.js 18 or later
- npm 9 or later

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Ai-powered-Ecommerce-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

The app will be available at the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev     # Start the development server
npm run build   # Build the app for production
npm run preview # Preview the production build locally
npm run lint    # Run ESLint checks
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_GEMINI_API_KEY` | Yes for AI summaries | Google Gemini API key used by the AI summary feature |

## How AI Summary Works

The product detail page includes a "🤖 Get AI Summary" button. When clicked, the app calls the Gemini model through `src/api/ai.service.js` and generates a short product overview based on the selected product data.

If the API key is missing or invalid, the app displays a friendly error message instead of crashing.

## Data Sources

The app loads product and category data from JSON files under `public/assets/mock/`:

- `public/assets/mock/Products.json`
- `public/assets/mock/Category.json`

## Notes

This project is intended as a frontend storefront demo and includes mock product data rather than a real backend or payment system.

## License

This project is for educational/demo purposes unless otherwise specified by the repository owner.
