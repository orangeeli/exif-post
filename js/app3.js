(function(exif, rotate){

  "use strict";

  var photoInput,
    imageTemp,
    imgOriginalHolder;

  photoInput = window.document.querySelector("input[name='photo_input']");
  imageTemp = window.document.querySelector(".img-inner-holder");
  imgOriginalHolder = window.document.querySelector(".img-original-holder");

  photoInput.addEventListener("change", function(event){

    var files;

    clearElementContent(imgOriginalHolder);

    files = event.target.files;

    exif.getData(files[0], function() {

      var orientation = exif.getTag(this, "Orientation");

        console.log("Orientation: " + exif.getTag(this, "Orientation"));
        alert(exif.pretty(this));

        var img = document.createElement("img");
        img.src = window.URL.createObjectURL(files[0]);
        img.onload = function() {
          window.URL.revokeObjectURL(this.src);
          img.setAttribute("class", "the-image");
        }
        imgOriginalHolder.appendChild(img);
        //imgOriginalHolder.setAttribute("style", "background: url("+img.src+") no-repeat; background-size:contain;");
    });

  }, false);

  function clearElementContent(element){
    element.innerHTML = "";
    return element;
  }

}(require("exif-js"), require("exif-rotate")));
