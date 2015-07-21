(function () {
    'use strict';

    var app = angular.module('robertPop');

    app.factory('MathGamesAppSrv', ['$rootScope', function($rootScope) {

        var fiboEvenSum = function(limitNo) {
            var fn3 = 2, fn6 = 0, fn = 2, sum = 0;
            while (fn < limitNo) {
                sum += fn;
                fn = 4 * fn3 + fn6;
                fn6 = fn3;
                fn3 = fn;
            }
            return sum;
        };

        var fizzBuzz = function(limitNo) {
            var i, result;
            for (i = 1; i <= limitNo; i++) {
                result = '';
                if (!(i % 3))
                    result += 'Fizz';
                if (!(i % 5))
                    result += 'Buzz';
                return (result || i);
            }
        };

        return {
            fiboEvenSum: fiboEvenSum,
            fizzBuzz: fizzBuzz
        };

    }]);

}());