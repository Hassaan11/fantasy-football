'use client'

import Dropdown from "@/app/components/Dropdown";
import PlayerTable from "@/app/components/Table";
import PlayerDetail from "@/app/components/PlayerDetail";
import Navbar from "@/app/components/Navbar";
import Button from "./components/Button";
import RightArrowIcon from './assets/icons/right-icon.svg';
import LeftArrowIcon from './assets/icons/left-icon.svg';
import useLogic from "./logic";

export default function Home() {
  const { operator,
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
    handleSetRowsPerPage } = useLogic();

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
                <Dropdown options={Array.from({ length: totalPages }, (_, i) => (i + 1).toString())} value={page.toString()} onChange={(value) => handlePageChange(parseInt(value))} />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white">Rows per page</span>
                <div className="relative">
                  <Dropdown options={['8', '16', '32', '64']} value={playersPerPage.toString()} onChange={(value) => handleSetRowsPerPage(parseInt(value))} />
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
