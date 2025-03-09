"use client"
import { useLiveTimingData } from "../hooks/useLivetimingData";
import TimingTable from "../components/TimingTable";
import IniciarSimulacionButton from "../components/ActiveSimulationButton";
import StopSimulationButton from "../components/StopSimulationButton";

export default function LiveTiming() {
  const { runners, previousSortedIds, isConnected, tiempoTranscurrido } = useLiveTimingData();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Live Timing</h2>
        <div className={`px-4 py-2 rounded-md ${
          isConnected ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          {isConnected ? "Conectado" : "Desconectado"}
        </div>
        <IniciarSimulacionButton />
        <StopSimulationButton />
        <p>{tiempoTranscurrido}</p>
      </div>
      <TimingTable 
        runners={runners}
        previousSortedIds={previousSortedIds}
      />
    </div>
  );
}