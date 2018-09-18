(function() {

  "use strict";

  /**
   * @ngdoc function
   * @name webApiSample.controller:HomeCtrl
   * @description
   * # HomeCtrl
   * Controller of the webApiSample
   */
  angular
    .module("webApiSample")
    .controller("HomeCtrl", [ "$window",
      "fileService", "mediaService", "Upload", "apiUrl", function($window, fileService, mediaService, Upload, apiUrl) {

        var vm = this;

        //Variables
        vm.photos = [];
        vm.files = [];
        vm.previewPhoto = {};

        //Functions
        function setPreviewPhoto(photo) {
          if (photo && !photo.Uploading) {
            vm.previewPhoto = photo;
          } else {
            vm.previewPhoto = null;
          }
        }

        function activate() {
          fileService.getAll()
            .then(function (data) {
              vm.photos = data.data.Photos;
              setPreviewPhoto();
            }, function(err) {
              console.log("Error status: " + err.status);
            });
        }

        function uploadFiles(files) {
          vm.photos.push({ Name: files[0].name, Size: files[0].size, Uploading: true });
          vm.photos.sort((o1, o2) => o1.Name.localeCompare(o2.Name));

          Upload.upload({
              url: apiUrl,
              data: { file: files }
            })
            .then(function(response) {
              activate();
              setPreviewPhoto();
            }, function(err) {
              console.log("Error status: " + err.status);
            });
        }

        function removePhoto(photo) {
          fileService.deletePhoto(photo.Name)
            .then(function() {
              activate();

              setPreviewPhoto();
            });
        }

        //Set scope 
        activate();
        vm.uploadFiles = uploadFiles;
        vm.remove = removePhoto;
        vm.setPreviewPhoto = setPreviewPhoto;
      }
    ]);
})();
