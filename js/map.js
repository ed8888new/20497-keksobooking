'use strict';

(function () {

  var pinMap = document.querySelector('.tokyo__pin-map');

  var pins = window.data;

  // отрисовать пины
  pinMap.appendChild(window.pins.render(pins));
})();
