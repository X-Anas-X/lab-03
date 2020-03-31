'use strict';
$(document).ready(function() {
  // creating an array to push the keyword into.
  let keyWordArr = [];
  //////////////////////////
  function Images (pic) { //constructor
    this.title = pic.title;
    this.image_url = pic.image_url;
    this.keyword = pic.keyword;
    this.horns = pic.horns;
    this.description = pic.discription;
    keyWordArr.push(this);
  }
  ///////////////////////////////////////////////
  Images.prototype.renderList = function(){
    $('#form').append(`<option> ${this.keyword}</option>`);
  };
  //   renderList();

  ///////////////////////////////////////////////
  Images.prototype.render = function() {
    let $picClone = $('#photo-template').html();
    var rendered = Mustache.render($picClone, this);
    $('main').append(rendered);
  };
  //////////////////////////////////////////////////
  const readJson = () => {
    $.ajax('Data/page-1.json', {method: 'GET', dataType: 'JSON'})
      .then(data => {
        data.forEach(pics =>{
          let pic = new Images(pics);
          pic.render();
        });
      });
  };
  readJson();
});














// 'use strict';
// $(document).ready(function() {

//   // array for keywords.
//   let keyArr = [];
//   //////////////////////////////////////////////////////////////
//   // Constructor function for the images from JSON
//   function Images (pic) {
//     this.image_url = pic.image_url;
//     this.title = pic.title;
//     this.description = pic.description;
//     this.keyword = pic.keyword;
//     this.horns = pic.horns;
//   }
//   ///////////////////////////////////////////////////////////////
//   // render the unique filter
//   Images.prototype.unique = function () {
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
//   Images.prototype.render = function() {
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
//         let finalPic = new Images(value);

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
