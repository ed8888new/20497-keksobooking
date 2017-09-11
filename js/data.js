'use strict';
// data.js

(function () {

  var PATH_IMAGES = 'img/avatars/user';
  var TYPE_IMAGES = '.png';
  var NUMBER_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8];
  var NUMBER_IMAGES2 = new Array(8);

  var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_PRICE = [1000, 1000000];
  var OFFER_TYPE = ['flat', 'house', 'bungalo'];
  var OFFER_ROOMS = [1, 5];
  var OFFER_GUESTS = [1, 20];
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var locationX = [300, 900];
  var locationY = [100, 500];

  var messageCounter = 8;

  var getRandomValue = function (x) {
    return x[(Math.floor(x.length * Math.random()))];
  };

  var getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getImages = function (x) {
    x.pop();
    return x.length;
  };

  var tokyo = document.querySelector('.tokyo__pin-map');

  var heightAvatar = tokyo.querySelector('.rounded').getAttribute('height');
  var widthAvatar = tokyo.querySelector('.rounded').getAttribute('width');

  var announcementBox = function () {
    return {
      author: {
        avatar: PATH_IMAGES + '0' + NUMBER_IMAGES[getImages(NUMBER_IMAGES2)] + TYPE_IMAGES,
      },
      offer: {
        title: getRandomValue(OFFER_TITLE),
        address: getRandomNum(locationX[0], locationX[1]) + ', ' + getRandomNum(locationY[0], locationY[1]),
        price: getRandomNum(OFFER_PRICE[0], OFFER_PRICE[1]),
        type: getRandomValue(OFFER_TYPE),
        rooms: getRandomNum(OFFER_ROOMS[0], OFFER_ROOMS[1]),
        guests: getRandomNum(OFFER_GUESTS[0], OFFER_GUESTS[1]),
        checkin: getRandomValue(OFFER_CHECKIN),
        checkout: getRandomValue(OFFER_CHECKOUT),
        features: getRandomValue(OFFER_FEATURES),
        description: '',
        photos: [],
      },
      location: {
        x: (getRandomNum(locationX[0], locationX[1])),
        y: (getRandomNum(locationY[0], locationY[1]))
      }
    };
  };

  var renderAnnouncement = function (announ) {
    var newElement = document.createElement('div');
    newElement.className = 'pin';
    newElement.style.left = (announ.location.x + widthAvatar / 2) + 'px';
    newElement.style.top = (+announ.location.y + +heightAvatar) + 'px';
    newElement.innerHTML = '<img src="' + announ.author.avatar + '" class="rounded" width="40" height="40" tabindex="0">';

    return newElement;
  };

  var advert = [];

  window.data = {
    addItem: function () {
      for (var i = 0; i < messageCounter; i++) {
        advert.push(announcementBox());
      }
    }
  };

  window.data.addItem();


  var src = '';
  var index = 0;

  window.data = {
    indexAvatar: function () {
      advert.forEach(function (item, idx) {
        if (src.indexOf(item.author.avatar) >= 0) {
          index = idx;
        }
      });
      return index;
    }
  };

  var createSimilarElement = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < messageCounter; i++) {
      fragment.appendChild(renderAnnouncement(advert[i]));
    }

    return fragment;
  };

  tokyo.appendChild(createSimilarElement());

})();

