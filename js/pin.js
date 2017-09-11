'use strict';
// pin.js

(function () {

  var dialog = document.querySelector('.dialog');

  var pinMap = document.querySelector('.tokyo__pin-map');

  var removePinActiveElement = function () {
    var pinActiveElement = document.querySelector('.pin--active');
    if (pinActiveElement !== null) {
      pinActiveElement.classList.remove('pin--active');
    }
  };

  var index = 0;

  var addClassActive = function (x) {
    x.parentElement.classList.add('pin--active');
    var src = x.src;
  };

  var clickPinHandler = function (evt) {
    removePinActiveElement();

    var pinActiveElement = evt.target;

    if (pinActiveElement.classList.contains('pin')) {
      pinActiveElement.classList.add('pin--active');
      src = pinActiveElement.firstChild.src;
    } else if (pinActiveElement.tagName === 'IMG') {
      addClassActive(pinActiveElement);
    }

    window.data.indexAvatar();
    dialog.replaceChild(window.card.createPanel(window.data.advert[index]), dialog.children[1]);
    dialog.classList.remove('hidden');
  };

  pinMap.addEventListener('click', clickPinHandler);

  var keydownPinHandler = function (evt) {
    if (evt.keyCode === 27) {
      dialog.classList.add('hidden');
      removePinActiveElement();
    } else if (evt.keyCode === 13) {
      removePinActiveElement();

      addClassActive(evt.target);

      window.data.indexAvatar();

      dialog.replaceChild(window.card.createPanel(window.data.advert[index]), dialog.children[1]);
      dialog.classList.remove('hidden');
    }
  };

  pinMap.addEventListener('keydown', keydownPinHandler);

})();
