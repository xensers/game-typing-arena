var activeDrawsList = [];
var showFrameRate = false;

function animate(options) {
    var options  = (typeof(options)          == 'object')   ? options          : {};
    var duration = (typeof(options.duration) == 'number')   ? options.duration : 1000;
    var delay    = (typeof(options.delay)    == 'number')   ? options.delay    : 0;
    var from     = (typeof(options.from)     == 'number')   ? options.from     : 1;
    var to       = (typeof(options.to)       == 'number')   ? options.to       : 100;
    var timing   = (typeof(options.timing)   == 'function') ? options.timing   : linear;
    var draw     = (typeof(options.draw)     == 'function') ? options.draw     : function(progress){console.log(progress * 100)};
    var before   = (typeof(options.before)   == 'function') ? options.before   : function() {};
    var after    = (typeof(options.after)    == 'function') ? options.after    : function() {};

    var fractionFrom = from / 100;
    var fractionTo   = to / 100;

    setTimeout(function() {
        var start    = performance.now();
        var timeLast = start;

        for (var i = activeDrawsList.length - 1; i >= 0; i--) {
            if (activeDrawsList[i] === draw) {
                return false;
            }
        }
        var animationIndex = activeDrawsList.push(draw);

        requestAnimationFrame(function animate(time) {
            if (before) {
                before();
                before = false;
            }
            var timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            if (fractionFrom < fractionTo) {
                timeFraction = timeFraction + fractionFrom;
                var terminationCondition = timeFraction < fractionTo;
            } else {
                timeFraction = -(timeFraction - fractionFrom);
                var terminationCondition = timeFraction > fractionTo;
            }

            var progress = timing(timeFraction);

            draw(progress);

            if (terminationCondition) {
                requestAnimationFrame(animate);

                if (showFrameRate) {
                    console.log(frameRate(timeLast, time), Math.round(timeFraction * 100));
                    timeLast = time;
                }
            } else {
                activeDrawsList.splice(activeDrawsList.indexOf(draw), 1);
                if (after) after();
            }
        });
    }, delay);
}

function frameRate(timeLast, timeNow) {
    return Math.round(1000 / (timeNow - timeLast));
}

function zone(current, from, to, draw) {
    current = current * 100;
    from    = from * 100;
    to      = to * 100;
    draw    = draw * 100;

    if (current >= from && current <= to) {
        var progress = (current - from) / (to - from);
        if (draw) draw(progress);
        return progress;
    } else if (current <= from) {
        return 0;
    } else if (current >= to) {
        return 1;
    }
}


// преобразователь в easeOut
function makeEaseOut(timing) {
    return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
}
// преобразователь в easeOut
function makeEaseInOut(timing) {
    return function(timeFraction) {
        if (timeFraction < 0.5)
            return timing(2 * timeFraction) / 2;
        else
            return (2 - timing(2 * (1 - timeFraction))) / 2;
    }
}

function linear(progress) {
    return progress;
}

function quad(progress) {
    return Math.pow(progress, 2);
}
var quadEaseOut = makeEaseOut(quad);

function circ(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction))
}
var circEaseOut = makeEaseOut(circ);

function back(x, timeFraction) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}
var backEaseOut = makeEaseOut(back);

function bounce(progress) {
    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (progress >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
        }
    }
}
var bounceEaseOut = makeEaseOut(bounce);

function elastic(x, timeFraction) {
    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}
var elasticEaseOut = makeEaseOut(elastic);
