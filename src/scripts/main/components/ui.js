function Ui () {
    let charCounter = 0;
    let found = -1;

    this.makePhrase = (length) => {
        let result           = '';
        let characters       = 'abcdefghijklmnopqrstuvwxyz';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            let newChar = characters.charAt(Math.floor(Math.random() * charactersLength));
            let skip = false;
            if (i === 0) {
                this.elements.map((element, index) => {
                    if (element.symbols[0] === newChar) {
                        i = -1;
                        skip = true;
                    }
                });
            }
            if (!skip) result += newChar;
        }
        return result;
    };

    this.elements = [];
    let elems = document.querySelectorAll('.ui__element');
    for (let i = 0; i < elems.length; i++) {
        this.elements[i] = new UiElement(elems[i]);
        let length = 4;
        if (config.lengthPhrasesForActions[this.elements[i].action]) {
            length = config.lengthPhrasesForActions[this.elements[i].action];
        }
        this.elements[i].setText(this.makePhrase(length));
    }

    this.found = (key) => {
        if (found < 0) {
            this.elements.map((uiElement, index) => {
                if (uiElement.symbols[charCounter] === key) {
                    uiElement.elemSymbols[charCounter].classList.remove('fadeIn');
                    uiElement.elemSymbols[charCounter].classList.add('fadeOutDown');
                    uiElement.elemText.style.transform = 'scale(1.5)';
                    found = index;
                } else {
                    uiElement.elem.style.opacity = '0';
                }
            });
            charCounter++;
        } else if (this.elements[found].symbols[charCounter] === key) {
            this.elements[found].elemSymbols[charCounter].classList.remove('fadeIn');
            this.elements[found].elemSymbols[charCounter].classList.add('fadeOutDown');
            charCounter++;
        } else {
            this.elements[found].setText(this.makePhrase(this.elements[found].text.length));
            found = -1;
            charCounter = 0;
        }

        if (found >= 0 && this.elements[found].symbols.length === charCounter) {
            this.elements[found].setText(this.makePhrase(this.elements[found].text.length));
            gameObjects.player1.runAction(this.elements[found].action , +this.elements[found].direction);
            found = -1;
            charCounter = 0;
        } else if (found >= 0 ) {
            this.elements[found].elemSymbols[charCounter].classList.add('symbol_selected');
        }

        if (found < 0){
            this.elements.map((uiElement, index) => {
                uiElement.elem.style.opacity = '1';
                uiElement.elemText.style.transform = '';
            });
            found = -1;
            charCounter = 0;
        }
    };

    return this;

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
