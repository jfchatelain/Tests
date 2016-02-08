angular.module('starter.controllers', [])
.controller('DashCtrl', function ($scope, getCurrentPosition, getWeather) {
    getCurrentPosition(function (position) {
        getWeather(
           position 
           , function (data, position) {
               $scope.City = data.name;
               $scope.Country = data.sys.country;
               $scope.Description = data.weather[0].description;
               $scope.IconId = data.weather[0].icon;
               $scope.Temperature = data.main.temp;
               $scope.Time = Date.now();
               $scope.WindSpeed = data.wind.speed;

               var lat = position.coords.latitude;
               var lng = position.coords.longitude;

               // set map here
               var map = L.map('map').setView([lat, lng], 13);
               L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                   maxZoom: 18
               }).addTo(map);

               L.marker([lat, lng]).addTo(map).bindPopup("You are here!").openPopup();
               L.circle([lat, lng], position.coords.accuracy).addTo(map);

           });
    })
})

.controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
