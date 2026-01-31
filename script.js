document.addEventListener('DOMContentLoaded', () => {
    // --- MUSIC LOGIC ---
    const tracks = document.querySelectorAll('.track-item');
    let currentAudio = null;

    // Helper function to stop any music currently playing
    function stopMusic() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            document.querySelector('.track-item.playing')?.classList.remove('playing');
        }
    }

    tracks.forEach(track => {
        track.addEventListener('click', () => {
            stopMusic(); // Stop previous song before starting new one
            
            const songUrl = track.getAttribute('data-src');
            const audio = new Audio(songUrl);
            currentAudio = audio;
            
            audio.play().catch(() => console.log("Song file not found."));
            track.classList.add('playing');
        });
    });

    // --- INTERACTIVE LOGIC ---
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const actionContainer = document.getElementById('action-container');
    const questionText = document.getElementById('question-text');
    const buttonRow = document.getElementById('button-row');
    const playlist = document.getElementById('playlist');
    const footer = document.getElementById('receipt_footer');
    const gifContainer = document.getElementById('gif-container');

    let yesScale = 1;
    let questionIndex = 0;

    // List of questions to show when "NO" is clicked
    const spicyQuestions = [
        "NAMISS-CLICK MO BA?",
        "HALA BAKIT KA NAG NO???",
        "PLEASE PO, MAG-YES KA...",
        "HALA SHA AYAW PAAWAT :((",
        "WALA KA NA BANG PAGMAMAHAL???",
        "NASASAKTAN NA KAMI NI BOB IND KA BA NAAWA?",
        "BAWAL HINDI PWEDE NO!!!",
        "NO CHOIZE KA NA PINDUTIN MO NA YES PLEASE"
    ];

    // NO CLICK: Change text, display GIF, move buttons, grow "Yes"
    noBtn.addEventListener('click', () => {
        stopMusic(); 
        // 1. Move buttons above the text
        actionContainer.insertBefore(buttonRow, questionText);
        
        // 2. Pick the next question from our list
        const currentMessage = spicyQuestions[questionIndex];
        
        // 3. Update the text with a GIF and the new message
        questionText.innerHTML = `
            <img src="minionbob.gif" class="gif-display">
            <p>${currentMessage}</p>
        `;

        // 4. Update index for the next click (loop back to start if at the end)
        questionIndex = (questionIndex + 1) % spicyQuestions.length;

        // 5. Make Yes button bigger
        yesScale += 0.6;
        yesBtn.style.transform = `scale(${yesScale})`;
        yesBtn.style.margin = `${10 * yesScale}px`;
    });

    // YES CLICK: Change Footer, Hide tracks, Show Celebration GIF
    yesBtn.addEventListener('click', () => {
        stopMusic();

        const celebrationAudio = new Audio('hehe.mp3'); 
        currentAudio = celebrationAudio;
        celebrationAudio.play().catch(() => console.log("Celebration song file not found."));

        playlist.insertAdjacentHTML('afterend', `
            <div id="celebration">
                <img src="a.gif" class="gif-display">
                <p style="text-align:center">YIPEEE!!! HEHEHE MY FOREVER VALENTINE!!!</p>
            </div>
        `);
        playlist.classList.add('hidden');
        actionContainer.classList.add('hidden');

        receipt_footer.innerHTML = `
            ORDER STATUS: PUNO NA NG PAGMAMAHAL<br>
            CASHIER: ELY, ANG MISIS MONG MAGANDA<br>
            I LOVE YOU SO MUCH!!!
        `;

        
    });
});