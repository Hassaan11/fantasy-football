import Image from "next/image";
import { Player } from "@/app/types";

type Props = {
   player: Player | null;
}

const PlayerDetail: React.FC<Props> = ({ player }) => {
   if (!player) return null;
   return (
      <div className="flex-1 h-full w-full lg:w-80 bg-[#2f2f2f] rounded-lg overflow-hidden">
         <div className="relative h-72 bg-[#1c1c1c]">
            <Image
               src="/placeholder.jpg"
               alt="Tom Brady"
               fill
               style={{ objectFit: "cover" }}
            />
         </div>
         <div className="flex pt-6 flex-col items-center gap-y-4">
            <h2 className="text-white text-2xl font-medium mb-6">{player.operatorPlayerName}</h2>
            <div className="text-[100px] font-light text-gray-300 leading-none">{player.fantasyPoints || 0} </div>
            <div className="text-gray-400 mt-2">Points</div>
         </div>
      </div>
   )
}

export default PlayerDetail;