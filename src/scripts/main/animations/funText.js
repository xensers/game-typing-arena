function funText(elemText, animateClass) {
    let text = elemText.innerText;
    elemText.innerHTML = '';

    text.split('').map((symbol, index) => {
        let span = document.createElement('span');
        symbol = symbol === ' ' ? '&nbsp;' : symbol;
        span.innerHTML = symbol;
        span.className = animateClass;
        span.style.display = 'inline-block';
        span.style.animationDelay = index * 100 + 'ms';
        elemText.appendChild(span);
    });
}