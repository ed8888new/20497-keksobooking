'use strict';
// card.js

(function () {

  window.card = {
    createPanel: function (announNew) {

      var template = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');
      var element = template.cloneNode(true);

      element.querySelector('.lodge__title').textContent = announNew.offer.title;
      element.querySelector('.lodge__address').textContent = announNew.offer.address;
      element.querySelector('.lodge__price').textContent = announNew.offer.price + '&#x20bd;/ночь';
      if (announNew.offer.type === 'flat') {
        element.querySelector('.lodge__type').textContent = 'Квартира';
      } else if (announNew.offer.type === 'bungalo') {
        element.querySelector('.lodge__type').textContent = 'Бунгало';
      } else {
        element.querySelector('.lodge__type').textContent = 'Дом';
      }
      element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + announNew.offer.guests + ' гостей в ' + announNew.offer.rooms + ' комнатах';
      element.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + announNew.offer.checkin + ', выезд до ' + announNew.offer.checkout;

      var lodgeFeatures = element.querySelector('.lodge__features');
      for (var i = 0; i < window.features.length; i++) {
        var featuresAll = '<span class="feature__image feature__image--' + window.features[i] + '"></span>';
        lodgeFeatures.insertAdjacentHTML('beforeend', featuresAll);
      }
      element.querySelector('.lodge__description').textContent = announNew.offer.description;
      document.querySelector('.dialog__title>img').setAttribute('src', announNew.author.avatar);

      element.tabIndex = 0;
      return element;
    }
  };

  var dialog = document.querySelector('.dialog');

  window.dialog = dialog;

  dialog.classList.add('hidden');

  var dialogClose = dialog.querySelector('.dialog__close');


  window.avatarPanel = {
    addAvatar: function (src) {

      var index = 0;

      var indexAvatar = function () {
        window.data.forEach(function (item, idx) {
          if (src.indexOf(item.author.avatar) >= 0) {
            index = idx;
          }
        });
        return index;
      };

      indexAvatar();

      dialog.replaceChild(window.card.createPanel(window.data[index]), dialog.children[1]);
      dialog.classList.remove('hidden');
    }
  };

  var clickDialogClose = function () {
    dialog.classList.add('hidden');
    window.removePin.removePinActiveElement();

  };

  dialogClose.addEventListener('click', clickDialogClose);

})();
