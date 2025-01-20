const fInput = document.getElementById('fileInput');
const aPlayer = document.getElementById('audioPlayer');
const pBtn = document.getElementById('playPauseBtn');
const sBar = document.getElementById('seekBar');
const tElapsed = document.getElementById('timeElapsed');
const dur = document.getElementById('duration');
const ttl = document.getElementById('title');
const qLabel = document.getElementById('queueLabel');
const qInput = document.getElementById('queueInput');
const iDiv = document.getElementById('inputs');

const qList = document.createElement('ul');
qList.id = 'queueDisplay';
iDiv.appendChild(qList);

let isPlaying = false;
let q = [];
let cIdx = 0;

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function updateQueue() {
    const qDisp = document.getElementById('queueDisplay');
    qDisp.innerHTML = '';
    q.forEach((f, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${f.name}`;
        li.className = i === cIdx ? 'current' : '';

        const rBtn = document.createElement('span');
        rBtn.textContent = '×';
        rBtn.className = 'remove-btn';
        rBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromQueue(i);
        });

        li.appendChild(rBtn);
        li.addEventListener('click', () => playTrack(i));
        qDisp.appendChild(li);
    });
}

function removeFromQueue(i) {
    q.splice(i, 1);
    if (i === cIdx) {
        if (q.length > 0) {
            playTrack(Math.min(cIdx, q.length - 1));
        } else {
            ttl.textContent = '';
            aPlayer.src = '';
        }
    } else if (i < cIdx) {
        cIdx--;
    }
    updateQueue();
}

function playTrack(i) {
    if (i < 0 || i >= q.length) return;

    cIdx = i;
    const f = q[i];
    const fURL = URL.createObjectURL(f);
    aPlayer.src = fURL;
    aPlayer.load();
    
    aPlayer.addEventListener('loadedmetadata', () => {
        sBar.max = Math.floor(aPlayer.duration);
        dur.textContent = formatTime(aPlayer.duration);
    });

    aPlayer.play();
    isPlaying = true;
    pBtn.textContent = 'Pause';
    ttl.textContent = f.name;
    updateQueue();
}

fInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    q.push(...files);
    updateQueue();

    if (q.length === 1) {
        playTrack(0);
    }
});

qInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    q.push(...files);
    updateQueue();
});

pBtn.addEventListener('click', () => {
    if (isPlaying) {
        aPlayer.pause();
        pBtn.textContent = 'Play';
    } else {
        aPlayer.play();
        pBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

aPlayer.addEventListener('timeupdate', () => {
    sBar.value = Math.floor(aPlayer.currentTime);
    tElapsed.textContent = formatTime(aPlayer.currentTime);
});

sBar.addEventListener('input', (e) => {
    aPlayer.currentTime = e.target.value;
});

aPlayer.addEventListener('ended', () => {
    if (cIdx < q.length - 1) {
        playTrack(cIdx + 1);
    } else {
        isPlaying = false;
        pBtn.textContent = 'Play';
    }
});
