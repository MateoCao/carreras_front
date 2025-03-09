"use client"

const IniciarSimulacionButton = () => {
    const iniciarSimulacion = async () => {
        try {
            const response = await fetch("https://simulador-carreras.onrender.com/iniciar-simulacion", {
                method: "POST",
            });
            const data = await response.json();
            console.log(data.mensaje);
        } catch (error) {
            console.error("Error al iniciar la simulación:", error);
        }
    };

    return (
        <button
            onClick={iniciarSimulacion}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Iniciar carrera
        </button>
    );
};

export default IniciarSimulacionButton;