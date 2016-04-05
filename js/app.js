(function(exif, rotate){

  "use strict";

  var photoInput,
    imageTemp,
    imgOriginalHolder,
    imgRotatedHolder;

  photoInput = window.document.querySelector("input[name='photo_input']");
  imageTemp = window.document.querySelector(".img-inner-holder");
  imgOriginalHolder = window.document.querySelector(".img-original");
  imgRotatedHolder = window.document.querySelector(".img-rotated");

  photoInput.addEventListener("change", function(event){

    var files;

    files = event.target.files;

    exif.getData(files[0], function() {

      var orientation = exif.getTag(this, "Orientation");

        console.log("Orientation: " + exif.getTag(this, "Orientation"));
        alert(exif.pretty(this));

        var img = document.createElement("img");
        img.src = window.URL.createObjectURL(files[0]);
        img.onload = function() {
          window.URL.revokeObjectURL(this.src);
          var uri = rotate(img, orientation);
          var i = new Image;
          i.src = uri;
          i.setAttribute("class", "the-image");
          img.setAttribute("class", "the-image");
          imgRotatedHolder.appendChild(i);
        }
        imgOriginalHolder.appendChild(img);

    });

  }, false);

}(require("exif-js"), require("exif-rotate")));