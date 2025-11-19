import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Player {
  id: string;
  username: string;
  avatar: string;
  rating: number;
}

interface GameRoomProps {
  gameId: string;
  gameName: string;
  gameEmoji: string;
  roomCode: string;
  onLeave: () => void;
}

const emojis = ['😊', '😎', '🔥', '👍', '❤️', '🎉', '😂', '💪', '🤔', '👏', '🙌', '✨'];

const GameRoom = ({ gameId, gameName, gameEmoji, roomCode, onLeave }: GameRoomProps) => {
  const [player1] = useState<Player>({
    id: '1',
    username: 'Игрок',
    avatar: '',
    rating: 1200
  });

  const [player2, setPlayer2] = useState<Player | null>(null);
  const [isWaiting, setIsWaiting] = useState(true);
  const [messages, setMessages] = useState<Array<{ playerId: string; emoji: string; timestamp: number }>>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayer2({
        id: '2',
        username: 'Противник',
        avatar: '',
        rating: 1180
      });
      setIsWaiting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const sendEmoji = (emoji: string) => {
    setMessages([...messages, { playerId: player1.id, emoji, timestamp: Date.now() }]);
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.timestamp > Date.now() - 3000));
    }, 3000);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="p-6 mb-6 bg-card/50 backdrop-blur-xl border-muted/30 glow-effect">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-5xl">{gameEmoji}</div>
              <div>
                <h2 className="text-2xl font-bold gradient-text">{gameName}</h2>
                <p className="text-sm text-muted-foreground">Код комнаты: <span className="font-mono text-primary">{roomCode}</span></p>
              </div>
            </div>
            <Button variant="outline" onClick={onLeave} className="border-destructive/50 text-destructive hover:bg-destructive/10">
              <Icon name="X" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div>
            <Card className="aspect-square bg-gradient-to-br from-muted/20 via-muted/10 to-muted/20 backdrop-blur-xl border-muted/30 flex items-center justify-center relative overflow-hidden">
              {isWaiting ? (
                <div className="text-center animate-fade-in">
                  <div className="text-7xl mb-4 animate-pulse">⏳</div>
                  <p className="text-2xl font-medium gradient-text">Ожидание противника...</p>
                  <p className="text-sm text-muted-foreground mt-2">Отправь ссылку другу</p>
                </div>
              ) : (
                <div className="text-center animate-scale-in">
                  <div className="text-8xl mb-6 animate-bounce">{gameEmoji}</div>
                  <p className="text-3xl font-bold gradient-text">Игра начинается!</p>
                  <p className="text-muted-foreground mt-2">Здесь будет игровое поле</p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="absolute text-6xl animate-scale-in"
                  style={{
                    left: `${Math.random() * 60 + 20}%`,
                    top: `${Math.random() * 60 + 20}%`,
                  }}
                >
                  {msg.emoji}
                </div>
              ))}
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-4 bg-card/50 backdrop-blur-xl border-muted/30">
              <h3 className="text-sm font-medium mb-3">Игроки</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg border border-primary/20">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={player1.avatar} />
                    <AvatarFallback>{player1.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{player1.username}</div>
                    <Badge variant="outline" className="text-xs">
                      {player1.rating}
                    </Badge>
                  </div>
                  <div className="text-xl">⚪</div>
                </div>

                {player2 ? (
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-secondary/20">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={player2.avatar} />
                      <AvatarFallback>{player2.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{player2.username}</div>
                      <Badge variant="outline" className="text-xs">
                        {player2.rating}
                      </Badge>
                    </div>
                    <div className="text-xl">⚫</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">Ожидание...</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-4 bg-card/50 backdrop-blur-xl border-muted/30">
              <h3 className="text-sm font-medium mb-3">Реакции</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Icon name="Smile" size={18} className="mr-2" />
                    Отправить эмодзи
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="grid grid-cols-4 gap-2">
                    {emojis.map((emoji) => (
                      <Button
                        key={emoji}
                        variant="ghost"
                        className="text-3xl h-14 hover:scale-110 transition-transform"
                        onClick={() => sendEmoji(emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </Card>

            <Card className="p-4 bg-card/50 backdrop-blur-xl border-muted/30">
              <h3 className="text-sm font-medium mb-3">Статистика</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ход:</span>
                  <span className="font-medium">Белые</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Время:</span>
                  <span className="font-medium font-mono">10:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ходов:</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;