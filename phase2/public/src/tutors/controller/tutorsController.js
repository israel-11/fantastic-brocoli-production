var app = angular.module("users")
.controller('tutorsController', function($scope, $compile) {

   $scope.availability = "Available";
   var arrowDownIcon = "fa fa-chevron-down";
   var arrowLeftIcon = "fa fa-chevron-left";

//   $scope.tutorCourseList=[
//    {'code' : 'ICOM5016',
//     'arrowIcon':arrowLeftIcon
//    },
//    {'code' : 'ICOM4035',
//     'arrowIcon':arrowLeftIcon
//    },
//    {'code' : 'ICOM4075',
//     'arrowIcon':arrowLeftIcon
//    },
//    {'code' : 'ICOM4009',
//     'arrowIcon':arrowLeftIcon
//     }
//   ];



   $scope.toggleCourse = function(i){
    if($scope.tutorCourseList[i].arrowIcon.search(arrowDownIcon)>-1){
        $scope.tutorCourseList[i].arrowIcon = arrowLeftIcon;
    }
    else{
        $scope.tutorCourseList[i].arrowIcon = arrowDownIcon;
    }

   }

//   $scope.saveCourses = function() {
//
//        for(i = 0; i < $scope.tempCourses; i++)
//        {
//            var obj = JSON.parse($scope.courseList);
//            obj.push({'code': $scope.tempCourses[i].Code, 'arrowIcon':arrowLeftIcon});
//            $scope.courseList = JSON.stringify(obj);
//
//        }
//
//   }




});