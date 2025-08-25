document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name-input');
    const addNameBtn = document.getElementById('add-name-btn');
    const nameListEl = document.getElementById('name-list');
    const startBtn = document.getElementById('start-roulette-btn');
    const canvas = document.getElementById('roulette-canvas');
    const ctx = canvas.getContext('2d');
    const resultPopup = document.getElementById('roulette-result');
    const resultText = document.getElementById('result-text');

    let participants = [];
    const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"];
    let currentRotation = 0;

    function drawParticipants() {
        nameListEl.innerHTML = '';
        participants.forEach((name, index) => {
            const li = document.createElement('li');
            li.textContent = name;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => {
                participants.splice(index, 1);
                drawParticipants();
                drawRoulette();
            };
            li.appendChild(deleteBtn);
            nameListEl.appendChild(li);
        });
        startBtn.disabled = participants.length < 2;
    }

    function drawRoulette() {
        const numSegments = participants.length;
        if (numSegments === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(150, 150, 148, 0, 2 * Math.PI);
            ctx.fillStyle = "#f0f0f0";
            ctx.fill();
            ctx.strokeStyle = "#ccc";
            ctx.stroke();
            return;
        }
        const anglePerSegment = 2 * Math.PI / numSegments;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '16px "Mochiy Pop One"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        participants.forEach((name, i) => {
            const startAngle = i * anglePerSegment;
            const endAngle = (i + 1) * anglePerSegment;
            
            ctx.beginPath();
            ctx.moveTo(150, 150);
            ctx.arc(150, 150, 150, startAngle, endAngle);
            ctx.closePath();
            
            ctx.fillStyle = colors[i % colors.length];
            ctx.fill();
            ctx.stroke();

            const textAngle = startAngle + anglePerSegment / 2;
            ctx.save();
            ctx.translate(150, 150);
            ctx.rotate(textAngle);
            ctx.fillStyle = "#333";
            ctx.fillText(name, 90, 0, 100); // 最大幅を指定
            ctx.restore();
        });
    }

    function addParticipant() {
        const name = nameInput.value.trim();
        if (name && !participants.includes(name)) {
            participants.push(name);
            nameInput.value = '';
            drawParticipants();
            drawRoulette();
        }
    }

    addNameBtn.addEventListener('click', addParticipant);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addParticipant();
    });

    startBtn.addEventListener('click', () => {
        if (participants.length < 2) return;

        const startSound = new Audio('電子ルーレット.mp3'); // ファイル名に合わせて変更
        startSound.play();
 
        startBtn.disabled = true;
        const spinAngle = 3600 + Math.random() * 360;
        const segmentAngle = 360 / participants.length;
        const winnerIndex = Math.floor(Math.random() * participants.length);
        const stopAngle = winnerIndex * segmentAngle + (segmentAngle / 2);
        
        currentRotation += spinAngle - (currentRotation % 360) - stopAngle;
        
        canvas.style.transition = 'transform 5s cubic-bezier(0.1, 0.7, 0.3, 1)';
        canvas.style.transform = `rotate(${currentRotation}deg)`;

        setTimeout(() => {
            resultText.innerHTML = `おごりは<br><span style="font-size:1.5em; color:#ff6347;">${participants[winnerIndex]}</span><br>さんに決定！`;
            resultPopup.style.display = 'flex';

const resultSound = new Audio('爆発1.mp3'); // ファイル名に合わせて変更
        resultSound.play();

        }, 5500);
    });

    window.resetRoulette = (isFullReset = false) => {
        resultPopup.style.display = 'none';
        startBtn.disabled = participants.length < 2;
        if (isFullReset) {
            canvas.style.transition = 'none';
            canvas.style.transform = 'rotate(0deg)';
            currentRotation = 0;
        }
    };

    drawRoulette();
});