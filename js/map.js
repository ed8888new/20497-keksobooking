'use strict';

(function () {

  var pinMap = document.querySelector('.tokyo__pin-map');

  var pins = window.data;

  // отрисовать пины
  pinMap.appendChild(window.pins.render(pins));

  var pinMain = document.querySelector('.pin__main');
  var fieldAddress = document.querySelector('#address');

  var pinMainDragHandler = function (evt) {

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var halfPinMainWidth = Math.floor(pinMain.offsetWidth / 2);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentY = pinMain.offsetTop - shift.y;
      var currentX = pinMain.offsetLeft - shift.x;

      var coordsLimit = function (coords, max, min) {
        if (coords > max) {
          coords = max;
        } else if ((coords - min) < 0) {
          coords = min;
        }
        return coords;
      };

      pinMain.style.top = coordsLimit(currentY, 570, 80) + 'px';
      pinMain.style.left = coordsLimit(currentX, 1200 - halfPinMainWidth, -halfPinMainWidth) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var currentCoordsX = pinMain.offsetLeft + halfPinMainWidth;
      var currentCoordsY = pinMain.offsetTop + pinMain.offsetHeight;

      var pinMainCoords = 'x: ' + currentCoordsX + ', y: ' + currentCoordsY;

      fieldAddress.setAttribute('value', pinMainCoords);
      fieldAddress.setAttribute('readonly', 0);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  pinMain.addEventListener('mousedown', pinMainDragHandler);

})();
