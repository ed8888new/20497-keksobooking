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

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.dialog.classList.add('hidden');

      var currentCoordsX = Math.floor(pinMain.offsetWidth / 2);
      var currentCoordsY = pinMain.offsetHeight;

      var pinMainCoords = 'x: ' + (pinMain.offsetLeft + currentCoordsX) + ', y: ' + (pinMain.offsetTop + currentCoordsY);

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
