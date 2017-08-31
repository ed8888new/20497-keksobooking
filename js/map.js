'use strict';

var PATH_IMAGES = 'img/avatars/user';
var TYPE_IMAGES = '.png';
var NUMBER_IMAGES = [1, 8];

var OFFER_TITLE = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var OFFER_PRICE = [1000, 1000000];
var OFFER_TYPE = ["flat", "house", "bungalo"];
var OFFER_ROOMS = [1, 5];
var OFFER_GUESTS = [1, 20];
var OFFER_CHECKIN = ["12:00", "13:00", "14:00"];
var OFFER_CHECKOUT = ["12:00", "13:00", "14:00"];
var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var locationX = [300, 900];
var locationY = [100, 500];

var messageCounter = 8;

var getRandomValue = function (x) {
  return x[(Math.floor(x.length * Math.random()))];
};

var getRandomNum = function (x) {
  return (Math.round(Math.min.apply(null, x) - 0.5 + Math.random() * (Math.max.apply(null, x) - Math.min.apply(null, x) + 1)));
};

//console.log(Math.random() * (Math.max.apply(null, OFFER_GUESTS) - Math.min.apply(null, OFFER_GUESTS)));
//debugger;
var announcementBox = function () {
    var announcement = [{
      author: {
        avatar: PATH_IMAGES + '0' + getRandomNum(NUMBER_IMAGES) + TYPE_IMAGES,
      },
      offer: {
        title: getRandomValue(OFFER_TITLE),
        address: getRandomNum(locationX) + ', ' + getRandomNum(locationY),
        price: getRandomNum(OFFER_PRICE),
        type: getRandomValue(OFFER_TYPE),
        rooms: getRandomNum(OFFER_ROOMS),
        guests: getRandomNum(OFFER_GUESTS),
        checkin: getRandomValue(OFFER_CHECKIN),
        checkout: getRandomValue(OFFER_CHECKOUT),
        features: getRandomValue(OFFER_FEATURES),
        description: '',
        photos: [],
      },
      location: {
        x: getRandomNum(locationX),
        y: getRandomNum(locationY)
      }
    }];
    return announcement;
};

var renderAnnouncement = function (announ) {
  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.style.left = announ[0].location.x + 'px';
  newElement.style.top = announ[0].location.y + 'px';
  newElement.innerHTML = '<img src="' + announ[0].author.avatar + '" class="rounded" width="40" height="40">';

  return newElement;
};

var tokyo = document.querySelector('.tokyo__pin-map');

var createSimilarElement = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < messageCounter; i++) {
    fragment.appendChild(renderAnnouncement(announcementBox()));
  }
  return fragment;
};

tokyo.appendChild(createSimilarElement());
