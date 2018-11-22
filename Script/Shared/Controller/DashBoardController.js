myapp.controller("DashBoardController", ['$scope', 'DashboardServive',
    function ($scope, DashboardServive) {

        function init() {
            $scope.Personalinfo = {};
        }

        $scope.Save = function () {
            if ($scope.IsEdit) {
                DashboardServive.Updateinfo($scope.Personalinfo);
                $scope.Clear();
            }
            else {
                DashboardServive.Saveinfo($scope.Personalinfo);
                $scope.Clear();
            }
        };

        $scope.Getlist = function () {
            $scope.List = DashboardServive.Getinfo();
        };

        $scope.Next = function () {
            var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
            $scope.selectedIndex = index;
            $scope.Getlist();
        };

        $scope.Add = function () {
            $scope.selectedIndex = 0;
            $scope.Clear();
        };

        $scope.Edit = function (Id) {
            $scope.IsEdit = true;
            $scope.selectedIndex = 0;
            $scope.Personalinfo = DashboardServive.Retrieveinfo(Id);
        };

        $scope.Delete = function (Id) {
            DashboardServive.Deleteinfo(Id);
        };

        $scope.Clear = function () {
            $scope.IsEdit = false;
            $scope.Personalinfo = {};
            $scope.InfoForm.$setPristine();
            $scope.InfoForm.$setUntouched();
        };

        init();
    }]);

/////////////////////////////////////////////////////////////////////////////////////////////
myapp.service('DashboardServive', function () {

    var Info = [
        {
            Name: 'Mustafa',
            Email: 'm.kunwa52@gmail.com',
            Facebook: 'www.facebook.com/mustafakunwa',
            Twitter: 'www.twitter.com',
            Linkedin: 'www.linkedin.com'
        },
        {
            Name: 'Hakim',
            Email: 'Hakim.fg@gmail.com'
        }
    ];
    return {
        Saveinfo: Saveinfo,
        Getinfo: Getinfo,
        Updateinfo: Updateinfo,
        Retrieveinfo: Retrieveinfo,
        Deleteinfo: Deleteinfo
    }

    function Saveinfo(info) {

        info.Id = Math.max.apply(Math, Info.map(function (o) { return o.Id; }))
        Info.push(info);
    }

    function Getinfo() {
        return Info;
    }

    function Updateinfo(info) {
        for (var i = 0; i < Info.length; i++) {
            if (info.Id == Info[i].Id) {
                Info[i] = info;
                break;
            }
        }
    }

    function Retrieveinfo(Id) {
        for (var i = 0; i < Info.length; i++) {
            if (Id == Info[i].Id) {
                return Info[i];
            }
        }
    }

    function Deleteinfo(Id) {
        for (var i = 0; i < Info.length; i++) {
            if (Id == Info[i].Id) {
                Info.splice(i, 1);
                break;
            }
        }
    }
})