(function(exif){

  "use strict";

  var photoInput,
    imageTemp,
    imgOriginalHolder,
    imgRotatedHolder;

  photoInput = window.document.querySelector("input[name='photo_input']");
  imageTemp = window.document.querySelector(".img-inner-holder");
  imgOriginalHolder = window.document.querySelector(".img-original-holder");
  imgRotatedHolder = window.document.querySelector(".img-rotated-holder");

  photoInput.addEventListener("change", function(event){

    var files;

    clearElementContent(imgOriginalHolder);
    clearElementContent(imgRotatedHolder);

    files = event.target.files;

    exif.getData(files[0], function() {

      var orientation = exif.getTag(this, "Orientation"),
        rotatedImage,
        selectedClassName="";
      console.log("Orientation: " + exif.getTag(this, "Orientation"));

      alert(exif.pretty(this));

      rotatedImage = new Image;
      rotatedImage.src = window.URL.createObjectURL(files[0]);

      switch(orientation){
        case 1:
          selectedClassName = " none";
          break;
        case 2:
          selectedClassName = " flipX";
          break;
        case 3:
          selectedClassName = " rotate180";
          break;
        case 4:
          selectedClassName = " flipY";
          break;
        case 5:
          selectedClassName = " flipX-rotate90";
          break;
        case 6:
          selectedClassName = " rotate90";
          break;
        case 7:
          selectedClassName = " flipX-rotate-90";
          break;
        case 8:
          selectedClassName = " rotate-90";
          break;
      }
      rotatedImage.className+=selectedClassName;
      var originalImage = document.createElement("img");
      originalImage.src = window.URL.createObjectURL(files[0]);

      rotatedImage.className+= " the-image";
      originalImage.setAttribute("class", "the-image");
      //imgRotatedHolder.appendChild(rotatedImage);
      imgRotatedHolder.setAttribute("style", "background: url("+rotatedImage.src+") no-repeat; background-size:contain;");
      imgRotatedHolder.className+=selectedClassName;
      originalImage.onload = function() {
        window.URL.revokeObjectURL(this.src);
      }
      //imgOriginalHolder.appendChild(originalImage);
      imgOriginalHolder.setAttribute("style", "background: url("+originalImage.src+") no-repeat; background-size:contain;");
      imgOriginalHolder.className+=selectedClassName;
    });

  }, false);

  function clearElementContent(element){
    element.innerHTML = "";
    return element;
  }

}(require("exif-js")));
