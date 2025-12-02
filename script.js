 const lyricsContainer = document.getElementById('lyricsContainer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let isPlaying = false;
let currentTimeout = null;
let currentCount = 99;

function getItemWord(count) {
    if (count === 1) {
        return 'cookie';
    } else {
        return 'cookies';
    }
}

function getColorClass(count) {
    let colorClass = '';
     switch (true) {
        case (count >= 25):
            colorClass = 'verse-green';
            break;
        case (count >= 10):
            colorClass = 'verse-yellow';
            break;
        case (count >= 1):
            colorClass = 'verse-red';
            break;
        default:
            colorClass = 'verse-final';
            break;
    }
    
    return colorClass;
}

function getCookieEmojis(count) {
    let emojis = '';
    
    if (count >= 50) {
        for (let i = 0; i < 5; i++) {
            emojis += '🍪';
        }
    } else if (count >= 25) {
        for (let i = 0; i < 4; i++) {
            emojis += '🍪';
        }
    } else if (count >= 10) {
        for (let i = 0; i < 3; i++) {
            emojis += '🍪';
        }
    } else if (count >= 5) {
        for (let i = 0; i < 2; i++) {
            emojis += '🍪';
        }
    } else if (count >= 1) {
        emojis = '🍪';
    } else {
        emojis = '😢';
    }
    
    return emojis;
}

function createVerse(count) {
    const verseDiv = document.createElement('div');
    const colorClass = getColorClass(count);
    verseDiv.className = `verse ${colorClass}`;
    
    const item = getItemWord(count);
    const nextCount = count - 1;
    const nextItem = getItemWord(nextCount);
    const emojis = getCookieEmojis(count);
    
    if (count === 0) {
        verseDiv.innerHTML = `
            <p class="count-line">
                😱 There's no more cookies in the jar, there's no more cookies! 😱
            </p>
            <p class="action-line">
                🏃 Help me now, running to the store to buy 99 cookies! 🛒
            </p>
            <p class="next-line">
                🍪🍪🍪 Time to start again! 🍪🍪🍪
            </p>
        `;
    } else {
        let actionText = '';
        
        if (count <= 5) {
            actionText = '😰 Take one down, pass it around... (we\'re running low!)';
        } else if (count <= 10) {
            actionText = '⚠️ Take one down, pass it around...';
        } else {
            actionText = '🎉 Take one down, pass it around...';
        }
        
        verseDiv.innerHTML = `
            <p class="count-line">
                <span class="cookie-emoji">${emojis}</span> 
                ${count} ${item} in the jar, ${count} ${item}!
            </p>
            <p class="action-line">${actionText}</p>
            <p class="next-line">
                ${nextCount} ${nextItem} in the jar! 
                <span class="cookie-emoji">${getCookieEmojis(nextCount)}</span>
            </p>
        `;
    }
    
    return verseDiv;
}

function displaySong() {
    if (!isPlaying) {
        return;
    }
    
    if (currentCount >= 0) {
        const verse = createVerse(currentCount);
        lyricsContainer.appendChild(verse);
        
        lyricsContainer.scrollTop = lyricsContainer.scrollHeight;
        
        currentCount--;
        
        let delay = 800;
        if (currentCount < 10) {
            delay = 1200;
        }
        
        if (currentCount >= 0) {
            currentTimeout = setTimeout(displaySong, delay);
        } else {
            isPlaying = false;
            startBtn.textContent = '▶️ Start Song';
        }
    }
}

function startSong() {
    if (isPlaying) {
        return;
    }
    
    isPlaying = true;
    startBtn.textContent = '⏸️ Playing...';
    
    if (currentCount === 99) {
        lyricsContainer.innerHTML = '';
    }
    
    displaySong();
}

function stopSong() {
    isPlaying = false;
    startBtn.textContent = '▶️ Continue';
    
    if (currentTimeout) {
        clearTimeout(currentTimeout);
        currentTimeout = null;
    }
}

function resetSong() {
    stopSong();
    currentCount = 99;
    startBtn.textContent = '▶️ Start Song';
    lyricsContainer.innerHTML = '<p class="instruction">Click "Start Song" to begin the countdown! 🍪</p>';
}

function displayAllAtOnce() {
    lyricsContainer.innerHTML = '';
    
    for (let count = 99; count >= 0; count--) {
        const verse = createVerse(count);
        lyricsContainer.appendChild(verse);
    }
}

startBtn.addEventListener('click', startSong);
stopBtn.addEventListener('click', stopSong);
resetBtn.addEventListener('click', resetSong);
