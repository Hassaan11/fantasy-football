'use client'

import { useState, useEffect } from "react";
import { mockData } from "@/app/data/mockData";
import Dropdown from "@/app/components/Dropdown";
import PlayerTable from "@/app/components/Table";
import PlayerDetail from "@/app/components/PlayerDetail";
import Navbar from "@/app/components/Navbar";
import Button from "./components/Button";
import RightArrowIcon from './assets/icons/right-icon.svg';
import LeftArrowIcon from './assets/icons/left-icon.svg';
import { Player } from "./types";

export default function Home() {
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
  const handleOperatorChange = (selectedOperator: string) => {
    setOperator(selectedOperator);
    const operatorGameTypes = mockData?.filter(game => game.operator === selectedOperator)
      .map(game => game.operatorGameType).flat();
    setGameTypes([...new Set(operatorGameTypes)]);
    setPlayers([]);
    setPaginatedPlayers([]);
    setSelectedPlayer(null);
    setPage(1);
  };

  // Handle changes in game type
  const handleGameTypeChange = (selectedGameType: string) => {
    setGameType(selectedGameType);
    const slateNamesForGameType = mockData?.filter(game => game.operatorGameType === selectedGameType)
      .map(game => game.operatorName).flat();
    setSlateNames([...new Set(slateNamesForGameType)]);
    setPlayers([]);
    setPaginatedPlayers([]);
    setSelectedPlayer(null);
    setPage(1);
  };

  // Handle game selection (to show relevant players)
  const handleSlateNameChange = (selectedSlateName: string) => {
    setSlateName(selectedSlateName);
    const playersForSlate = mockData?.find(game => game.operatorName === selectedSlateName)?.dfsSlatePlayers || [];
    setPlayers(playersForSlate);
    setPaginatedPlayers(playersForSlate.slice(0, playersPerPage)); // Reset pagination after changing slate name
    setSelectedPlayer(playersForSlate[0]); // Select the first player by default
    setPage(1);
  };

  // Pagination logic
  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(players.length / playersPerPage);
    if (newPage < 1 || newPage > totalPages) return;

    const startIndex = (newPage - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;
    setPaginatedPlayers(players.slice(startIndex, endIndex));
    setPage(newPage);
    setSelectedPlayer(players[startIndex]);
  };

  // Function to handle player selection
  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleSetRowsPerPage = (rowsPerPage: number) => {
    setPlayersPerPage(rowsPerPage);
    setPage(1);
    setPaginatedPlayers(players.slice(0, rowsPerPage));
  }

  const totalPages = Math.ceil(players.length / playersPerPage);

  return (
    <main className="bg-[#191919] min-h-screen">
      <Navbar />
      <div className="p-4">
        <div className="max-w-3xl mx-auto bg-[#2f2f2f] rounded-lg p-6 mb-8">
          <div className="flex justify-between flex-wrap gap-4">
            <Dropdown label="Select Operator" options={operators} value={operator} onChange={handleOperatorChange} />
            <Dropdown label="Select Game Type" options={gameTypes} value={gameType} onChange={handleGameTypeChange} />
            <Dropdown label="Select Slate Name" options={slateNames} value={slateName} onChange={handleSlateNameChange} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 rounded-lg overflow-hidden">
            <PlayerTable players={paginatedPlayers} onSelect={handlePlayerSelect} selectedPlayer={selectedPlayer} />
            <div className="flex items-center justify-between p-4 border-t border-neutral-800 bg-[#262626]">
              <div className="flex items-center gap-2">
                <span className="text-white">Page</span>
                <Dropdown label={page.toString()} options={Array.from({ length: totalPages }, (_, i) => (i + 1).toString())} value={page.toString()} onChange={(value) => handlePageChange(parseInt(value))} />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white">Rows per page</span>
                <div className="relative">
                  <Dropdown label={playersPerPage.toString()} options={['8', '16', '32', '64']} value={playersPerPage.toString()} onChange={(value) => handleSetRowsPerPage(parseInt(value))} />
                </div>
              </div>

              <span className="text-white">{(page - 1) * playersPerPage + 1} - {Math.min(page * playersPerPage, players.length)} of {players.length}</span>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} icon={LeftArrowIcon} />
                  <Button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)} icon={RightArrowIcon} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <PlayerDetail player={selectedPlayer} />
          </div>
        </div>
      </div>
    </main>
  );
}
