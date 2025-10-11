# Environment Configuration

This document describes the available environment variables for Conquest UI configuration.

## Setup

1. Copy `.env.example` (when available) to `.env.local`
2. Update the values as needed for your environment
3. **Never commit `.env.local` to version control**

## Available Variables

### API Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_URL` | Backend API URL | Same origin | No |
| `REACT_APP_WS_URL` | WebSocket URL for real-time features | `ws://localhost:8080/ws` | No |

### Development Settings

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_DEBUG` | Enable debug mode | `false` (prod), `true` (dev) | No |
| `REACT_APP_LOG_LEVEL` | Logging level | `info` | No |

### Game Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_DEFAULT_GAME_MODE` | Default game mode | `single-player` | No |
| `REACT_APP_MAX_PLAYERS` | Maximum number of players | `2` | No |

### Analytics (Optional)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_ANALYTICS_ID` | Analytics tracking ID | None | No |
| `REACT_APP_ANALYTICS_URL` | Analytics service URL | None | No |

### Performance

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_ENABLE_PERFORMANCE_MONITORING` | Enable performance monitoring | `false` | No |

### Security

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_CSP_ENABLED` | Enable Content Security Policy | `true` | No |
| `REACT_APP_CONTENT_SECURITY_POLICY` | Custom CSP directives | Secure defaults | No |

## Example Configuration

```env
# Development environment
REACT_APP_API_URL=http://localhost:8080
REACT_APP_WS_URL=ws://localhost:8080/ws
REACT_APP_DEBUG=true
REACT_APP_LOG_LEVEL=debug
REACT_APP_DEFAULT_GAME_MODE=single-player

# Production environment
REACT_APP_API_URL=https://api.conquest-game.com
REACT_APP_WS_URL=wss://api.conquest-game.com/ws
REACT_APP_DEBUG=false
REACT_APP_ANALYTICS_ID=GA_MEASUREMENT_ID
```

## Security Notes

- 🔒 Never commit sensitive information like API keys or passwords
- 🔒 Use environment-specific files (`.env.local`, `.env.production`, etc.)
- 🔒 The application validates and sanitizes all environment variable inputs
- 🔒 Default values prioritize security when variables are not set
