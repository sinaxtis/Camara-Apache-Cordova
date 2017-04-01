var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.bindEvents(), false);
    },
    takePhoto: function () {
        navigator.camera.getPicture(app.onSuccess, app.onFail, { quality: 25,
        destinationType: Camera.DestinationType.DATA_URL});
    },
    sendPhoto: function () {
        alert('no tengo ganas');
    },
    onSuccess: function(imageData) {
    var image = document.querySelector('#Photo');
    image.display = 'block';
    image.src = "data:image/jpeg;base64," + imageData;
    sendPhoto.style.visibility = 'visible';
    },

    onFail: function(message) {
    alert('Failed because: ' + message);
    },
    bindEvents: function() {
        var takePhoto = document.querySelector('#takePhoto');
        var sendPhoto = document.querySelector('#sendPhoto');
        sendPhoto.style.visibility = 'hidden';
        takePhoto.addEventListener('click', app.takePhoto, false);
        sendPhoto.addEventListener('click', app.sendPhoto, false);

    }
};

app.initialize();