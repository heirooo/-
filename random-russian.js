document.addEventListener('DOMContentLoaded', () => {
    const randomRussianBtn = document.getElementById('random-russian-btn');
    const flashOverlay = document.getElementById('random-russian-flash-overlay');
    const resultPopup = document.getElementById('random-russian-result');
    const messageEl = document.getElementById('random-russian-message');

    let currentProbability = 0;

    function generateNewProbability() {
        // 0から30の間の整数を生成
        const prob = Math.floor(Math.random() * 31);
        randomRussianBtn.textContent = `${prob}%`;
        return prob;
    }

    // 画面切り替え時に確率を初期設定
    window.initRandomRussian = () => {
        currentProbability = generateNewProbability();
        messageEl.textContent = '運命のボタン…';
    };

    randomRussianBtn.addEventListener('click', () => {
        const pushSound = new Audio('決定ボタンを押す3.mp3');
        pushSound.play();

        randomRussianBtn.disabled = true;
        messageEl.textContent = 'ドキドキ…';
        
        setTimeout(() => {
            const randomNum = Math.floor(Math.random() * 100) + 1;
            if (randomNum <= currentProbability) {
                // 当たり
                flashOverlay.classList.add('flash');
                const hitSound = new Audio('ぽきゅーん.mp3');
                hitSound.play();

                setTimeout(() => {
                    resultPopup.style.display = 'flex';
                }, 1000);
            } else {
                // ハズレ
                const missSound = new Audio('bu.mp3');
                missSound.play();
                
                messageEl.textContent = 'セーフ！！次の人どうぞ！';
                randomRussianBtn.disabled = false;
                // ハズレの時のみ確率を更新
                currentProbability = generateNewProbability();
            }
        }, 800);
    });

    window.resetRandomRussian = () => {
        resultPopup.style.display = 'none';
        flashOverlay.classList.remove('flash');
        messageEl.textContent = '運命のボタン…';
        randomRussianBtn.disabled = false;
        currentProbability = generateNewProbability();
    };

    // 初回ロード時の確率設定
    if (document.getElementById('random-russian-game').style.display === 'flex') {
        window.initRandomRussian();
    }
});