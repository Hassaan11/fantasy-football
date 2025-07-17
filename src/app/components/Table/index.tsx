import { Player } from "@/app/types";
import SkeletonLoader from "../Skeleton";

type Props = {
   players: Player[],
   onSelect: (player: Player) => void,
   selectedPlayer: Player | null
}

const Table: React.FC<Props> = ({ players, onSelect, selectedPlayer }) => {
   return (
      <div className="overflow-x-auto">
         <table className="w-full text-white">
            <thead>
               <tr className="border-b border-neutral-800 bg-[#1c1c1c]">
                  <th className="text-left py-4 px-4 font-medium">Name</th>
                  <th className="text-left py-4 px-4 font-medium">Team</th>
                  <th className="text-left py-4 px-4 font-medium">Position</th>
                  <th className="text-left py-4 px-4 font-medium">Salary</th>
                  <th className="text-left py-4 px-4 font-medium">Points</th>
               </tr>
            </thead>
            <tbody className="bg-[#2f2f2f]">
               {players?.length === 0 ? (
                  <tr>
                     <td colSpan={5} className="py-4 px-4">
                        <SkeletonLoader count={8} height={30} />
                     </td>
                  </tr>
               ) : (
                  players?.map((player) => (
                     <tr key={player.playerId} onClick={() => onSelect(player)} className={`cursor-pointer ${selectedPlayer?.playerId === player.playerId ? "bg-amber-700" : "hover:bg-neutral-800"}`}>
                        <td className="py-4 px-4">{player.operatorPlayerName}</td>
                        <td className="py-4 px-4">{player.team}</td>
                        <td className="py-4 px-4">{player.operatorPosition}</td>
                        <td className="py-4 px-4">${player.operatorSalary}</td>
                        <td className="py-4 px-4">{player.fantasyPoints || '-'}</td>
                     </tr>
                  )))}
            </tbody>
         </table>
      </div>
   )
}

export default Table;