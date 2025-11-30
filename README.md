# Arizona Housing Construction Dashboard

An interactive React dashboard displaying Arizona housing construction data from 2011-2025. Built with React, TypeScript, Chart.js, and Tailwind CSS.

## Features

- **Interactive Line Chart**: Visualize housing construction trends over time
- **County Selection**: Select individual counties or view all counties at once
- **Data Table**: Clickable table rows to quickly switch between counties
- **Color-Coded Visualization**: Each county has a unique color for easy identification
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Cloudflare Pages

### Option 1: Deploy via Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Connect your Git repository (GitHub/GitLab)
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (or leave empty)
5. Click **Save and Deploy**

### Option 2: Deploy via Wrangler CLI

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Deploy:
   ```bash
   wrangler pages deploy dist --project-name=azleague-housing-construction
   ```

### Suggested Domain

The project is configured for deployment at: `azleague-housing-construction.pages.dev`

## Project Structure

```
housing-construction/
├── public/
│   ├── azleague-logo.png    # Arizona League logo
│   └── favicon.ico          # Site favicon
├── src/
│   ├── components/
│   │   └── Dashboard.tsx    # Main dashboard component
│   ├── data.json            # Housing construction data
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── wrangler.toml            # Cloudflare Pages configuration
└── package.json
```

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Chart.js** - Chart visualization library
- **react-chartjs-2** - React wrapper for Chart.js
- **Tailwind CSS** - Utility-first CSS framework

## Data Source

The housing construction data includes all 15 Arizona counties plus the state total, covering the period from 2011 to 2025.

## License

This project is for the Arizona League of Cities and Towns.
