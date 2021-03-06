(function(exif, rotate){

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
          //imgRotatedHolder.appendChild(i);
          imgRotatedHolder.setAttribute("style", "background: url("+uri+") no-repeat; background-size:contain;");
        }
        //imgOriginalHolder.appendChild(img);
        imgOriginalHolder.setAttribute("style", "background: url("+img.src+") no-repeat; background-size:contain;");
    });

  }, false);

  function clearElementContent(element){
    element.innerHTML = "";
    return element;
  }

}(require("exif-js"), require("exif-rotate")));
