'use strict';

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

var tokyo = document.querySelector('.tokyo__pin-map');
var heightAvatar = tokyo.querySelector('.rounded').getAttribute('height');
var widthAvatar = tokyo.querySelector('.rounded').getAttribute('width');
var template = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');

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

var createPanel = function (announNew) {

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
  for (var i = 0; i < OFFER_FEATURES.length; i++) {
    var featuresAll = '<span class="feature__image feature__image--' + OFFER_FEATURES[i] + '"></span>';
    lodgeFeatures.insertAdjacentHTML('beforeend', featuresAll);
  }
  element.querySelector('.lodge__description').textContent = announNew.offer.description;

  document.querySelector('.dialog__title>img').setAttribute('src', announNew.author.avatar);

  element.tabIndex = 0;
  return element;
};

var advert = [];

var addItem = function () {
  for (var i = 0; i < messageCounter; i++) {
    advert.push(announcementBox());
  }
};

addItem();

var createSimilarElement = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < messageCounter; i++) {
    fragment.appendChild(renderAnnouncement(advert[i]));
  }

  return fragment;
};

var dialog = document.querySelector('.dialog');
dialog.classList.add('hidden');

tokyo.appendChild(createSimilarElement());

var pinMap = document.querySelector('.tokyo__pin-map');

var removePinActiveElement = function () {
  var pinActiveElement = document.querySelector('.pin--active');
  if (pinActiveElement !== null) {
    pinActiveElement.classList.remove('pin--active');
  }
};

var src = '';
var index = 0;

var indexAvatar = function () {

  advert.forEach(function (item, idx) {
    if (src.indexOf(item.author.avatar) >= 0) {
      index = idx;
    }
  });
  return index;
};

var addClassActive = function (x) {
  x.parentElement.classList.add('pin--active');
  src = x.src;
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

  indexAvatar();

  dialog.replaceChild(createPanel(advert[index]), dialog.children[1]);
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

    indexAvatar();

    dialog.replaceChild(createPanel(advert[index]), dialog.children[1]);
    dialog.classList.remove('hidden');
  }
};

pinMap.addEventListener('keydown', keydownPinHandler);

var dialogClose = dialog.querySelector('.dialog__close');

var clickDialogClose = function () {
  dialog.classList.add('hidden');
  removePinActiveElement();

};

dialogClose.addEventListener('click', clickDialogClose);
