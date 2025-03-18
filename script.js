let timeLeft;
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isRunning = false;
let isWorkTime = true;
let timer;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const modeToggle = document.getElementById('mode-toggle');
const timerSound = document.getElementById('timerSound');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTime : breakTime;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    document.title = isWorkTime ? 'Work Time - Pomodoro' : 'Break Time - Pomodoro';
    statusText.style.display = 'block';
    modeToggle.textContent = isWorkTime ? 'Rest Mode' : 'Work Mode';
    modeToggle.className = isWorkTime ? 'work-mode' : 'rest-mode';
    updateDisplay();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = 'Pause';
        statusText.style.display = 'block';  // Show status text
        statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
        
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                timerSound.play();
                alert(isWorkTime ? 'Work time is over! Take a break!' : 'Break is over! Back to work!');
                switchMode();
            }
        }, 1000);
    } else {
        isRunning = false;
        startButton.textContent = 'Start';
        clearInterval(timer);
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    isWorkTime = true;
    timeLeft = workTime;
    startButton.textContent = 'Start';
    statusText.textContent = 'Time for another loop!';
    statusText.style.display = 'block';  // Show the status text
    modeToggle.textContent = 'Rest Mode';
    modeToggle.className = 'work-mode';
    updateDisplay();
}

// Initialize
timeLeft = workTime;
updateDisplay();
statusText.style.display = 'none';  // Hide status text initially
modeToggle.className = 'work-mode';  // Set initial mode class
document.title = 'Work Time - Pomodoro';  // Set initial title

// Event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
modeToggle.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = 'Start';
    switchMode();
});

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
}); 