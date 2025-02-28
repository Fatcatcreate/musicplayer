# Music Player

## Overview
This project is a web-based music player that allows users to upload and play audio files. It supports queueing multiple tracks, seeking within a track, and basic playback controls.

## Features
- Upload and play audio files directly from your device
- Queue multiple tracks and manage playback order
- Play/Pause functionality
- Seek through the audio using a progress bar
- Display current track name, elapsed time, and total duration
- Remove tracks from the queue
- Auto-play next track when the current track ends

## Installation & Usage
1. Clone this repository:
   ```sh
   git clone https://github.com/Fatcatcreate/musicplayer.git
   ```
2. Open `index.html` in a web browser.
3. Click "Choose a file" to upload audio tracks.
4. Use the play button, seek bar, and other controls to manage playback.

## How It Works
### Main Components:
- `index.html`: The HTML structure for the player interface.
- `styles.css`: The stylesheet for styling the player.
- `music.js`: The JavaScript logic for handling audio playback and queue management.

### JavaScript Logic:
- **Queue Management**: Tracks are added to a queue when uploaded.
- **Playback Control**: Clicking a track in the queue plays it. The play/pause button toggles playback.
- **Seek Bar**: Allows users to navigate within a track.
- **Auto-Advance**: When a track ends, the next track in the queue plays automatically.
- **Remove from Queue**: Tracks can be removed dynamically.

## Code Overview
### Key Functions
```js
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
```



## Contact
submit a pull request!

