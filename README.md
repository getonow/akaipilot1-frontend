# Akaipilot1 Frontend

A modern React frontend application built with TypeScript, Vite, and Tailwind CSS. This application was originally created using [Famous.ai](https://famous.ai) and is designed to be connected to various backend services.

## 🚀 Live Demo

Visit the live application: [https://getonow.github.io/akaipilot1-frontend/](https://getonow.github.io/akaipilot1-frontend/)

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   └── pages/          # Page-specific components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── pages/              # Main page components
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/getonow/akaipilot1-frontend.git
cd akaipilot1-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `master` branch triggers a new deployment.

### Manual Deployment

If you need to deploy manually:

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist/` directory

## 🔗 Backend Integration

This frontend is designed to be connected to various backend services. The application includes:

- API output placeholders for backend integration
- Chat interface components
- Data visualization components
- Form handling for backend communication

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need support, please open an issue on GitHub.
