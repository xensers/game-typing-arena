let uiElements = [];

let elems = document.querySelectorAll('.ui__element');
for (let i = 0; i < elems.length; i++) {
    uiElements[i] = new UiElement(elems[i]);
    uiElements[i].setText(makePhrase(4));
}

function makePhrase(length) {
    let result           = '';
    let characters       = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        let newChar = characters.charAt(Math.floor(Math.random() * charactersLength));
        let skip = false;
        if (i === 0) {
            // console.log(i, '------start-------');
            uiElements.map((uiElement, index) => {
                // console.log(i, uiElement.symbols[0], newChar, uiElement.symbols[0] === newChar);
                if (uiElement.symbols[0] === newChar) {
                    i = -1;
                    skip = true;
                    // console.log(i, '------true-------');
                }
            });
        }
        if (!skip) result += newChar;
        // else console.log(i, '------skip-------', result);
    }
    return result;
}



function UiElement (elem) {
    this.elem = elem;
    this.text = '';
    this.action = elem.dataset.action;
    this.direction = elem.dataset.direction;
    this.icon = elem.dataset.icon;
    this.symbols = [];
    this.elemSymbols = [];

    this.elemText = document.createElement('div');
    this.elemText.classList.add('ui__text');
    this.elem.appendChild(this.elemText);

    this.elemUiIcon = document.createElement('div');
    this.elemUiIcon.classList.add('ui__icon');
    this.elem.appendChild(this.elemUiIcon);

    this.elemIcon = document.createElement('div');
    this.elemIcon.classList.add('icon');
    this.elemIcon.classList.add('icon_' + this.icon);
    this.elemUiIcon.appendChild(this.elemIcon);


    this.setText = (text) => {
        this.text = text;
        this.elemText.innerHTML = '';
        this.text.split('').map((symbol, index) => {
            let span = document.createElement('span');
            symbol = symbol === ' ' ? '&nbsp;' : symbol;
            this.symbols[index] = symbol;
            span.innerHTML = symbol;
            span.className = 'symbol fadeIn';
            span.style.display = 'inline-block';
            span.style.animationDelay = index * 100 + 'ms';
            this.elemSymbols[index] = span;
            this.elemText.appendChild(span);
        });
    };


  return this;
}











