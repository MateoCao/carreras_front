import { useEffect, useState } from "react";
import { Runner } from "../types/Runner";

interface AnimatedRowProps {
  runner: Runner;
  runners: Runner[];
  previousSortedIds: string[];
}

export default function AnimatedRow({ runner, runners, previousSortedIds }: AnimatedRowProps) {
  const [animationClass, setAnimationClass] = useState("");
  const currentPosition = runners.findIndex(r => r.id === runner.id) + 1;
  const [textColor, setColorText] = useState("");

  console.log("IDS ROWS:", previousSortedIds);

  useEffect(() => {
    const previousIndex = previousSortedIds.indexOf(runner.id) + 1;
    if (previousIndex === -1) return;

    if (currentPosition < previousIndex) {
      setAnimationClass("row-move-up");
    } else if (currentPosition > previousIndex) {
      setAnimationClass("row-move-down");
    }

    if (runner.tiempo_mejor_vuelta < runners[0].tiempo_mejor_vuelta) {
      setColorText("purple");
    } else {
      setColorText("");
    }
  }, [previousSortedIds, runner, currentPosition, runners]);

  return (
    <tr
      className={`hover:bg-gray-200 border-b border-gray-300 ${animationClass}`}
      onAnimationEnd={() => setAnimationClass("")}
    >
      <td className="px-4 py-2">{currentPosition}</td>
      <td className="px-4 py-2">{runner.id}</td>
      <td className="px-4 py-2">{runner.vuelta_completada}</td>
      <td className="px-4 py-2">{runner.velocidad_actual}</td>
      <td className="px-4 py-2">{runner.tiempo_ultima_vuelta}</td>
      <td className="px-4 py-2">{runner.tiempo_total}</td>
      <td className={`px-4 py-2 ${textColor === "purple" ? "text-purple-500" : ""} `}>{runner.tiempo_mejor_vuelta}</td>
      <td className="px-4 py-2">{runner.distancia_total_recorrida}</td>
    </tr>
  );
}