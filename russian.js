document.addEventListener('DOMContentLoaded', () => {

    const russianBtn = document.getElementById('russian-btn');

    const flashOverlay = document.getElementById('russian-flash-overlay');

    const resultPopup = document.getElementById('russian-result');

    const messageEl = document.getElementById('russian-message');



    russianBtn.addEventListener('click', () => {

        const pushSound = new Audio('決定ボタンを押す3.mp3'); // ファイル名に合わせて変更
    pushSound.play();

    russianBtn.disabled = true;
    messageEl.textContent = 'ドキドキ…';
    
    setTimeout(() => {
        if (Math.random() < 0.1) {
            // 当たり
            flashOverlay.classList.add('flash');
            
            // 当たり音
            const hitSound = new Audio('ぽきゅーん.mp3'); // ファイル名に合わせて変更
            hitSound.play();
            
            setTimeout(() => {
                resultPopup.style.display = 'flex';
            }, 1000);
        } else {
            // ハズレ
            // ハズレ音
            const missSound = new Audio('bu.mp3'); // ファイル名に合わせて変更
            missSound.play();

            messageEl.textContent = 'セーフ！！次の人どうぞ！';
            russianBtn.disabled = false;
        }
    }, 800);
});


    window.resetRussian = () => {

        resultPopup.style.display = 'none';

        flashOverlay.classList.remove('flash');

        messageEl.textContent = '運命のボタン…';

        russianBtn.disabled = false;

    };

});

