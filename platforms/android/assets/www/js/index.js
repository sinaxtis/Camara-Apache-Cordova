var lat, long, photo64;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.bindEvents(), false);
    },
    takePhoto: function () {
        navigator.camera.getPicture(app.onSuccess, app.onFail, { quality: 25,
        destinationType: Camera.DestinationType.DATA_URL});
    },
    cancelPhoto: function () {
    var image = document.querySelector('#Photo');
    image.src = "";
    takePhoto.style.visibility = 'visible';
    sendPhoto.style.visibility = 'hidden';
    cancelPhoto.style.visibility = 'hidden';
    var element = document.getElementById('coord');
    element.style.visibility = "hidden";
    },
    sendPhoto: function () {
        $.post("http://www.google.com",
        {
          foto: photo64,
          latitud: lat,
          longitud: long
        },
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    },
    onSuccess: function(imageData) {
    var image = document.querySelector('#Photo');
    image.display = 'block';
    image.src = "data:image/jpeg;base64," + imageData;
    photo64 = imageData;
    sendPhoto.style.visibility = 'visible';
    cancelPhoto.style.visibility = 'visible';
    takePhoto.style.visibility = 'hidden';
    navigator.geolocation.getCurrentPosition(app.onSuccessLoca, app.onErrorLoca);
    },

    onFail: function(message) {
    alert('Failed because: ' + message);
    },
    onSuccessLoca: function(position) {
        var element = document.getElementById('coord');
        lat = position.coords.latitude;
        long = position.coords.longitude;
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
                            
    },

    // onError Callback receives a PositionError object
    //
    onErrorLoca: function(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    },
    bindEvents: function() {
        var takePhoto = document.querySelector('#takePhoto');
        var sendPhoto = document.querySelector('#sendPhoto');
        sendPhoto.style.visibility = 'hidden';
        cancelPhoto.style.visibility = 'hidden';
        takePhoto.addEventListener('click', app.takePhoto, false);
        sendPhoto.addEventListener('click', app.sendPhoto, false);
        cancelPhoto.addEventListener('click', app.cancelPhoto, false);

    }
};

app.initialize();