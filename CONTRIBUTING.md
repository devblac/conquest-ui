# Contributing to Conquest UI

Thank you for your interest in contributing to Conquest UI! 🎮 We welcome contributions from everyone. By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/conquest-ui.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Run tests: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to your branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 🛠️ Development Setup

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher (comes with Node.js)
- Git

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

### Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # CSS and styling
├── audio.js            # Audio management
├── game.css            # Game-specific styles
└── index.js            # App entry point
```

## 📝 Making Changes

### Code Style

We use ESLint and Prettier for code formatting. The project is configured to automatically format code on commit.

```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix

# Format code
npm run format
```

### Commit Messages

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

**Examples:**
```
feat: add multiplayer support
fix: resolve card selection bug in mobile view
docs: update API documentation
```

### Testing

We use Jest and React Testing Library for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Update snapshots
npm run test:update
```

**Testing Guidelines:**
- Write tests for new features
- Update tests when changing existing functionality
- Aim for good test coverage (>80%)
- Use descriptive test names

## 🎯 Pull Request Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number-description
   ```

2. **Make Changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed
   - Ensure all tests pass

3. **Commit Changes**
   - Use conventional commit format
   - Keep commits focused and atomic
   - Write clear commit messages

4. **Push and Create PR**
   - Push your branch to GitHub
   - Create a Pull Request with a clear title and description
   - Fill out the PR template completely

5. **Code Review**
   - Address review comments
   - Make requested changes
   - Ensure CI checks pass

### PR Template

When creating a Pull Request, please fill out the template with:
- Clear description of changes
- Screenshots/videos for UI changes
- Testing instructions
- Related issues

## 🐛 Reporting Bugs

Before reporting a bug, please:
1. Check existing issues
2. Create a minimal reproduction case
3. Include browser/OS information
4. Provide steps to reproduce

Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug-report.md).

## 💡 Feature Requests

We love new ideas! When requesting features:
1. Check if the feature already exists
2. Describe the problem you're trying to solve
3. Provide use cases and examples
4. Consider implementation complexity

Use our [Feature Request Template](.github/ISSUE_TEMPLATE/feature-request.md).

## 🎨 Design Guidelines

### UI/UX
- Follow Material Design principles
- Ensure responsive design
- Maintain consistent spacing and typography
- Test on multiple screen sizes

### Component Structure
```jsx
// Good: Clear component structure
const Card = ({ id, displayName, cardType, isRevealed, handleAction }) => {
  return (
    <div className="card" onClick={handleAction}>
      {isRevealed ? displayName : 'Hidden'}
    </div>
  );
};

// Avoid: Complex components with too many responsibilities
const ComplexCard = ({ card, gameState, player, actions, ...props }) => {
  // Too many props, too complex
};
```

### State Management
- Use React hooks for local state
- Keep components focused on UI concerns
- Move business logic to custom hooks or utilities

## 🔧 WebAssembly Backend

The game logic is implemented in WebAssembly (Go). To contribute to the backend:

1. The backend code is separate from this repository
2. Changes to game logic should be made in the backend project
3. Update the WASM files in `public/wasm/` when deploying

## 📚 Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions
- Keep inline comments clear and helpful
- Update TypeScript types if applicable

## 🚀 Deployment

### GitHub Pages

```bash
# Build and deploy
npm run deploy
```

### Environment Variables

For local development, create `.env.local`:

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_DEBUG=true
```

## 🤝 Communication

- **Discussions**: Use [GitHub Discussions](https://github.com/yourusername/conquest-ui/discussions) for questions
- **Issues**: Bug reports and feature requests
- **Pull Requests**: Code contributions
- **Email**: julian@example.com for private matters

## 📋 Checklist for Contributors

- [ ] Code follows project style guidelines
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Commit messages follow conventional format
- [ ] PR description is clear and complete
- [ ] Changes are tested on multiple browsers
- [ ] No console errors or warnings

## 🎉 Recognition

Contributors will be recognized in:
- Repository contributors list
- Release notes
- Special mentions for significant contributions

Thank you for contributing to Conquest UI! 🚀
