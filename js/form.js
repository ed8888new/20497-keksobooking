'use strict';
// form.js

(function () {

  var formAnnoun = document.querySelector('.notice__form');

  formAnnoun.querySelector('#address').setAttribute('required', 0);

  formAnnoun.querySelector('#title').setAttribute('required', 0);
  formAnnoun.querySelector('#title').setAttribute('minlength', 30);
  formAnnoun.querySelector('#title').setAttribute('maxlength', 100);

  formAnnoun.querySelector('#price').setAttribute('required', 0);
  formAnnoun.querySelector('#price').setAttribute('type', 'number');
  formAnnoun.querySelector('#price').setAttribute('min', 0);
  formAnnoun.querySelector('#price').setAttribute('max', 1000000);
  formAnnoun.querySelector('#price').setAttribute('value', 1000);

  formAnnoun.setAttribute('action', 'https://1510.dump.academy/keksobooking');

  var selectCheckIn = document.querySelector('#timein');
  var selectCheckOut = document.querySelector('#timeout');

  var clickChoice = null;

  var checkOptions = function (x, y) {

    [].forEach.call(x, function (item) {
      item.removeAttribute('selected');

      if (!(clickChoice.value === item.value)) {
        item.selected = false;
      } else {
        item.selected = true;
      }
    });

    [].forEach.call(y, function (itm) {
      itm.removeAttribute('selected');
      itm.selected = (clickChoice.value === itm.value) ? true : false;
    });

  };

  var changeCheckHandler = function (evt) {
    clickChoice = evt.currentTarget;

    var checkOutOptions = selectCheckOut.querySelectorAll('option');
    var checkInOptions = selectCheckIn.querySelectorAll('option');

    if (clickChoice.name === selectCheckIn.name) {
      checkOptions(checkInOptions, checkOutOptions);

    } else if (clickChoice.name === selectCheckOut.name) {
      checkOptions(checkOutOptions, checkInOptions);
    }
  };

  selectCheckIn.addEventListener('change', changeCheckHandler);
  selectCheckOut.addEventListener('change', changeCheckHandler);


  var selectType = document.querySelector('#type');
  var selectPrice = document.querySelector('#price');

  var changeTypeHandler = function (evt) {
    var typeFlat = evt.currentTarget.value;

    switch (typeFlat) {
      case 'bungalo':
        selectPrice.value = 0;
        break;
      case 'flat':
        selectPrice.value = 1000;
        break;
      case 'house':
        selectPrice.value = 5000;
        break;
      case 'palace':
        selectPrice.value = 10000;
        break;
    }
  };

  selectType.addEventListener('change', changeTypeHandler);

  var selectRoom = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');

  var CAPACITY_VARIANTS = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var changeRoomHandler = function () {

    var capacityOptions = selectCapacity.querySelectorAll('option');

    if (capacityOptions !== null) {

      [].forEach.call(capacityOptions, function (item) {

        item.removeAttribute('style');
        item.removeAttribute('selected');

        item.disabled = (CAPACITY_VARIANTS[selectRoom.value].indexOf(item.value) >= 0) ? false : true;

        if (!item.disabled) {
          item.removeAttribute('style');

          var isSelected = false;

          [].forEach.call(capacityOptions, function (x) {

            var active = (CAPACITY_VARIANTS[selectRoom.value].indexOf(x.value) >= 0) ? false : true;

            if (!active && !isSelected) {
              x.selected = true;
              isSelected = true;
            }

            x.disabled = active;
            x.hidden = active;
          });
        }
      });
    }
  };

  selectRoom.addEventListener('change', changeRoomHandler);

  var formContent = document.querySelector('.form__content');
  var userClickSend = document.querySelector('.form__submit');
  var userInput = formContent.querySelectorAll('input[type="text"]');

  var validFormHandler = function () {

    [].forEach.call(userInput, function (item) {

      if (!item.validity.valid) {
        item.style.borderColor = 'red';
      } else if (item.validity.valid) {
        item.removeAttribute('style');
      }
    });
  };

  userClickSend.addEventListener('click', validFormHandler);

})();
