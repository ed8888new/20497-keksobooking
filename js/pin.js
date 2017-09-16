'use strict';
// pin.js

(function () {

  var MESSAGE_COUNTER = 8;

  var pinMap = document.querySelector('.tokyo__pin-map');

  window.removePin = {
    removePinActiveElement: function () {
      var pinActiveElement = document.querySelector('.pin--active');
      if (pinActiveElement !== null) {
        pinActiveElement.classList.remove('pin--active');
      }
    }
  };

  var src;

  var addClassActive = function (x) {
    x.parentElement.classList.add('pin--active');
    src = x.src;
  };

  var clickPinHandler = function (evt) {
    window.removePin.removePinActiveElement();

    var pinActiveElement = evt.target;

    if (pinActiveElement.classList.contains('pin')) {
      pinActiveElement.classList.add('pin--active');
      src = pinActiveElement.firstChild.src;
    } else if (pinActiveElement.tagName === 'IMG') {
      addClassActive(pinActiveElement);
    }

    window.avatarPanel.addAvatar(src);

    window.dialog.classList.add('hidden');

  };

  var keydownPinHandler = function (evt) {
    if (evt.keyCode === 27) {
      window.dialog.classList.add('hidden');
      window.removePin.removePinActiveElement();
    } else if (evt.keyCode === 13) {
      window.removePin.removePinActiveElement();

      addClassActive(evt.target);

      window.avatarPanel.addAvatar(src);

    }
  };


  var heightAvatar = pinMap.querySelector('.rounded').getAttribute('height');
  var widthAvatar = pinMap.querySelector('.rounded').getAttribute('width');

  var renderAnnouncement = function (announ) {
    var newElement = document.createElement('div');
    newElement.className = 'pin';
    newElement.style.left = (announ.location.x + widthAvatar / 2) + 'px';
    newElement.style.top = (+announ.location.y + +heightAvatar) + 'px';
    newElement.innerHTML = '<img src="' + announ.author.avatar + '" class="rounded" width="40" height="40" tabindex="0">';

    return newElement;
  };

  pinMap.addEventListener('click', clickPinHandler);
  pinMap.addEventListener('keydown', keydownPinHandler);

  window.pins = {
    render: function (data) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < MESSAGE_COUNTER; i++) {
        fragment.appendChild(renderAnnouncement(data[i]));
      }

      return fragment;
    }
  };
})();
