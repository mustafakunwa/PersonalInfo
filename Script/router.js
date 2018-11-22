myapp.config(['$routeProvider', function ($routeProvider) {

   
    $routeProvider

        //SHARED
        .when("/Home", {
            templateUrl: "Script/Shared/Views/DashBoard.html",
            controller: "DashBoardController"
        })

        .otherwise({
            templateUrl: "Script/Shared/Views/DashBoard.html",
            controller: "DashBoardController"
        });
}]);