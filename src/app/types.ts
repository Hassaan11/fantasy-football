export interface Player {
   operatorPlayerName: string;
   team: string;
   operatorPosition: string;
   operatorSalary: number;
   fantasyPoints?: number;
   playerId: string;
}

export interface SlateGame {
  operatorGameType: string;
  operatorName: string;
  gameKey: string;
  homeTeam: string;
  awayTeam: string;
  slateId: string;
}

export interface GameData {
  operator: string;
  operatorName: string;
  operatorGameType: string;
  dfsSlateGames: SlateGame[];
  dfsSlatePlayers: Player[];
}