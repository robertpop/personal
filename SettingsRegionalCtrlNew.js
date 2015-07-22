(function () {
    'use strict';

    var app = angular.module('robertPop');

    // This AngularJS controller is used in the REGIONAL SETTINGS interface where the user can update his/her settings
    // regarding Time Zone, Week Start, Currency etc.
    // The functions below are accessible and are called from the directives and DOM elements on that page.

    app.controller('SettingsRegionalCtrl', ['$scope', '$rootScope', 'ErrorSrv', '$location', '$http', 'LS', 'SettingsRegionalSrv', 'MathGamesAppSrv', function($scope, $rootScope, ErrorSrv, $location, $http, LS, SettingsRegionalSrv, MathGamesAppSrv) {

        $scope.regionalSettings = SettingsRegionalSrv;

        $scope.mathGames = MathGamesAppSrv;
        //this is the scope object that can be used to call the MathGamesAppSrv service functions such as Fibo or FizzBuzz

        var hotelData = $scope.regionalSettings.getData();
        $scope.configObject = hotelData.config;

        $scope.timezones = [];
        var getTimeZones = function () {
            var req = $scope.regionalSettings.getAllTimeZones();
            req.success(function(res) {
                if (res.status.code=='ok') {
                    $scope.timezones = res.data.timezones;
                } else {
                    ErrorSrv.errorPopup(res.status, true);
                }
            }).error(function (err) {
                ErrorSrv.errorPopup(err, false);
            });
        };
        getTimeZones();

        $scope.updateRegionalSettings = function() {
            var req = SettingsRegionalSrv.serverRequest.updateRegionalSettings($scope.configObject);
            req.success(function(res) {
                if (res.status.code=='ok') {
                    SettingsRegionalSrv.setConfig($scope.configObject);
                } else {
                    ErrorSrv.errorPopup(res.status, true);
                }
            }).error(function (err) {
                ErrorSrv.errorPopup(err, false);
            });
        };


    }]);

}());