(function() {

  "use strict";

  angular
    .module("webApiSample")
    .controller("HomeCtrl",
      ["$scope", "mediaService", "fileService", function($scope, fileCallbackService, fileService) {

        var vm = this;

        vm.connected = false;
        vm.connectionId = "not connected";

        vm.photos = [];
        vm.files = [];
        vm.previewPhoto = {};

        vm.activate = activate;
        vm.uploadFiles = uploadFiles;
        vm.remove = removePhoto;
        vm.setPreviewPhoto = setPreviewPhoto;

        function activate() {
          fileCallbackService.initialize();

          getAllFiles();

          $scope.$on(signalR.onConnected, function (event, args) {
            connectedToSignalR(args.connectionId);
          });

          $scope.$on(mediaSignalR.onNewMedia, function (event, args) {
              $scope.$apply(function() {
                onNewMedia(args.media);
              });
          });

          $scope.$on(mediaSignalR.onRemoveMedia, function (event, args) {
            $scope.$apply(function () {
              onRemoveMedia(args.mediaId);
            });
          });
        }

        function connectedToSignalR(connectionId) {
          $scope.$apply(function () {
            vm.connected = true;
            vm.connectionId = connectionId;

            console.log("HomeCtrl.connectedToSignalR");
          });
        }

        function setPreviewPhoto(photo) {
          if (photo && !photo.Uploading) {
            vm.previewPhoto = photo;
          } else {
            vm.previewPhoto = null;
          }
        }

        function getAllFiles() {
          fileService.getAll()
            .then(function (data) {
              vm.photos = data.data.Photos;
              setPreviewPhoto();
            }, function(err) {
              console.log("Error status: " + err.status);
            });
        }

        function uploadFiles(files) {
          fileService
            .uploadPhoto(files)
            .then(
                r => { }, 
                err => console.log("Error status: " + err.status));
        }

        function onNewMedia(photo) {
          if (!vm.photos.find(e => e.Name === photo.Name)) {
            vm.photos.push(photo);
          }
        }

        function onRemoveMedia(name) {
          vm.photos = vm.photos.filter(e => e.Name !== name);
        }

        function removePhoto(photo) {
          fileService
            .deletePhoto(photo.Name)
            .then(
              r => { }, 
              err => console.log("Error status: " + err.status));
        }

        vm.activate();
      }
    ]);
})();
