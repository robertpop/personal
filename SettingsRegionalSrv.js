(function () {
    'use strict';

    var app = angular.module('hoteloPro');

    app.factory('SettingsRegionalSrv', ['$rootScope', 'LS', '$http', '$filter', function($rootScope, LS, $http) {

        // This is mainly an AngularJS Service and it's similar to what I used for HoteloPro,
        // where I had to create several such services to load data from the DB.
        // Its role is to update / retrieve data from DB regarding HoteloPro Account Settings regarding REGIONAL SETTINGS
        // like Country, Time Zone, Currency Position etc.

        var hotelData = [];
        // main data object containing all the information needed when logging in on HoteloPro HMS platform, like number of rooms, account information etc.

        var getData = function() {
            hotelData = LS.getLatestData(); // get data stored in Local Storage, which is an Angular factory / service defined elsewhere
            return hotelData;
        };

        var setConfig = function(configs) {
        // CTO's decision to only load configs once and keep them stored and always rewrite them when something changes,
        // so this is the function for that and it only changes the CONFIG attribute of the hotelData object
            hotelData.config = configs;
            syncLSData();
        };

        var syncLSData = function () { // sync Hotel Data with Local Storage, overwriting existing data with new one
            LS.setLatestData(hotelData);
        };

        var serverRequest = {};
        // server request object with multiple functions that can be called in the Controller (see Controller file)

        serverRequest.getAllTimeZones = function() {
        // get Time Zones - this is a special function that calls in data from a different DB
        // and is not in the default Config object loaded above
            var req = {
                method: 'GET',
                url: BASE_URL + 'api/v1/config/timezones'
            };
            return $http(req);
        };

        serverRequest.updateRegionalSettings = function(param, value) {
        // update all Regional Settings, given the parameter (which is the Regional Settings paramter name, e.g. Country, Currency etc.)
        // and the value of the updated parameter
            var req = {
                method: 'POST',
                url: BASE_URL + 'api/v1/config',
                data: {
                    param: param,
                    value: value
                }
            };
            return $http(req);
        };

        return {
            serverRequest: serverRequest,
            getData: getData,
            setConfig: setConfig
        };

    }]);

}());