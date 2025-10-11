# Conquest UI

A modern React-based user interface for a card game, featuring WebAssembly-powered backend game logic, real-time multiplayer support, and an intuitive Material-UI design.

![Game Screenshot](https://via.placeholder.com/800x400/4a90e2/ffffff?text=Conquest+Card+Game)

## 🎮 Features

- **Real-time Gameplay**: Single-player vs AI or multiplayer against human opponents
- **WebAssembly Backend**: High-performance game logic compiled to WebAssembly
- **Responsive Design**: Built with Material-UI for optimal experience across devices
- **Audio Integration**: Immersive sound effects for game actions
- **Multi-language Support**: Spanish game terminology and actions
- **Cross-platform**: Runs in any modern web browser

## 🏗️ Architecture

```
├── Frontend (React + Material-UI)
│   ├── Components (Game UI, Cards, Dialogs)
│   ├── Game State Managers (Single/Multiplayer)
│   └── Audio System
├── Backend (WebAssembly)
│   ├── Game Logic
│   ├── AI Implementation
│   └── State Management
└── Assets
    ├── Card Images
    ├── Audio Files
    └── Styling
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/conquest-ui.git
   cd conquest-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   # or
   pnpm start
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the game.

## 🛠️ Development

### Available Scripts

- `npm start` - Start the development server
- `npm run build` - Create a production build
- `npm test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages

### Project Structure

```
src/
├── components/          # React components
│   ├── Game.js         # Main game component
│   ├── Card.js         # Card display component
│   ├── ConquestDialog.js # Modal dialogs
│   └── ...
├── game.css            # Game-specific styles
├── multiplayerGameStateManager.js # Multiplayer logic
├── singlePlayerGameStateManager.js # Single-player logic
├── audio.js            # Audio management
└── index.js            # App entry point

public/
├── wasm/               # WebAssembly backend
├── img/                # Card images and assets
└── audio/              # Sound effects
```

## 🎯 Game Features

### Single Player
- Play against AI opponent
- Practice game mechanics
- Debug mode available

### Multiplayer
- Connect to game server
- Real-time gameplay
- Player vs player action

### Game Mechanics
- Card selection and playing
- Action buttons (Envido, Truco, etc.)
- Score tracking
- Round management

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_DEBUG=true
```

### WebAssembly Backend

The game logic is implemented in WebAssembly. The WASM files are located in `public/wasm/` and include:
- `wasm.wasm` - Compiled game logic
- `wasm_exec.js` - Go WebAssembly runtime

## 🌐 Deployment

### GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

The app will be available at `https://yourusername.github.io/conquest-ui/`

### Other Platforms

This app can be deployed to any static hosting service:
- Vercel
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- 📧 **Email**: julian@example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/conquest-ui/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/conquest-ui/discussions)

## 🙏 Acknowledgments

- Material-UI for the component library
- React team for the framework
- Go WebAssembly for the backend implementation
- Card game enthusiasts for inspiration

---

**Happy Gaming! 🎴**
