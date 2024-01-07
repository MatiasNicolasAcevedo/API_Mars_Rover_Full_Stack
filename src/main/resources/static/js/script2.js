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

// Función para generar un número aleatorio dentro de un rango
function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
}

// Función para crear un rover en una posición aleatoria en el backend
async function createRandomRover() {
    const maxX = 10; // Cambia el valor máximo según el tamaño de tu mapa
    const maxY = 10; // Cambia el valor máximo según el tamaño de tu mapa

    const randomX = getRandomPosition(maxX);
    const randomY = getRandomPosition(maxY);
    const randomDirection = ['N', 'E', 'S', 'W'][getRandomPosition(4)]; // Dirección aleatoria

    return await createRover(randomX, randomY, randomDirection);
}

// Función para crear obstáculos en posiciones aleatorias en el backend
async function createRandomObstacles(numberOfObstacles) {
    const maxX = 10; // Cambia el valor máximo según el tamaño de tu mapa
    const maxY = 10; // Cambia el valor máximo según el tamaño de tu mapa

    for (let i = 0; i < numberOfObstacles; i++) {
        const randomX = getRandomPosition(maxX);
        const randomY = getRandomPosition(maxY);
        await createObstacle(randomX, randomY);
    }
}

// Resto del código...

// Resto del código...

// Función para enviar un movimiento al servidor y actualizar la posición del rover en la interfaz
async function moveRoverAndRefresh(command) {
    await sendCommand(command); // Envía el comando al backend para mover el rover
    await refreshRover(); // Actualiza la posición del rover en la interfaz
}

// Funciones para manejar los eventos de movimiento
function clickBtnRotateLeft() {
    moveRoverAndRefresh("L");
}

function clickBtnRotateRight() {
    moveRoverAndRefresh("R");
}

async function moveForward() {
    await moveRoverAndRefresh("F");
}

function moveBack() {
    moveRoverAndRefresh("B");
}

// Resto del código...


// Función para inicializar el mapa con posiciones aleatorias
async function initializeMap() {
    await createRandomRover(); // Crear el rover en una posición aleatoria
    await createRandomObstacles(5); // Crear 5 obstáculos aleatorios
    await refreshRover(); // Actualizar la posición del rover
}

initializeMap(); // Llama a la función para inicializar el mapa al cargar la página
