(function () {
    'use strict';

    angular
        .module("webApiSample")
        .service('mediaService', ['$rootScope', '$q', mediaService]);

    //mediaService.$inject = ['$resource'];
    mediaService.$inject = ['$rootScope'];
    mediaService.$inject = ['$q'];
    
    function mediaService($rootScope, $q) {

        //// privates
        var _hubConnection = $.hubConnection();
        var _mediaHubProxy = undefined;

        //// Service methods implementation
        function _initialize() {

            // Hub Proxy (allows to make calls and register callbacks handlers)
            _mediaHubProxy = _hubConnection.createHubProxy(mediaSignalR.hubName);

            // signalR callbacks handlers
            _mediaHubProxy.on(mediaSignalR.onNewMedia, broadcastNewMedia);
            _mediaHubProxy.on(mediaSignalR.onRemoveMedia, broadcastRemoveMedia);

            // connect
            _hubConnection.start()
                .done(connectedToSignalR)
                .fail(function () { console.error('Error connecting to signalR'); });
        }

        function broadcastNewMedia(media) {
            console.log(mediaSignalR.onNewMedia + " " + media.text);
            $rootScope.$broadcast(mediaSignalR.onNewMedia, { media: media });
        }

        function broadcastRemoveMedia(mediaId) {
            console.log(mediaSignalR.onRemoveMedia + " " + mediaId);
            $rootScope.$broadcast(mediaSignalR.onRemoveMedia, { mediaId: mediaId });
        }

        function connectedToSignalR() {
            console.log('connected to signalR, connection ID =' + _hubConnection.id);
            $rootScope.$broadcast(signalR.onConnected, { connectionId: _hubConnection.id });
        }

        function _addMedia(media) {
            _mediaHubProxy.invoke(mediaSignalR.addMedia, media);
        }

        function _removeMedia(mediaId) {
            _mediaHubProxy.invoke(mediaSignalR.removeMedia, mediaId);
        }

        function _getAllMediasAsync() {

            var deferred = $q.defer();

            _mediaHubProxy.invoke(mediaSignalR.getAllMedias)
               .done(function (media) {
                   deferred.resolve(media);
               });

            return deferred.promise;
        }

        //// Service public methods
        var service = {};

        // SignalR hub
        service.mediaHubProxy = _mediaHubProxy;

        service.initialize = _initialize;
        service.addMedia = _addMedia;
        service.removeMedia = _removeMedia;
        service.getAllMediasAsync = _getAllMediasAsync;

        return service;
    }
})();
