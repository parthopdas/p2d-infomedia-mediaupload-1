function signalR() {
}

// connected event
signalR.onConnected = "signalRConnected";

function mediaSignalR() {
}

// hub
mediaSignalR.hubName = "mediaHub";

// client calls
mediaSignalR.addNote = "addMedia";
mediaSignalR.removeMedia = "removeMedia";
mediaSignalR.getAllMedia = "getAllMedia";

// client callbacks
mediaSignalR.onNewMedia = "broadcastNewMedia";
mediaSignalR.onRemoveMedia = "broadcastRemoveMedia";

