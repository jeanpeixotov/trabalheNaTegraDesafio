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

tegrapair.controller('RegisterPair', function($scope) {
    $scope.developer = {};
    $scope.experiences = categoryExp;
    $scope.submit = submit;

    function submit() {
        switch ($scope.developer.experience) {
            case categoryExp[0]:
                developers.trainee.push($scope.developer);
                break;
            case categoryExp[1]:
                developers.junior.push($scope.developer);
                break;
            case categoryExp[2]:
                developers.full.push($scope.developer);
                break;
            case categoryExp[3]:
                developers.senior.push($scope.developer);
                break;
        }
        $scope.developer = {};
    };
});

tegrapair.controller('GeneratePair',['$scope','service', function($scope,service) {

    $scope.GeneratePair = function() {

        if(!service.MinRequirements(developers)){
            $scope.err = 'No Available pair programming...';
        }else{
            var driver = service.Generator('driver',probability[4],developers);

            for (var i = 0; i < probability.length-1; i++) {
                if (driver.experience === categoryExp[i]) {
                    var nav = service.Generator(driver,probability[i],developers);
                }
            }
            var lastPair = service.lastPairEquals(driver,nav)
            if(lastPair){
                $scope.driver = [];
                $scope.nav    = [] ;
                $scope.err = 'Sorry, this pair was drawn in the last round, try to raffle again....';
                $scope.lastPair = lastPair;
            }else {
                $scope.driver = driver;
                $scope.nav    = nav;
                $scope.err    = ' - ';
                $scope.lastPair = [];

            }
        }
    };
}]);
