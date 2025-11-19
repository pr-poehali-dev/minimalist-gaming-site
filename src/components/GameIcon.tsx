interface GameIconProps {
  gameId: string;
  size?: number;
}

const GameIcon = ({ gameId, size = 64 }: GameIconProps) => {
  const iconSize = size;
  
  const renderIcon = () => {
    switch (gameId) {
      case 'chess':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="18" r="6" fill="url(#chess-gradient)" />
            <path d="M26 24 L20 54 L44 54 L38 24 Z" fill="url(#chess-gradient)" />
            <rect x="18" y="54" width="28" height="4" rx="2" fill="url(#chess-gradient)" />
            <defs>
              <linearGradient id="chess-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(271, 91%, 65%)" />
                <stop offset="100%" stopColor="hsl(195, 100%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        );
      
      case 'checkers':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="28" r="14" fill="url(#checkers-gradient)" opacity="0.9" />
            <circle cx="32" cy="28" r="10" fill="none" stroke="url(#checkers-gradient)" strokeWidth="2" />
            <ellipse cx="32" cy="28" rx="14" ry="4" fill="url(#checkers-gradient)" opacity="0.5" />
            <defs>
              <linearGradient id="checkers-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(271, 91%, 65%)" />
                <stop offset="100%" stopColor="hsl(195, 100%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        );
      
      case 'battleship':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 35 L15 25 L49 25 L54 35 L52 45 L12 45 Z" fill="url(#battleship-gradient)" />
            <rect x="20" y="18" width="4" height="7" fill="url(#battleship-gradient)" />
            <rect x="30" y="15" width="4" height="10" fill="url(#battleship-gradient)" />
            <rect x="40" y="18" width="4" height="7" fill="url(#battleship-gradient)" />
            <path d="M12 45 L10 50 L54 50 L52 45 Z" fill="url(#battleship-gradient)" opacity="0.7" />
            <defs>
              <linearGradient id="battleship-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(271, 91%, 65%)" />
                <stop offset="100%" stopColor="hsl(195, 100%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        );
      
      case 'connect4':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="12" width="40" height="40" rx="4" fill="url(#connect4-gradient)" opacity="0.2" />
            <circle cx="22" cy="22" r="4" fill="url(#connect4-gradient)" />
            <circle cx="32" cy="22" r="4" fill="url(#connect4-gradient)" opacity="0.7" />
            <circle cx="42" cy="22" r="4" fill="url(#connect4-gradient)" opacity="0.7" />
            <circle cx="22" cy="32" r="4" fill="url(#connect4-gradient)" opacity="0.7" />
            <circle cx="32" cy="32" r="4" fill="url(#connect4-gradient)" />
            <circle cx="42" cy="32" r="4" fill="url(#connect4-gradient)" opacity="0.7" />
            <circle cx="22" cy="42" r="4" fill="url(#connect4-gradient)" opacity="0.7" />
            <circle cx="32" cy="42" r="4" fill="url(#connect4-gradient)" opacity="0.7" />
            <circle cx="42" cy="42" r="4" fill="url(#connect4-gradient)" />
            <defs>
              <linearGradient id="connect4-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(271, 91%, 65%)" />
                <stop offset="100%" stopColor="hsl(195, 100%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        );
      
      case 'tictactoe':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="24" y1="12" x2="24" y2="52" stroke="url(#tictactoe-gradient)" strokeWidth="2" strokeLinecap="round" />
            <line x1="40" y1="12" x2="40" y2="52" stroke="url(#tictactoe-gradient)" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="24" x2="52" y2="24" stroke="url(#tictactoe-gradient)" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="40" x2="52" y2="40" stroke="url(#tictactoe-gradient)" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="16" x2="36" y2="24" stroke="url(#tictactoe-gradient)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="36" y1="16" x2="28" y2="24" stroke="url(#tictactoe-gradient)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="18" cy="46" r="5" stroke="url(#tictactoe-gradient)" strokeWidth="2.5" fill="none" />
            <defs>
              <linearGradient id="tictactoe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(271, 91%, 65%)" />
                <stop offset="100%" stopColor="hsl(195, 100%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        );
      
      case 'quoridor':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="12" width="40" height="40" stroke="url(#quoridor-gradient)" strokeWidth="2" fill="none" />
            <line x1="22" y1="12" x2="22" y2="52" stroke="url(#quoridor-gradient)" strokeWidth="1" opacity="0.3" />
            <line x1="32" y1="12" x2="32" y2="52" stroke="url(#quoridor-gradient)" strokeWidth="1" opacity="0.3" />
            <line x1="42" y1="12" x2="42" y2="52" stroke="url(#quoridor-gradient)" strokeWidth="1" opacity="0.3" />
            <line x1="12" y1="22" x2="52" y2="22" stroke="url(#quoridor-gradient)" strokeWidth="1" opacity="0.3" />
            <line x1="12" y1="32" x2="52" y2="32" stroke="url(#quoridor-gradient)" strokeWidth="1" opacity="0.3" />
            <line x1="12" y1="42" x2="52" y2="42" stroke="url(#quoridor-gradient)" strokeWidth="1" opacity="0.3" />
            <rect x="25" y="25" width="14" height="3" rx="1.5" fill="url(#quoridor-gradient)" />
            <rect x="37" y="35" width="3" height="14" rx="1.5" fill="url(#quoridor-gradient)" />
            <circle cx="17" cy="47" r="3" fill="url(#quoridor-gradient)" />
            <circle cx="47" cy="17" r="3" fill="url(#quoridor-gradient)" opacity="0.6" />
            <defs>
              <linearGradient id="quoridor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(271, 91%, 65%)" />
                <stop offset="100%" stopColor="hsl(195, 100%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="inline-flex items-center justify-center">
      {renderIcon()}
    </div>
  );
};

export default GameIcon;
