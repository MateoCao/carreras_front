import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Runner } from "../types/Runner";
import { RawRunner } from "../types/RawRunner";

export const useLiveTimingData = () => {
    const [runners, setRunners] = useState<Runner[]>([]);
    const previousSortedIds = useRef<string[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState("00:00");

    useEffect(() => {
        // Configuración del socket
        const socket = io("https://simulador-carreras.onrender.com", {
            transports: ["websocket"],
            reconnection: true,
            autoConnect: true,
        });

        // Guardar referencia del socket
        socketRef.current = socket;

        // Manejar conexión exitosa
        socket.on("connect", () => {
            console.log("🟢 Conectado al servidor");
            setIsConnected(true);
        });

        // Manejar desconexión
        socket.on("disconnect", () => {
            console.log("🔴 Desconectado");
            setIsConnected(false);
        });

        // Manejar actualizaciones de datos
        socket.on("update", (data: { runners: RawRunner[], timestamp: number }) => {

            try {
                // Procesar y ordenar los datos
                const formattedTime = formatTime(data.timestamp);
                setTiempoTranscurrido(formattedTime);
                const processed = data.runners.map(parseRunnerData);
                const sorted = sortRunners(processed);
                

                // Actualizar estado con los nuevos datos
                setRunners(prev => {
                    const prevIds = prev.map(r => r.id);
                    const newIds = sorted.map(r => r.id);

                    console.log("PREV", prevIds);
                    console.log("NEW", newIds);

                    previousSortedIds.current = prevIds;
                    return sorted;
                });
            } catch (error) {
                console.error("Error procesando datos:", error);
            }
        });

        // Manejar errores de conexión
        socket.on("connect_error", (err) => {
            console.error("Error de conexión:", err.message);
        });

        // Limpieza al desmontar
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                console.log("Socket desconectado");
            }
        };
    }, []);

    return {
        runners,
        previousSortedIds: previousSortedIds.current,
        isConnected,
        tiempoTranscurrido
    };
};

// Helpers
const parseRunnerData = (raw: RawRunner): Runner => ({
    id: String(raw.id),
    vuelta_completada: String(raw.vuelta_actual),
    velocidad_actual: Number(raw.velocidad_actual).toFixed(2),
    tiempo_ultima_vuelta: Number(raw.ultimo_tiempo_vuelta).toFixed(2),
    tiempo_total: Number(raw.tiempo_total).toFixed(2),
    tiempo_mejor_vuelta: Number(raw.mejor_vuelta).toFixed(2),
    distancia_total_recorrida: Number(raw.distancia_total_recorrida).toFixed(2),
});

const sortRunners = (runners: Runner[]) =>
    [...runners].sort((a, b) =>
        parseFloat(b.distancia_total_recorrida) - parseFloat(a.distancia_total_recorrida)
    );


const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);  // Obtener minutos
    const secs = Math.floor(seconds % 60);  // Obtener segundos

    // Asegurar que los minutos y segundos tengan dos dígitos
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    const formattedSecs = secs < 10 ? `0${secs}` : secs;

    return `${formattedMins}:${formattedSecs}`;
};