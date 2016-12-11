var tegrapair   = angular.module('tegrapair', ['ngRoute']);

var categoryExp = [  'trainee'
                    ,'junior'
                    ,'full'
                    ,'senior'
                  ];
var developers  = {  trainee:[]
                    ,junior: []
                    ,full:   []
                    ,senior: []
                  };
var probability = [  [40,80,100]
                    ,[75,90,95,100]
                    ,[20,30,60,100]
                    ,[5,20,80,100]
                    ,[10,20,60,100] //driver
                  ];
tegrapair.config(function($routeProvider) {
    $routeProvider
        .when('/generate', {
            templateUrl : 'pages/generate.html',
            controller  : 'GeneratePair'
        })

        .when('/historic', {
            templateUrl : 'pages/historic.html',
            controller  : 'HistoricPairs'
        })

        .when('/register', {
            templateUrl : 'pages/register.html',
            controller  : 'RegisterPair'
        })
        .otherwise({redirectTo: '/'});
});
