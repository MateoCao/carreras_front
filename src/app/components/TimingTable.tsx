import { useMemo } from "react";
import TableHeader from "./TableHeader";
import AnimatedRow from "./AnimatedRow";
import { Runner } from "../types/Runner";

interface TimingTableProps {
  runners: Runner[];
  previousSortedIds: string[];
}

export default function TimingTable({ runners, previousSortedIds }: TimingTableProps) {
  const rows = useMemo(() => 
    runners.map(runner => (
      <AnimatedRow
        key={runner.id}
        runner={runner}
        runners={runners}
        previousSortedIds={previousSortedIds}
      />
    )), 
    [previousSortedIds, runners]
  );

  return (
    <table className="min-w-full table-auto border-collapse bg-gray-100 rounded-lg">
      <TableHeader />
  
      <tbody>
        {runners.length > 0 ? rows : (
          <tr>
            <td colSpan={10} className="text-center py-4">Cargando...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}