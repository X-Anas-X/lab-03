'use strict';
$(document).ready(function () {
  // creating an array to push the info form the constructor into.
  let imgArr = [];


  function Image(pic) { //constructor
    this.title = pic.title;
    this.image_url = pic.image_url;
    this.keyword = pic.keyword;
    this.horns = pic.horns;
    this.description = pic.description; //checked
    imgArr.push(this);
  }



  // rendering the images through mustache
  Image.prototype.render = function () {
    let $picClone = $('#photo-template').html();
    var rendered = Mustache.render($picClone, this); // checked
    $('#second-page').append(rendered);
  };


  // getting data from json file
  const readJson = (num) => {
    $('#second-page').html(''); // checked
    $.ajax(`data/page-${num}.json`, { method: 'GET', dataType: 'JSON' })
      .then(data => {
        data.forEach(pics => {
          let horn = new Image(pics);
          horn.render();
          horn.renderList();

          renderSelect();
        });

      });
  };
  readJson(1);


  //rendering the listed keywords
  Image.prototype.renderList = function () {
    let options = $('<option> </option>');
    $('select').append(options);
    $(options).text(this.keyword);
    $(options).attr('value', this.keyword);
  };




  // hiding and showing the images on selection
  const renderSelect = () => {
    $('select').on('change', () => {
      let showValue = $('select').val();
      $('#second-page section').hide();
      $(`.${showValue}`).show();
    });
  };



  // changing the pages using the buttons
  function buttons() {
    $('#but-1').on('click', function () {
      readJson(1);
    });

    $('#but-2').on('click', function () {
      readJson(2);
    });
  }
  buttons();


  // the sort images function
  function sortBy(array, property) {

    array.sort((a, b) => {
      let firstItem = a[property];
      let secondItem = b[property];

      if (property === 'title') {
        firstItem = firstItem.toUpperCase();
        secondItem = secondItem.toUpperCase();
      }
      if (firstItem > secondItem) {
        return 1;
      }
      else if (firstItem < secondItem) {
        return -1;
      }
      else {
        return 0;
      }
    });
  }



  // the sort images check box render
  $('#rad-1').on('click', () => {
    sortBy(imgArr, 'title');
    $('#second-page').html('');
    imgArr.forEach(img => img.render());
  });


  $('#rad-2').on('click', () => {
    sortBy(imgArr, 'horns');
    $('#second-page').html('');
    imgArr.forEach(img => img.render());
  });



});












// 'use strict';
// $(document).ready(function() {

//   // array for keywords.
//   let keyArr = [];
//   //////////////////////////////////////////////////////////////
//   // Constructor function for the images from JSON
//   function Image (pic) {
//     this.image_url = pic.image_url;
//     this.title = pic.title;
//     this.description = pic.description;
//     this.keyword = pic.keyword;
//     this.horns = pic.horns;
//   }
//   ///////////////////////////////////////////////////////////////
//   // render the unique filter
//   Image.prototype.unique = function () {
//     if (!keyArr.includes(this.keyword)) {
//       keyArr.push(this.keyword);
//       let cloneSelect = $('option:first').clone();
//       cloneSelect.attr('value',this.keyword);
//       cloneSelect.text(this.keyword);
//       $('select').append(cloneSelect);
//     }
//   };
//   ///////////////////////////////////////////////////////////

//   // render the cloned images properities.
//   Image.prototype.render = function() {
//     let $picClone = $('#photo-template').html();
//     var rendered = Mustache.render($picClone, this, 'visiblity');
//     $('main').append(rendered);
//   };

//   /////////////////////////////////////////////////////////

//   // TO GET THE INFO INSIDE JSON FILE
//   const getJson = function(){
//     $.ajax('data/page-1.json', {method: 'get', dataType: 'JSON'}).then(data => {
//       console.log(data);
//       data.forEach(value => {
//         let finalPic = new Image(value);

//         finalPic.render();
//         finalPic.unique();
//       });
//     });
//   };
//   getJson();

//   ////////////////////////////////////////////////////////
//   //Event listener for the filter
//   $('select').on('change', function(){
//     $('section').removeClass('visiblity');
//     let $buttonScroll = $('select option:selected').val();
//     $(`[class*=${$buttonScroll}]`).addClass('visiblity');
//   });
// });





