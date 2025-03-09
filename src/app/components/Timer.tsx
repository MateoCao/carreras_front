const Timer = ({ tiempoTranscurrido }: { tiempoTranscurrido: number }) => {
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const formattedMins = mins < 10 ? `0${mins}` : mins;
        const formattedSecs = secs < 10 ? `0${secs}` : secs;
        return `${formattedMins}:${formattedSecs}`;
    };

    return (
        <div className="text-2xl font-bold">
            Tiempo: {formatTime(tiempoTranscurrido)}
        </div>
    );
};

export default Timer;