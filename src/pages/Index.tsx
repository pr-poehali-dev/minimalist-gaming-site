import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GameRoom from '@/components/GameRoom';

interface Game {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  description: string;
}

interface UserProfile {
  username: string;
  avatar: string;
  ratings: Record<string, number>;
  gamesPlayed: number;
}

const games: Game[] = [
  { id: 'chess', name: 'Шахматы', icon: 'Crown', emoji: '♟️', description: 'Классическая игра королей' },
  { id: 'checkers', name: 'Шашки', icon: 'Circle', emoji: '⚫', description: 'Простая и захватывающая' },
  { id: 'battleship', name: 'Морской бой', icon: 'Ship', emoji: '🚢', description: 'Потопи флот противника' },
  { id: 'connect4', name: '4 в ряд', icon: 'Grid3x3', emoji: '🔴', description: 'Собери четыре фишки' },
  { id: 'tictactoe', name: 'Крестики-нолики', icon: 'X', emoji: '❌', description: 'Быстрая партия' }
];

const Index = () => {
  const [user, setUser] = useState<UserProfile>({
    username: 'Игрок',
    avatar: '',
    ratings: {
      chess: 1200,
      checkers: 1150,
      battleship: 1100,
      connect4: 1050,
      tictactoe: 1000
    },
    gamesPlayed: 42
  });

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [inGameRoom, setInGameRoom] = useState(false);

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    setIsCreatingRoom(true);
  };

  const enterGame = () => {
    setInGameRoom(true);
  };

  const leaveGame = () => {
    setInGameRoom(false);
    setIsCreatingRoom(false);
    setRoomCode('');
    setSelectedGame(null);
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}?room=${roomCode}&game=${selectedGame?.id}`;
    navigator.clipboard.writeText(link);
  };

  if (inGameRoom && selectedGame) {
    return (
      <GameRoom
        gameId={selectedGame.id}
        gameName={selectedGame.name}
        gameEmoji={selectedGame.emoji}
        roomCode={roomCode}
        onLeave={leaveGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎮</div>
            <h1 className="text-2xl font-bold">GameHub</h1>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 hover:bg-muted">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium">{user.username}</div>
                  <div className="text-xs text-muted-foreground">{user.gamesPlayed} игр</div>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Профиль игрока</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl">{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{user.username}</h3>
                    <p className="text-sm text-muted-foreground">Всего игр: {user.gamesPlayed}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Рейтинг по играм</h4>
                  <div className="space-y-2">
                    {games.map(game => (
                      <div key={game.id} className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{game.emoji}</span>
                          <span className="text-sm">{game.name}</span>
                        </div>
                        <Badge variant="secondary" className="font-mono">
                          {user.ratings[game.id]}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Выбери свою игру</h2>
            <p className="text-muted-foreground text-lg">
              Играй с друзьями по ссылке или соревнуйся с другими игроками
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {games.map((game, index) => (
              <Card
                key={game.id}
                className="p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer bg-card/80 backdrop-blur animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedGame(game)}
              >
                <div className="text-5xl mb-4">{game.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="font-mono">
                    {user.ratings[game.id]}
                  </Badge>
                  <Icon name="ChevronRight" size={20} />
                </div>
              </Card>
            ))}
          </div>

          {selectedGame && (
            <Card className="p-8 bg-card/90 backdrop-blur animate-fade-in">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{selectedGame.emoji}</div>
                <h3 className="text-3xl font-bold mb-2">{selectedGame.name}</h3>
                <p className="text-muted-foreground">{selectedGame.description}</p>
              </div>

              {!isCreatingRoom ? (
                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <Button
                    size="lg"
                    className="h-24 flex flex-col gap-2"
                    onClick={createRoom}
                  >
                    <Icon name="Link" size={28} />
                    <span className="text-lg">Играть с другом</span>
                    <span className="text-xs opacity-80">Создать комнату и отправить ссылку</span>
                  </Button>

                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-24 flex flex-col gap-2"
                  >
                    <Icon name="Users" size={28} />
                    <span className="text-lg">Найти противника</span>
                    <span className="text-xs opacity-80">Автоматический подбор по рейтингу</span>
                  </Button>
                </div>
              ) : (
                <div className="max-w-md mx-auto space-y-4">
                  <div className="bg-muted/50 p-6 rounded-lg text-center">
                    <Label className="text-sm text-muted-foreground mb-2 block">Код комнаты</Label>
                    <div className="text-3xl font-mono font-bold mb-4 tracking-wider">{roomCode}</div>
                    <Button onClick={copyRoomLink} variant="outline" className="w-full mb-2">
                      <Icon name="Copy" size={18} className="mr-2" />
                      Скопировать ссылку
                    </Button>
                    <Button onClick={enterGame} className="w-full">
                      <Icon name="Play" size={18} className="mr-2" />
                      Начать игру
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Отправь ссылку другу, чтобы начать игру
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setIsCreatingRoom(false);
                      setRoomCode('');
                    }}
                  >
                    Назад
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;