/**
 * Сокращение для добавления события DOMContentLoaded
 * @param {Function} listener Cлушатель события
 */
function ready(listener) {
    document.addEventListener("DOMContentLoaded", listener);
}

/**
 * Custom Event Resize
 */
(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();


/**
 * Добавление событий
 * @param {[type]}   object   DOM узел
 * @param {string}   type     Тип прослушиваемого события.
 * @param {Function} listener Cлушатель события
 */
function addEvent(object, type, listener) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, listener, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, listener);
    } else {
        object["on" + type] = listener;
    }
};

/**
 * сompareFunction для arr.sort, для сортироки случйном порядке
 */
function compareRandom(a, b) {
    return Math.random() - 0.5;
}

/**
 * Получение DOM дерева другой страницы
 * @param  {String}   url      URL страницы
 * @param  {Function} callback Передаваемая функция
 */
function getDocument(url, callback)
{
  var http = new XMLHttpRequest();
  http.open('GET', url);
  http.onreadystatechange = function ()
  {
    if (this.readyState == 4 && this.status == 200) {
      var doc = new DOMParser().parseFromString(this.responseText, "text/html");  // преобразовать текст в HTML

      callback(doc);
    }
  }
  http.send(null);
}

/**
 *  возвращает cookie с именем name, если есть, если нет, то undefined
 */
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
