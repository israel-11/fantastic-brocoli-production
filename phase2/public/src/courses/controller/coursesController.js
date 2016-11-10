var app = angular.module("users")
.controller('coursesController', function($scope, $compile, $location) {

   var arrowDownIcon = "fa fa-chevron-down";
   var arrowLeftIcon = "fa fa-chevron-left";

   $scope.courseList=[
    {'name' : 'ICOM5016',
     'arrowIcon':arrowLeftIcon
    },
    {'name' : 'ICOM4035',
     'arrowIcon':arrowLeftIcon
    },
    {'name' : 'ICOM4075',
     'arrowIcon':arrowLeftIcon
    },
    {'name' : 'ICOM4009',
     'arrowIcon':arrowLeftIcon
     }
   ];


   $scope.route = function(path){
       $location.path(path);
   }

   $scope.toggleCourse = function(i){
    if($scope.courseList[i].arrowIcon.search(arrowDownIcon)>-1){
        $scope.courseList[i].arrowIcon = arrowLeftIcon;
    }
    else{
        $scope.courseList[i].arrowIcon = arrowDownIcon;
    }

   }

});