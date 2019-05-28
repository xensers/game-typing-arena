var breakpoint = {
    'small': 767,
    'medium': 992,
    'large': 1200
};

function respondTo(breakpoint, callback, runWhenCalled, addEvent) {
    if (breakpoint >= window.innerWidth) {
        var active = true;
        if (runWhenCalled) {
            requestAnimationFrame(callback);
        }
    } else {
        var active = false;
    }

    if (addEvent) {
        window.addEventListener("optimizedResize", function() {
            if (!active) {
                active = true;
                if (breakpoint >= window.innerWidth) {

                    setTimeout(function(){
                        requestAnimationFrame(callback);
                    }, 100);
                    return true;
                }
            }
            if (breakpoint <= window.innerWidth) active = false;
        });
    }
}

function respondFrom(breakpoint, callback, runWhenCalled, addEvent) {
    if (breakpoint <= window.innerWidth) {
        var active = true;
        if (runWhenCalled) {
            requestAnimationFrame(callback);
        }
    } else {
        var active = false;
    }

    if (addEvent) {
        window.addEventListener("optimizedResize", function() {
            if (!active) {
                active = true;
                if (breakpoint <= window.innerWidth) {

                    setTimeout(function(){
                        requestAnimationFrame(callback);
                    }, 100);
                    return true;
                }
            }
            if (breakpoint >= window.innerWidth) active = false;
        });
    }
}
