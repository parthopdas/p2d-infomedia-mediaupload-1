(function() {

  "use strict";

  // Service to do CRUD operations on photos
  angular
    .module("webApiSample")
    .service("fileService", [
      "$http", "$q", "apiUrl", "Upload", function($http, $q, apiUrl, Upload) {

        function getAll() {
          var deferred = $q.defer();

          $http.get(apiUrl)
            .then(function(result) {
              deferred.resolve(result);
            },
            function errorCallback(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        }

        function getPhoto(fileName) {
          var deferred = $q.defer();

          $http.get(apiUrl + fileName)
            .then(function(result) {
              deferred.resolve(result);
            },
            function errorCallback(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        }

        function uploadPhoto(files) {
          var deferred = $q.defer();

          Upload.upload({
            url: apiUrl,
            data: { file: files }
          })
          .then(function(result) {
            deferred.resolve(result);
          },
          function errorCallback(error) {
            deferred.reject(error);
          });

          return deferred.promise;
        }

        function deletePhoto(fileName) {
          var deferred = $q.defer();

          $http.delete(apiUrl, { params: { fileName: fileName } })
            .then(function(result) {
              deferred.resolve(result);
            },
            function errorCallback(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        }

        return {
          getAll: getAll,
          getPhoto: getPhoto,
          uploadPhoto: uploadPhoto,
          deletePhoto: deletePhoto
        };
      }
    ]);
})();
