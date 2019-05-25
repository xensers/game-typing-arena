function FunText() {
    let elemText = document.querySelector('.fun-text');
    let text = elemText.innerText;
    elemText.innerHTML = '';

    let animations = [
        'fadeIn',
        'fadeInUp',
        'fadeInLeft',
        'fadeInRight',
    ];

    let rand = Math.floor(Math.random() * animations.length);

    text.split('').map((symbol, index) => {
        console.log(index);
        let span = document.createElement('span');
        symbol = symbol === ' ' ? '&nbsp;' : symbol;
        span.innerHTML = symbol;
        span.className = animations[rand];
        span.style.display = 'inline-block';
        span.style.animationDelay = index * 100 + 'ms';
        elemText.appendChild(span);
    });
}