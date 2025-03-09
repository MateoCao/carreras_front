export default function TableHeader() {
    return (
      <thead>
        <tr className="bg-green-500 text-white">
            <th className="px-4 py-2 text-left">Posición</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Vueltas Completadas</th>
            <th className="px-4 py-2 text-left">Velocidad Actual (m/s)</th>
            <th className="px-4 py-2 text-left">Último Tiempo (s)</th>
            <th className="px-4 py-2 text-left">Tiempo Total (s)</th>
            <th className="px-4 py-2 text-left">Mejor Vuelta (s)</th>
            <th className="px-4 py-2 text-left">Distancia Total Recorrida (m)</th>
        </tr>
      </thead>
    );
  }