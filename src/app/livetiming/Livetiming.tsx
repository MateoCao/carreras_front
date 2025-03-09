"use client"

import { useState, useEffect, useMemo, useRef } from "react";
import { parseStringPromise } from "xml2js";

interface Runner {
  $: { id: string };
  vuelta_completada: string;
  velocidad_actual: string;
  tiempo_ultima_vuelta: string;
  tiempo_total: string;
  tiempo_mejor_vuelta: string;
  diferencia_primer_lugar: string;
  diferencia_siguiente: string;
  distancia_total_recorrida: string;
}

export default function LiveTiming() {
  const [runners, setRunners] = useState<Runner[]>([]);
  const previousSortedIds = useRef<string[]>([]);

  // Obtener clases de animación basado en cambios REALES de posición
  const getAnimationClass = (runnerId: string) => {
    const currentIndex = runners.findIndex(r => r.$.id === runnerId);
    const previousIndex = previousSortedIds.current.indexOf(runnerId);
    
    if (previousIndex === -1) return '';
    
    if (currentIndex < previousIndex) return 'row-move-up';
    if (currentIndex > previousIndex) return 'row-move-down';
    return '';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/timing.xml");
        const text = await response.text();
        const jsonData = await parseStringPromise(text);
        
        const timingData = jsonData.timing.runner?.map((runner: Runner) => ({
          $: { id: runner.$.id },
          vuelta_completada: runner.vuelta_completada[0],
          velocidad_actual: parseFloat(runner.velocidad_actual[0]).toFixed(2),
          tiempo_ultima_vuelta: parseFloat(runner.tiempo_ultima_vuelta[0]).toFixed(2),
          tiempo_total: parseFloat(runner.tiempo_total[0]).toFixed(2),
          tiempo_mejor_vuelta: parseFloat(runner.tiempo_mejor_vuelta[0]).toFixed(2),
          diferencia_primer_lugar: parseFloat(runner.diferencia_primer_lugar[0]).toFixed(2),
          diferencia_siguiente: parseFloat(runner.diferencia_siguiente[0]).toFixed(2),
          distancia_total_recorrida: parseFloat(runner.distancia_total_recorrida[0]).toFixed(2),
        })) || [];

        // 1. Ordenar los datos
        const sortedData = [...timingData].sort((a, b) => 
          parseFloat(b.distancia_total_recorrida) - parseFloat(a.distancia_total_recorrida)
        );

        // 2. Detectar cambios REALES de posición
        const currentIds = sortedData.map(r => r.$.id);
        
        // 3. Actualizar estados
        setRunners(prev => {
          previousSortedIds.current = prev.map(r => r.$.id);
          return sortedData;
        });

      } catch (error) {
        console.error("Error fetching XML:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const tableRows = useMemo(() => {
    return runners.map((runner) => {
      const animationClass = getAnimationClass(runner.$.id);
      
      return (
        <tr
          key={runner.$.id}
          className={`hover:bg-gray-200 border-b border-gray-300 ${animationClass}`}
          onAnimationEnd={(e) => {
            (e.target as HTMLElement).classList.remove('row-move-up', 'row-move-down');
          }}
        >
          <td className="px-4 py-2">
            {runners.findIndex(r => r.$.id === runner.$.id) + 1}
          </td>
          <td className="px-4 py-2">{runner.$.id}</td>
          <td className="px-4 py-2">{runner.vuelta_completada}</td>
          <td className="px-4 py-2">{runner.velocidad_actual}</td>
          <td className="px-4 py-2">{runner.tiempo_ultima_vuelta}</td>
          <td className="px-4 py-2">{runner.tiempo_total}</td>
          <td className="px-4 py-2">{runner.tiempo_mejor_vuelta}</td>
          <td className="px-4 py-2">{runner.diferencia_primer_lugar}</td>
          <td className="px-4 py-2">{runner.diferencia_siguiente}</td>
          <td className="px-4 py-2">{runner.distancia_total_recorrida}</td>
        </tr>
      );
    });
  }, [runners]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Live Timing</h2>
      <table className="min-w-full table-auto border-collapse bg-gray-100 rounded-lg">
        {/* Encabezados corregidos aquí */}
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="px-4 py-2 text-left">Posición</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Vueltas Completadas</th>
            <th className="px-4 py-2 text-left">Velocidad Actual (m/s)</th>
            <th className="px-4 py-2 text-left">Último Tiempo (s)</th>
            <th className="px-4 py-2 text-left">Tiempo Total (s)</th>
            <th className="px-4 py-2 text-left">Mejor Vuelta (s)</th>
            <th className="px-4 py-2 text-left">Diferencia con Primer Lugar (s)</th>
            <th className="px-4 py-2 text-left">Diferencia con Siguiente (s)</th>
            <th className="px-4 py-2 text-left">Distancia Total Recorrida (m)</th>
          </tr>
        </thead>
        <tbody>
          {runners.length > 0 ? tableRows : (
            <tr>
              <td colSpan={10} className="text-center py-4">Cargando...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}