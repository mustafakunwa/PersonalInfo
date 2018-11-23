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
            $scope.Personalinfo = {
                Id: 0,
                Name: '',
                Email: '',
                Facebook: '',
                Twitter: '',
                Linkedin: ''
            };
            $scope.InfoForm.$setPristine();
            $scope.InfoForm.$setUntouched();
        };

        init();
    }]);

/////////////////////////////////////////////////////////////////////////////////////////////
myapp.service('DashboardServive', function () {

    var Info = [
        {
            Id: 1,
            Name: 'Mustafa',
            Email: 'm.kunwa52@gmail.com',
            Facebook: 'https://www.facebook.com/mustafakunwa',
            Twitter: 'https://www.twitter.com',
            Linkedin: 'https://www.linkedin.com'
        },
        {
            Id: 2,
            Name: 'Hakim',
            Email: 'Hakim.fg123@gmail.com'
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
        info.Id = Info.length == 0 ? 1 : Math.max.apply(Math, Info.map(function (o) { return o.Id; })) + 1;
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