var app = angular.module("users")
.controller('coursesController', function($scope, $compile, $location) {

   var arrowDownIcon = "fa fa-chevron-down";
   var arrowLeftIcon = "fa fa-chevron-left";

   var tutors = [{'name' : 'Tahiri Ciquitraque'}, {'name' : 'Nelson Triple A'}, {'name' : 'Israel La Bestia'}]


   $scope.courseList=[
    {'code' : 'ICOM5016', 'name' : 'Database Systems', 'tutors' : tutors,
     'arrowIcon':arrowLeftIcon
    },
    {'code' : 'ICOM4035', 'name' : 'Data Structures', 'tutors' : tutors,
     'arrowIcon':arrowLeftIcon
    },
    {'code' : 'ICOM4075', 'name' : 'Foundations of Computing', 'tutors' : tutors,
     'arrowIcon':arrowLeftIcon
    },
    {'code' : 'ICOM4009', 'name' : 'Software Engineering', 'tutors' : tutors,
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
