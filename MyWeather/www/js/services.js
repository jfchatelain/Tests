angular.module('starter.services', [])
.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});


angular.module('WeatherApp.services.Cordova', [])
    .factory('deviceReady', function () {
        return function (done) {
            if (typeof window.cordova === 'object') {
                document.addEventListener('deviceready', function () { 
                    done();
                }, false);
            } else {
                done();
                
            }
        };
    });

angular.module('WeatherApp.services.Geolocation', ['WeatherApp.services.Cordova'])
.factory('getCurrentPosition', function (deviceReady, $document, $window, $rootScope) {
    return function (done) {
        deviceReady(function () { 
            navigator.geolocation.getCurrentPosition(function (position) {
                $rootScope.$apply(function () {
                    done(position);
                });
            }, function (error) {
                $rootScope.$apply(function () {
                    throw new Error('Unable to retreive position');
                });
            });
        });
    };
});

angular.module('WeatherApp.services.Forecast', [])
.factory('getWeather', function ($http) {
    return function (position, done) {
        $http({ method: 'GET', url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + "&appid=44db6a862fba0b067b1930da0d769e98&units=metric" })
            .success(function (data, status, headers, config) {
                done(data, position);
            })
            .error(function (data, status, headers, config) {
                throw new Error('Unable to get weather');
            });
    };
}); 
 
