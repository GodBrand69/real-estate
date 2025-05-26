export const cyberpunkTheme = {
  colors: {
    primary: '#00ff9f', // Neon green
    secondary: '#ff00ff', // Neon pink
    accent: '#00ffff', // Neon cyan
    background: '#0a0a0f', // Dark background
    surface: '#1a1a2e', // Darker surface
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
      accent: '#00ff9f'
    },
    border: '#2a2a3a',
    error: '#ff3e3e',
    success: '#00ff9f',
    warning: '#ffd700'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #00ff9f 0%, #00ffff 100%)',
    secondary: 'linear-gradient(135deg, #ff00ff 0%, #ff3e3e 100%)',
    surface: 'linear-gradient(135deg, #1a1a2e 0%, #2a2a3a 100%)'
  },
  shadows: {
    neon: '0 0 10px rgba(0, 255, 159, 0.5), 0 0 20px rgba(0, 255, 159, 0.3)',
    glow: '0 0 15px rgba(0, 255, 255, 0.5)',
    dark: '0 4px 6px rgba(0, 0, 0, 0.3)'
  },
  animations: {
    glow: 'glow 2s ease-in-out infinite alternate',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  }
};

// Add these keyframes to your global CSS
export const cyberpunkKeyframes = `
@keyframes glow {
  from {
    box-shadow: 0 0 5px rgba(0, 255, 159, 0.5),
                0 0 10px rgba(0, 255, 159, 0.3);
  }
  to {
    box-shadow: 0 0 10px rgba(0, 255, 159, 0.8),
                0 0 20px rgba(0, 255, 159, 0.5);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
`; 