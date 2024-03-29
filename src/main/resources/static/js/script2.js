async function createRover(x, y, direction) {
    const roverData = {
        x: x,
        y: y,
        direction: direction
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

async function getRover() {
    const response = await fetch('/api/rover/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
}

async function createObstacle(x, y) {
    const obstacleData = {
        x: x,
        y: y
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

async function refreshRover() {
    const roverJson = await getRover();
    moveRover(roverJson.x, roverJson.y);
}

function moveRover(x, y) {
    document.getElementById("rover").style.left = (x * 100) + 'px';
    document.getElementById("rover").style.top = (y * 100) + 'px';
    playMoveSound();
}

function playMoveSound() {
    var audioElement = document.createElement("audio");
    audioElement.src = "sounds/move.mp3";
    audioElement.controls = true;
    audioElement.autoplay = true;
    document.getElementById("container").appendChild(audioElement);
}

document.getElementById("btnRotateLeft").addEventListener("click", clickBtnRotateLeft);
document.getElementById("btnRotateRight").addEventListener("click", clickBtnRotateRight);
document.getElementById("btnMoveForward").addEventListener("click", moveForward);
document.getElementById("btnMoveBack").addEventListener("click", moveBack);

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

async function sendCommand(command) {
    const requestBody = {
        "commands": [command]
    };

    await fetch('/api/rover/command/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
}

function initializeMap() {
    createRandomRover();
    createRandomObstacles(5);
    refreshRover();
}

initializeMap();

function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
}
