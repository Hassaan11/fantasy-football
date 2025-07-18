import { useCallback, useEffect, useMemo, useState } from "react";
import { Player } from "./types";
import { mockData } from "./data/mockData";

const useLogic = () => {
  const [operator, setOperator] = useState("");
  const [gameType, setGameType] = useState("");
  const [slateName, setSlateName] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const [gameTypes, setGameTypes] = useState<string[]>([]);
  const [slateNames, setSlateNames] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [operators, setOperators] = useState<string[]>([]);
  const [paginatedPlayers, setPaginatedPlayers] = useState<Player[]>([]);
  const [page, setPage] = useState(1);
  const [playersPerPage, setPlayersPerPage] = useState(8);

  useEffect(() => {
    const operatorsData = [...new Set(mockData?.map((game) => game.operator))]
    setOperators(operatorsData);

    const gameTypesData = [...new Set(mockData?.map((game) => game?.dfsSlateGames?.map(g => g.operatorGameType)).flat())];
    const slateNamesData = [...new Set(mockData?.map((game) => game?.dfsSlateGames?.map(g => g.operatorName)).flat())];
    const playersData = mockData?.map(game => game?.dfsSlatePlayers).flat();

    setGameTypes(gameTypesData);
    setSlateNames(slateNamesData);
    setPlayers(playersData);
    setPaginatedPlayers(playersData.slice(0, playersPerPage));
    setSelectedPlayer(playersData[0]);
  }, []);

  // Handle changes in operator
  const handleOperatorChange = useCallback((selectedOperator: string) => {
    setOperator(selectedOperator);
    const operatorGameTypes = mockData?.filter(game => game.operator === selectedOperator)
      .map(game => game.operatorGameType).flat();
    setGameTypes([...new Set(operatorGameTypes)]);
    setPlayers([]);
    setPaginatedPlayers([]);
    setSelectedPlayer(null);
    setPage(1);
    setPlayersPerPage(8)
  }, []);

  // Handle changes in game type
  const handleGameTypeChange = useCallback((selectedGameType: string) => {
    setGameType(selectedGameType);
    const slateNamesForGameType = mockData?.filter(game => game.operatorGameType === selectedGameType)
      .map(game => game.operatorName).flat();
    setSlateNames([...new Set(slateNamesForGameType)]);
    setPlayers([]);
    setPaginatedPlayers([]);
    setSelectedPlayer(null);
    setPage(1);
    setPlayersPerPage(8)
  }, []);

  // Handle game selection (to show relevant players)
  const handleSlateNameChange = useCallback((selectedSlateName: string) => {
    setSlateName(selectedSlateName);
    const playersForSlate = mockData?.find(game => game.operatorName === selectedSlateName)?.dfsSlatePlayers || [];
    setPlayers(playersForSlate);
    setPaginatedPlayers(playersForSlate.slice(0, playersPerPage)); // Reset pagination after changing slate name
    setSelectedPlayer(playersForSlate[0]); // Select the first player by default
    setPage(1);
    setPlayersPerPage(8)
  }, []);

  // Pagination logic
  const handlePageChange = useCallback((newPage: number) => {
    const totalPages = Math.ceil(players.length / playersPerPage);
    if (newPage < 1 || newPage > totalPages) return;

    const startIndex = (newPage - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;
    setPaginatedPlayers(players.slice(startIndex, endIndex));
    setPage(newPage);
    setSelectedPlayer(players[startIndex]);
  }, [players, playersPerPage]);

  // Function to handle player selection
  const handlePlayerSelect = useCallback((player: Player) => {
    setSelectedPlayer(player);
  }, []);

  const handleSetRowsPerPage = useCallback((rowsPerPage: number) => {
    setPlayersPerPage(rowsPerPage);
    setPage(1);
    setPaginatedPlayers(players.slice(0, rowsPerPage));
  }, [players]);

  const totalPages = useMemo(() => Math.ceil(players.length / playersPerPage), [players, playersPerPage]);

  return {
    operator,
    gameType,
    slateName,
    selectedPlayer,
    gameTypes,
    slateNames,
    players,
    operators,
    paginatedPlayers,
    page,
    playersPerPage,
    totalPages,
    handleOperatorChange,
    handleGameTypeChange,
    handleSlateNameChange,
    handlePageChange,
    handlePlayerSelect,
    handleSetRowsPerPage
  }
};

export default useLogic;