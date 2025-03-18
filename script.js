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

const translations = {
    en: {
        start: 'Start',
        pause: 'Pause',
        reset: 'Reset',
        restMode: 'Rest Mode',
        workMode: 'Work Mode',
        workTime: 'Work Time',
        breakTime: 'Break Time',
        timeToFocus: 'Time to focus!',
        anotherLoop: 'Time for another loop!',
        workTimeOver: 'Work time is over! Take a break!',
        breakTimeOver: 'Break is over! Back to work!'
    },
    fr: {
        start: 'Démarrer',
        pause: 'Pause',
        reset: 'Réinitialiser',
        restMode: 'Mode Repos',
        workMode: 'Mode Travail',
        workTime: 'Temps de Travail',
        breakTime: 'Temps de Pause',
        timeToFocus: 'Temps de se concentrer !',
        anotherLoop: 'Un autre cycle !',
        workTimeOver: 'Temps de travail terminé ! Prenez une pause !',
        breakTimeOver: 'Pause terminée ! Retour au travail !'
    }
};

let currentLang = 'en';

function updateLanguage(lang) {
    currentLang = lang;
    
    // Update button texts
    startButton.textContent = isRunning ? translations[lang].pause : translations[lang].start;
    resetButton.textContent = translations[lang].reset;
    modeToggle.textContent = isWorkTime ? translations[lang].restMode : translations[lang].workMode;
    
    // Update status text
    if (statusText.textContent === 'Time to focus!') {
        statusText.textContent = translations[lang].timeToFocus;
    } else if (statusText.textContent === 'Time for another loop!') {
        statusText.textContent = translations[lang].anotherLoop;
    } else {
        statusText.textContent = isWorkTime ? translations[lang].workTime : translations[lang].breakTime;
    }
    
    // Update document title
    document.title = `${isWorkTime ? translations[lang].workTime : translations[lang].breakTime} - Pomodoro`;
    
    // Update active state of language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTime : breakTime;
    statusText.textContent = isWorkTime ? translations[currentLang].workTime : translations[currentLang].breakTime;
    document.title = `${isWorkTime ? translations[currentLang].workTime : translations[currentLang].breakTime} - Pomodoro`;
    statusText.style.display = 'block';
    modeToggle.textContent = isWorkTime ? translations[currentLang].restMode : translations[currentLang].workMode;
    modeToggle.className = isWorkTime ? 'work-mode' : 'rest-mode';
    updateDisplay();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = translations[currentLang].pause;
        statusText.style.display = 'block';
        statusText.textContent = isWorkTime ? translations[currentLang].workTime : translations[currentLang].breakTime;
        
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                timerSound.play();
                alert(isWorkTime ? translations[currentLang].workTimeOver : translations[currentLang].breakTimeOver);
                switchMode();
            }
        }, 1000);
    } else {
        isRunning = false;
        startButton.textContent = translations[currentLang].start;
        clearInterval(timer);
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    isWorkTime = true;
    timeLeft = workTime;
    startButton.textContent = translations[currentLang].start;
    statusText.textContent = translations[currentLang].anotherLoop;
    statusText.style.display = 'block';
    modeToggle.textContent = translations[currentLang].restMode;
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