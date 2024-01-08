// Funciones relacionadas con la creación y manejo del rover y los obstáculos
async function createRover(x, y, direction) {
    const roverData = {
        x: x,
        y: y,
        direction: direction
        // Puedes agregar más campos según la estructura de tu rover
    };

    const response = await fetch('/api/rover/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roverData)
    });

    return await response.json();
}

async function createObstacle(x, y) {
    const obstacleData = {
        x: x,
        y: y
        // Puedes agregar más campos según la estructura de tus obstáculos
    };

    await fetch('/api/obstacle/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obstacleData)
    });
}

async function createObstacles() {
    const obstacleData = [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
        // Puedes agregar más obstáculos aquí
    ];

    for (const obstacle of obstacleData) {
        await createObstacle(obstacle.x, obstacle.y);
    }
}

async function createRandomRover() {
    const maxX = 10; // Cambia el valor máximo según el tamaño de tu mapa
    const maxY = 10; // Cambia el valor máximo según el tamaño de tu mapa

    const randomX = getRandomPosition(maxX);
    const randomY = getRandomPosition(maxY);
    const randomDirection = ['N', 'E', 'S', 'W'][getRandomPosition(4)]; // Dirección aleatoria

    return await createRover(randomX, randomY, randomDirection);
}

async function createRandomObstacles(numberOfObstacles) {
    const maxX = 10; // Cambia el valor máximo según el tamaño de tu mapa
    const maxY = 10; // Cambia el valor máximo según el tamaño de tu mapa

    for (let i = 0; i < numberOfObstacles; i++) {
        const randomX = getRandomPosition(maxX);
        const randomY = getRandomPosition(maxY);
        await createObstacle(randomX, randomY);
    }
}

// Funciones relacionadas con la actualización del rover en la interfaz
async function refreshRover() {
    const roverResponse = await fetch('/api/rover/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const roverJson = await roverResponse.json();
    moveRover(roverJson.x, roverJson.y);
}

function moveRover(x, y) {
    document.getElementById("rover").style.left = (x * 100) + 'px';
    document.getElementById("rover").style.top = (y * 100) + 'px';
    playMoveSound();
}

// Resto del código...

// Funciones para manejar los eventos de movimiento del rover
async function moveRoverAndRefresh(command) {
    await sendCommand(command);
    await refreshRover();
}

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

// Función para inicializar el mapa al cargar la página
async function initializeMap() {
    await createRandomRover();
    await createRandomObstacles(5);
    await refreshRover();
}

initializeMap();
