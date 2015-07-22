(function () {
    'use strict';

    var app = angular.module('robertPop');

    app.factory('SettingsRegionalSrv', ['$rootScope', 'LS', '$http', '$filter', function($rootScope, LS, $http) {

        var service = {};

        var hotelData = [];

        service.getData = function() {
            hotelData = LS.getLatestData();
            return hotelData;
        };

        service.setConfig = function(configs) {
            hotelData.config = configs;
            syncLSData();
        };

        var syncLSData = function () {
            LS.setLatestData(hotelData);
        };

        service.getAllTimeZones = function() {
            var req = {
                method: 'GET',
                url: BASE_URL + 'api/v1/config/timezones'
            };
            return $http(req);
        };

        service.updateRegionalSettings = function(dataObject) {
            var param = dataObject.paramName;
            var value = dataObject.paramValue;
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

        return service;

    }]);

}());