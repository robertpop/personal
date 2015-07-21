(function () {
    'use strict';

    var app = angular.module('robertPop');

    // This AngularJS controller is used in the REGIONAL SETTINGS interface where the user can update his/her settings
    // regarding Time Zone, Week Start, Currency etc.
    // The functions below are accessible and are called from the directives and DOM elements on that page.

    app.controller('SettingsRegionalCtrl', ['$scope', '$rootScope', 'ErrorSrv', '$location', '$http', 'LS', 'SettingsRegionalSrv', 'MathGamesAppSrv', function($scope, $rootScope, ErrorSrv, $location, $http, LS, SettingsRegionalSrv, MathGamesAppSrv) {

        var hotelData = SettingsRegionalSrv.getData();
        // service data initialisation, initialising to the latest data from the Local Storage
        // object containing the latest data after initialisation
        // these two functions could be done in one single function, but due to other requirements, later, in other Services and Controller files,
        // it was better to keep them as two different functions

        $scope.mathGames = MathGamesAppSrv; //this is the scope object that can be used to call the MathGamesAppSrv service functions such as Fibo or FizzBuzz

        $scope.configObject = hotelData.config;
        //needed a stand-alone object for the config property of hotelData, which is the main data object

        $scope.timezones = [];
        var getTimeZones = function () {
            var req = SettingsRegionalSrv.serverRequest.getAllTimeZones();
            // loading Time Zones using the Service function for that
            req.success(function(res) {
                if (res.status.code=='ok') {
                    $scope.timezones = res.data.timezones;
                } else {
                    ErrorSrv.errorPopup(res.status, true);
                    // trigger popUp function from the ErrorSrv service which displays the error
                    // this type of error is different - even if the request is SUCCESSFUL, if the proper "success code aka 200 / 20" is not received
                    // from the server (for instance the request was successful, but the information was not actually added
                    // to the database because of another API request that already intervened) or internal server errors,
                    // so not one that could actually trigger the ERROR (below)
                }
            }).error(function (err) {
                ErrorSrv.errorPopup(err, false);
                // trigger popUp function from the ErrorSrv service which displays the error according to certain
                // information provided in the 'err' object
            });
        };
        getTimeZones();
        // actually loading the Time Zones for the first time

        $scope.changeLanguage = function(langString) {
            $scope.configObject.regional_language = langString;
            var req = SettingsRegionalSrv.serverRequest.updateRegionalSettings('regional_language', langString);
            // using the Service function called updateRegionalSettings, giving the right parameter name (regional_language) and its new value
            req.success(function(res) {
                if (res.status.code=='ok') {
                    SettingsRegionalSrv.setConfig($scope.configObject);
                    $scope.changeWebsiteLanguage(langString);
                } else {
                    ErrorSrv.errorPopup(res.status, true);
                }
            }).error(function (err) {
                ErrorSrv.errorPopup(err, false);
            });
        };
        // a function to be used by DOM Directives (which in this case work through Controllers and can't actually directly call Service functions)
        // to update Language as a Regional Setting option

        $scope.changeTimeZone = function(timeZoneObj) {
            $scope.configObject.regional_timezone = timeZoneObj;
            var req = SettingsRegionalSrv.serverRequest.updateRegionalSettings('regional_timezone', timeZoneObj.id);
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
        // same thing: updating TIME ZONE as a Regional Setting parameter using the general update function from the Service
        // and giving the right parameter name and its new value

        $scope.changeDateFormat = function(dateFormatString) {
            $scope.configObject.regional_date_format = dateFormatString;
            var req = SettingsRegionalSrv.serverRequest.updateRegionalSettings('regional_date_format', dateFormatString);
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
        // same thing for Date Format

        $scope.changeWeekStart = function(weekStartDay) {
            $scope.configObject.regional_week_start = weekStartDay;
            var req = SettingsRegionalSrv.serverRequest.updateRegionalSettings('regional_week_start', weekStartDay);
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
        // same thing for Week Start

        $scope.changeCurrencyPosition = function(currencyPos) {
            $scope.configObject.regional_currency_pos = currencyPos;
            var req = SettingsRegionalSrv.serverRequest.updateRegionalSettings('regional_currency_pos', currencyPos);
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
        // same thing for Currency Position


    }]);

}());