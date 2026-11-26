const button = document.querySelector("#startButton");
const section1 = document.querySelector("#sectionOne");
const section2 = document.querySelector("#sectionTwo");
const leftDoor = document.querySelector("#leftDoorButton");
const rightDoor = document.querySelector("#rightDoorButton");
const leftLight = document.querySelector("#leftLightButton");
const rightLight = document.querySelector("#rightLightButton");
const leftDoorVisual = document.querySelector("#leftDoorVisual");
const rightDoorVisual = document.querySelector("#rightDoorVisual");
const leftLightVisual = document.querySelector("#leftLightVisual");
const cameraButton = document.querySelector("#cameraButton");
const cameraSection = document.querySelector("#cameraSection");
const backToOfficeButton = document.querySelector("#backToOfficeButton");
const leftDoorway = document.querySelector(".leftDoorway");
const rightDoorway = document.querySelector(".rightDoorway");
const bonnieLocation = document.querySelector("#bonnieLocation");
const powerDisplay = document.querySelector("#powerDisplay");
const usageDisplay = document.querySelector("#usageDisplay");
const clock = document.querySelector("#clock");
const bonnieVisual = document.querySelector("#bonnieVisual");
const cameraRoom = document.querySelector("#cameraRoom");
const cameraView = document.querySelector("#cameraView");
const mapCam1 = document.querySelector("#mapCam1");
const mapCam2 = document.querySelector("#mapCam2");
const mapCam3 = document.querySelector("#mapCam3");
const mapCam4 = document.querySelector("#mapCam4");
const cameraStatic = document.querySelector("#cameraStatic");
const bonnieCameraImage = document.querySelector("#bonnieCameraImage");
const cameraFeedText = document.querySelector("#cameraFeedText");
const leftLightBeam = document.querySelector("#leftLightBeam");
const rightLightBeam = document.querySelector("#rightLightBeam");
const chicaVisual = document.querySelector("#chicaVisual");
const chicaCameraImage = document.querySelector("#chicaCameraImage");
const mapCam5 = document.querySelector("#mapCam5");
const mapCam6 = document.querySelector("#mapCam6");
const mapCam7 = document.querySelector("#mapCam7");
const foxyStatus = document.querySelector("#foxyStatus");
const foxyCameraImage = document.querySelector("#foxyCameraImage");
const foxyVisual = document.querySelector("#foxyVisual");
const freddyCameraImage = document.querySelector("#freddyCameraImage");
const powerOutDisplay = document.querySelector("#powerOutDisplay");
const jumpscareScreen = document.querySelector("#jumpscareScreen");
const jumpscareImage = document.querySelector("#jumpscareImage");
const gameOverScreen = document.querySelector("#gameOverScreen");
const restartButton = document.querySelector("#restartButton");
const victoryScreen = document.querySelector("#victoryScreen");
const nextNightButton = document.querySelector("#nextNightButton");
const nightTitle = document.querySelector("#nightTitle");
const doorSound = document.querySelector("#doorSound");
const lightSound = document.querySelector("#lightSound");
const cameraSound = document.querySelector("#cameraSound");
const jumpscareSound = document.querySelector("#jumpscareSound");
const ambienceSound = document.querySelector("#ambienceSound");
const gameOverMenuButton = document.querySelector("#gameOverMenuButton");
const victoryMenuButton = document.querySelector("#victoryMenuButton");


let rightDoorClosed = false;
let leftDoorClosed = false;
let bonnieRoom = "Show Stage";
let leftLightOn = false;
let rightLightOn = false;
let gameRunning = false;
let power = 100;
let powerUsage = 1;
let cameraOpen = false;
let hour = 12;
let currentCamera = 1;
let chicaRoom = "Show Stage";
let foxyStage = 0;
let freddyRoom = "Show Stage";
let nightStartTime = null;
let currentNight = 1;
let difficulty = 1;
let unlockedNight = 1;
let bonnieTimer = null;
let chicaTimer = null;
let foxyTimer = null;
let freddyTimer = null;
let jumpscareTimer = null;

function startGame() {
    gameRunning = true;
    section1.classList.add("hidden");
    section2.classList.remove("hidden");

    ambienceSound.volume = 0.3;
    ambienceSound.currentTime = 0;

    ambienceSound.play().catch(error => {
        console.log("Ambience could not play:", error);
    });

    scheduleBonnieMove();
    scheduleChicaMove();
    scheduleFoxyMove();
    scheduleFreddyMove();
    updateNightTitle();
    updateDifficulty();
};

function stopCharacterTimers() {
    clearTimeout(bonnieTimer);
    clearTimeout(chicaTimer);
    clearTimeout(foxyTimer);
    clearTimeout(freddyTimer);

    bonnieTimer = null;
    chicaTimer = null;
    foxyTimer = null;
    freddyTimer = null;
}

function openCamera() {
    cameraOpen = true;
    updatePowerUsage();
    section2.classList.add("hidden");
    cameraSection.classList.remove("hidden");

    updateCameraBonnie();
    updateCameraChica();
    playSound(cameraSound);
};

function closeCamera() {
    cameraOpen = false;
    updatePowerUsage();
    section2.classList.remove("hidden");
    cameraSection.classList.add("hidden");

    playSound(cameraSound);
};

function updateCamera() {
    if (currentCamera === 1) {
        cameraRoom.textContent = "CAM 1 - Show Stage";
        cameraFeedText.textContent = "Show Stage camera feed"
    }

    else if (currentCamera === 2) {
        cameraRoom.textContent = "CAM 2 - Dining Area";
        cameraFeedText.textContent = "Dining Area camera feed";
    }

    else if (currentCamera === 3) {
        cameraRoom.textContent = "CAM 3 - Backstage";
        cameraFeedText.textContent = "Backstage camera feed";
    }

    else if (currentCamera === 4) {
        cameraRoom.textContent = "CAM 4 - West Hall";
        cameraFeedText.textContent = "West Hall camera feed";
    }

    else if (currentCamera === 7) {
        cameraRoom.textContent = "CAM 7 - Pirate Cove";
        cameraFeedText.textContent = "Pirate Cove Camera Feed";
    }

    updateCameraBonnie();
};

function updateChicaVisual() {
    if (rightLightOn && chicaRoom === "Right Door") {
        chicaVisual.classList.remove("hidden");
    }
    else {
        chicaVisual.classList.add("hidden");
    }
}

function moveBonnie() {
    if (!gameRunning) {
        return;
    }

    let movementChance = Math.random();

    if (movementChance < 0.3 / difficulty) {
        return;
    }

    if (bonnieRoom === "Show Stage") {
        bonnieRoom = "Dining Area";
    }

    else if (bonnieRoom === "Dining Area") {
        bonnieRoom = "Backstage";
    }

    else if (bonnieRoom === "Backstage") {
        bonnieRoom = "West Hall";
    }

    else if (bonnieRoom === "West Hall") {
        bonnieRoom = "Left Door";
    }

    else if (bonnieRoom === "Left Door") {
        if (leftDoorClosed) {
            bonnieRoom = "West Hall";
        }
        else {
            showJumpscare("Bonnie");
        }
    }

    updateCamera();
    updateBonnieVisual();
};

function moveChica() {

    if (!gameRunning) {
        return;
    }

    let movementChance = Math.random();

    if (movementChance < 0.3 / difficulty) {
        return;
    }

    if (chicaRoom === "Show Stage") {
        chicaRoom = "Dining Area";
    }

    else if (chicaRoom === "Dining Area") {
        chicaRoom = "Restrooms";
    }

    else if (chicaRoom === "Restrooms") {
        chicaRoom = "Kitchen";
    }

    else if (chicaRoom === "Kitchen") {
        chicaRoom = "East Hall";
    }

    else if (chicaRoom === "East Hall") {
        chicaRoom = "Right Door";
    }

    if (chicaRoom === "Right Door") {
        if (rightDoorClosed) {
            chicaRoom = "East Hall";
        }

        else {
            showJumpscare("Chica");
        }
    }

    console.log("Chica is now in: " + chicaRoom);

    updateCameraChica();
    updateChicaVisual();
    updateCameraChica();
}

function moveFoxy() {
    if (!gameRunning) {
        return;
    }

    let movementChance = Math.random();

    if (movementChance < 0.3 / difficulty) {
        return;
    }

    if (foxyStage < 3) {
        foxyStage++;
    }

    updateFoxyStage();

    if (foxyStage === 3) {
        foxyVisual.classList.remove("hidden");
        foxyAttack();
    }

    updateFoxyCamera();
}

function updateFoxyStage() {
    if (foxyStage === 0) {
        foxyStatus.textContent = "Foxy is behind the curtains.";
    }
    else if (foxyStage === 1) {
        foxyStatus.textContent = "Foxy is peeking out!";
    }
    else if (foxyStage === 2) {
        foxyStatus.textContent = "Foxy has left Pirate Cove!";
    }
    else if (foxyStage === 3) {
        foxyStatus.textContent = "FOXY IS RUNNING!";
    }
}

function updateFoxyCamera() {
    if (currentCamera === 7 && foxyStage > 0 && foxyStage < 3) {
        foxyCameraImage.classList.remove("hidden");
    }
    else {
        foxyCameraImage.classList.add("hidden");
    }
}

function scheduleFoxyMove() {
    let randomTime = Math.floor(Math.random() * 8000) + 8000;

    foxyTimer = setTimeout(() => {
        if (gameRunning) {
            moveFoxy();
            scheduleFoxyMove();
        }
    }, randomTime);
}

function foxyAttack() {
    if (leftDoorClosed) {
        foxyStage = 0;
        foxyVisual.classList.add("hidden");
        updateFoxyStage();
    }
    else {
        showJumpscare("Foxy");
    }
}

function scheduleBonnieMove() {
    let randomTime = Math.floor(Math.random() * 5000) + 5000;

    bonnieTimer = setTimeout(() => {
        if (gameRunning) {
            moveBonnie();
            scheduleBonnieMove();
        }
    }, randomTime);
}

function scheduleChicaMove() {
    let randomTime = Math.floor(Math.random() * 5000) + 5000;

    chicaTimer = setTimeout(() => {
        if (gameRunning) {
            moveChica();
            scheduleChicaMove();
        }
    }, randomTime);
}

function updateBonnieVisual() {
    if (leftLightOn && bonnieRoom === "Left Door") {
        bonnieVisual.classList.remove("hidden");
    }
    else {
        bonnieVisual.classList.add("hidden");
    }
};

function updateCameraBonnie() {

    if (
        (currentCamera === 1 && bonnieRoom === "Show Stage") ||
        (currentCamera === 2 && bonnieRoom === "Dining Area") ||
        (currentCamera === 3 && bonnieRoom === "Backstage") ||
        (currentCamera === 4 && bonnieRoom === "West Hall")
        ) {
        bonnieLocation.textContent = "BONNIE DETECTED!";;
        bonnieCameraImage.classList.remove("hidden");
    }

    else {
        bonnieLocation.textContent = "No animatronics detected.";
        bonnieCameraImage.classList.add("hidden");
    }

    updateCameraChica();
};

function updateCameraChica() {

    if (
        (currentCamera === 1 && chicaRoom === "Show Stage") ||
        (currentCamera === 2 && chicaRoom === "Dining Area") ||
        (currentCamera === 3 && chicaRoom === "Backstage") ||
        (currentCamera === 4 && chicaRoom === "West Hall") ||
        (currentCamera === 5 && chicaRoom === "Restrooms") ||
        (currentCamera === 6 && chicaRoom === "Kitchen")
    ) {
        chicaCameraImage.classList.remove("hidden");
    }

    else {
        chicaCameraImage.classList.add("hidden");
    }
}

function updateFreddyCamera() {
    if (
        (currentCamera === 1 && freddyRoom === "Show Stage") ||
        (currentCamera === 2 && freddyRoom === "Dining Area") ||
        (currentCamera === 3 && freddyRoom === "Backstage") ||
        (currentCamera === 4 && freddyRoom === "West Hall")
    ) {
        freddyCameraImage.classList.remove("hidden");
    }
    else {
        freddyCameraImage.classList.add("hidden");
    }
}

function moveFreddy() {
    if (!gameRunning) {
        return;
    }

    let movementChance = Math.random();

    if (movementChance < 0.3) {
        return;
    }

    if (freddyRoom === "Show Stage") {
        freddyRoom = "Dining Area";
    }
    else if (freddyRoom === "Dining Area") {
        freddyRoom = "Backstage";
    }
    else if (freddyRoom === "Backstage") {
        freddyRoom = "East Hall";
    }
    else if (freddyRoom === "East Hall") {
        freddyRoom = "Right Door";
    }

    console.log("Freddy is now in: " + freddyRoom);

    updateFreddyCamera();
}

function scheduleFreddyMove() {
    let randomTime = Math.floor(Math.random() * 10000) + 10000;

    freddyTimer = setTimeout(() => {
        if (gameRunning) {
            moveFreddy();
            scheduleFreddyMove();
        }
    }, randomTime);
}

function updateFreddyCamera() {
    if (
        (currentCamera === 1 && freddyRoom === "Show Stage") ||
        (currentCamera === 2 && freddyRoom === "Dining Area") ||
        (currentCamera === 3 && freddyRoom === "Backstage") ||
        (currentCamera === 4 && freddyRoom === "West Hall") ||
        (currentCamera === 5 && freddyRoom === "Restrooms") ||
        (currentCamera === 6 && freddyRoom === "Kitchen")
    ) {
        freddyCameraImage.classList.remove("hidden");
    }
    else {
        freddyCameraImage.classList.add("hidden");
    }
}

function gameOver() {
    gameRunning = false;
    stopCharacterTimers();

    jumpscareScreen.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");

    ambienceSound.pause();
    ambienceSound.currentTime = 0;
}

function usePower() {
    if (!gameRunning) {
        return;
    }

    power -= powerUsage;

    if (power <= 0) {
        power = 0;
        powerDisplay.textContent = "Power: 0%";
        powerOutage();
        return;
    }

    powerDisplay.textContent = "Power: " + power + "%";
}

function updatePowerUsage() {
    powerUsage = 1;

    if (leftDoorClosed) {
        powerUsage++;
    }

    if (rightDoorClosed) {
        powerUsage++;
    }

    if (leftLightOn) {
        powerUsage++;
    }

    if (rightLightOn) {
        powerUsage++;
    }

    if (cameraOpen) {
        powerUsage++;
    }

    updateUsageDisplay();
}
function updateUsageDisplay() {
    usageDisplay.textContent =
        "Power Usage: " + "|".repeat(powerUsage);
}

function advanceTime() {
    if (!gameRunning) {
        return;
    }

    hour++;

    if (hour > 12) {
        hour = 1;
    }

    clock.textContent = hour + ":00 AM";

    if (hour === 6) {
        victory();
    }
}

function powerOutage() {
    gameRunning = false;
    stopCharacterTimers();

    leftDoorClosed = false;
    rightDoorClosed = false;
    leftLightOn = false;
    rightLightOn = false;

    leftDoorVisual.classList.remove("doorClosed");
    rightDoorVisual.classList.remove("doorClosed");

    leftDoorway.classList.remove("lightOn");
    rightDoorway.classList.remove("lightOn");

    cameraOpen = false;

    cameraSection.classList.add("hidden");
    section2.classList.remove("hidden");

    powerOutDisplay.classList.remove("hidden");

    ambienceSound.pause();
    ambienceSound.currentTime = 0;
}

function selectCamera(cameraNumber) {
    currentCamera = cameraNumber;

    cameraStatic.classList.remove("hidden");

    setTimeout(() => {
        cameraStatic.classList.add("hidden");
    }, 300);
    mapCam1.classList.remove("selectedCamera");
    mapCam2.classList.remove("selectedCamera");
    mapCam3.classList.remove("selectedCamera");
    mapCam4.classList.remove("selectedCamera");

    if (cameraNumber === 1) {
        mapCam1.classList.add("selectedCamera");
    }

    else if (cameraNumber === 2) {
        mapCam2.classList.add("selectedCamera");
    }

    else if (cameraNumber === 3) {
        mapCam3.classList.add("selectedCamera");
    }

    else if (cameraNumber === 4) {
        mapCam4.classList.add("selectedCamera");
    }

    if (cameraNumber === 1) {
        cameraRoom.textContent = "CAM 1 - Show Stage";
        cameraFeedText.textContent = "Show Stage Camera Feed";
    }

    else if (cameraNumber === 2) {
        cameraRoom.textContent = "CAM 2 - Dining Area";
        cameraFeedText.textContent = "Dining Area Camera Feed";
    }

    else if (cameraNumber === 3) {
        cameraRoom.textContent = "CAM 3 - Backstage";
        cameraFeedText.textContent = "Backstage Camera Feed";
    }

    else if (cameraNumber === 4) {
        cameraRoom.textContent = "CAM 4 - West Hall";
        cameraFeedText.textContent = "West Hall Camera Feed";
    }

    else if (cameraNumber === 5) {
        cameraRoom.textContent = "CAM 5 - Restrooms";
        cameraFeedText.textContent = "Restrooms Camera Feed";
    }

    else if (cameraNumber === 6) {
        cameraRoom.textContent = "CAM 6 - Kitchen";
        cameraFeedText.textContent = "Kitchen Camera Feed";
    }

    else if (cameraNumber === 7) {
        cameraRoom.textContent = "CAM 7 - Pirate Cove";
        cameraFeedText.textContent = "Pirate Cove Camera Feed";
    }

    updateCameraBonnie();
    updateCameraChica();
    updateFoxyCamera();
    updateFreddyCamera();
};

function showJumpscare(character) {
    gameRunning = false;
    stopCharacterTimers();

    if (character === "Bonnie") {
        jumpscareImage.src = "../assets/images/bonnie.png";
    }
    else if (character === "Chica") {
        jumpscareImage.src = "../assets/images/chica.png";
    }
    else if (character === "Foxy") {
        jumpscareImage.src = "../assets/images/foxy.png";
    }
    else if (character === "Freddy") {
        jumpscareImage.src = "../assets/images/freddy.png";
    }

    jumpscareScreen.classList.remove("hidden");
    playSound(jumpscareSound);

    jumpscareTimer = setTimeout(() => {
        gameOver();
    }, 1500);
}

function victory() {
    gameRunning = false;
    stopCharacterTimers();

    if (currentNight < 5 && currentNight === unlockedNight) {
        unlockedNight++;
    }

    victoryScreen.classList.remove("hidden");

    ambienceSound.pause();
    ambienceSound.currentTime = 0;
}

function restartGame() {
   
    stopCharacterTimers();
    clearTimeout(jumpscareTimer);
    jumpscareTimer = null;

   
    gameRunning = false;
    power = 100;
    powerUsage = 1;
    hour = 12;
    cameraOpen = false;
    currentCamera = 1;

    bonnieRoom = "Show Stage";
    chicaRoom = "Show Stage";
    foxyStage = 0;
    freddyRoom = "Show Stage";

    leftDoorClosed = false;
    rightDoorClosed = false;
    leftLightOn = false;
    rightLightOn = false;

    leftDoorVisual.classList.remove("doorClosed");
    rightDoorVisual.classList.remove("doorClosed");

    leftDoorway.classList.remove("lightOn");
    rightDoorway.classList.remove("lightOn");

    leftLightBeam.classList.remove("lightBeamOn");
    rightLightBeam.classList.remove("lightBeamOn");

    bonnieVisual.classList.add("hidden");
    chicaVisual.classList.add("hidden");
    foxyVisual.classList.add("hidden");

    mapCam1.classList.remove("selectedCamera");
    mapCam2.classList.remove("selectedCamera");
    mapCam3.classList.remove("selectedCamera");
    mapCam4.classList.remove("selectedCamera");
    mapCam5.classList.remove("selectedCamera");
    mapCam6.classList.remove("selectedCamera");
    mapCam7.classList.remove("selectedCamera");

    bonnieCameraImage.classList.add("hidden");
    chicaCameraImage.classList.add("hidden");
    foxyCameraImage.classList.add("hidden");
    freddyCameraImage.classList.add("hidden");

    updateFoxyStage();

    cameraRoom.textContent = "CAM 1 - Show Stage";
    cameraFeedText.textContent = "Show Stage Camera Feed";
    bonnieLocation.textContent = "Bonnie is on the Show Stage";

    powerDisplay.textContent = "Power: 100%";
    clock.textContent = "12:00 AM";
    updatePowerUsage();

    cameraSection.classList.add("hidden");
    jumpscareScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    victoryScreen.classList.add("hidden");
    powerOutDisplay.classList.add("hidden");
    cameraStatic.classList.add("hidden");

    section1.classList.add("hidden");
    section2.classList.remove("hidden");


    updateBonnieVisual();
    updateChicaVisual();
    updateCameraBonnie();
    updateFoxyCamera();
    updateFreddyCamera();

    startGame();
}

function updateNightTitle() {
    nightTitle.textContent = "Night " + currentNight;
}

function updateDifficulty() {
    difficulty = currentNight;

    console.log("Current difficulty: " + difficulty);
}

function playSound(sound) {
    sound.currentTime = 0;

    sound.play().catch(error => {
        console.error("Sound could not play:", error);
    });
}

function returnToMenu() {
    gameRunning = false;
    stopCharacterTimers();

    clearTimeout(jumpscareTimer);
    jumpscareTimer = null;

    section1.classList.remove("hidden");
    section2.classList.add("hidden");
    cameraSection.classList.add("hidden");
    jumpscareScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    victoryScreen.classList.add("hidden");

    ambienceSound.pause();
    ambienceSound.currentTime = 0;
}

function nextNight() {
    if (currentNight < unlockedNight) {
        currentNight++;
        restartGame();
    }
}


cameraButton.addEventListener("click", openCamera);
backToOfficeButton.addEventListener("click", closeCamera);

leftDoor.addEventListener("click", () => {
    leftDoorClosed = !leftDoorClosed;
    updatePowerUsage();
    console.log("Left door closed: " + leftDoorClosed);
    

    if (leftDoorClosed) {
        leftDoorVisual.classList.add("doorClosed");
    }
    else {
        leftDoorVisual.classList.remove("doorClosed");
    }

    playSound(doorSound);
});

rightDoor.addEventListener("click", () => {
    rightDoorClosed = !rightDoorClosed;
    updatePowerUsage();
    console.log("Right door closed: " + rightDoorClosed);
        
    if (rightDoorClosed) {
        rightDoorVisual.classList.add("doorClosed");
    }
    else {
        rightDoorVisual.classList.remove("doorClosed");
    }

    playSound(doorSound);
});

leftLight.addEventListener("click", () => {
    leftLightOn = !leftLightOn;
    updatePowerUsage();
    leftDoorway.classList.toggle("lightOn");
    leftLightBeam.classList.toggle("lightBeamOn");

    updateBonnieVisual();
    playSound(lightSound);
});

rightLight.addEventListener("click", () => {
    rightLightOn = !rightLightOn;
    updatePowerUsage();
    rightDoorway.classList.toggle("lightOn");
    rightLightBeam.classList.toggle("lightBeamOn");

    updateChicaVisual();
    playSound(lightSound);
});

mapCam1.addEventListener("click", () => {
    selectCamera(1);
});

mapCam2.addEventListener("click", () => {
    selectCamera(2);
});

mapCam3.addEventListener("click", () => {
    selectCamera(3);
});

mapCam4.addEventListener("click", () => {
    selectCamera(4);
});

mapCam5.addEventListener("click", () => selectCamera(5));

mapCam6.addEventListener("click", () => selectCamera(6));

mapCam7.addEventListener("click", () => {
    selectCamera(7);
});

restartButton.addEventListener("click", restartGame);

gameOverMenuButton.addEventListener("click", returnToMenu);

victoryMenuButton.addEventListener("click", returnToMenu);

nextNightButton.addEventListener("click", nextNight);

button.addEventListener("click", startGame);



setInterval(usePower, 10000);
setInterval(advanceTime, 60000);
updateBonnieVisual();