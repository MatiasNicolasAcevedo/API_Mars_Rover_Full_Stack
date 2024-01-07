// Función para crear un rover en el backend
async function createRover(x, y, direction) {
    // Datos del rover a enviar al backend
    const roverData = {
        x: x,
        y: y,
        direction: direction
        // Puedes agregar más campos según la estructura de tu rover
    };

    // Petición POST para crear un rover
    const response = await fetch('/api/rover/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roverData)
    });

    return await response.json(); // Devuelve la respuesta del servidor
}

// Función para obtener y crear obstáculos desde el backend
async function createObstacles() {
    // Datos de ejemplo de obstáculos
    const obstacleData = [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
        // Puedes agregar más obstáculos aquí
    ];

    // Iterar sobre los datos de los obstáculos y crearlos uno por uno
    for (const obstacle of obstacleData) {
        await createObstacle(obstacle.x, obstacle.y);
    }
}

// Función para crear un obstáculo en el backend
async function createObstacle(x, y) {
    const obstacleData = {
        x: x,
        y: y
        // Puedes agregar más campos según la estructura de tus obstáculos
    };

    // Petición POST para crear un obstáculo
    await fetch('/api/obstacle/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obstacleData)
    });
}

// Función para obtener la posición del rover desde el backend y actualizar su posición en la interfaz
async function refreshRover() {
    const roverResponse = await fetch('/api/rover/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const roverJson = await roverResponse.json();
    moveRover(roverJson.x, roverJson.y); // Actualiza la posición del rover en la interfaz
}

// Función para mover visualmente el rover en la interfaz
function moveRover(x, y) {
    document.getElementById("rover").style.left = (x * 100) + 'px';
    document.getElementById("rover").style.top = (y * 100) + 'px';
    playMoveSound(); // Reproduce un sonido al mover el rover
}

// Resto del código para la creación de obstáculos, manejo de eventos de botones, etc.

// Función para inicializar el mapa al cargar la página
async function initializeMap() {
    await createRover(0, 0, 'N'); // Crear el rover en la posición inicial
    await createObstacles(); // Crear obstáculos en el mapa
    await refreshRover(); // Actualizar la posición del rover
}

initializeMap(); // Llama a la función para inicializar el mapa al cargar la página
