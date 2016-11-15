var app = angular.module("users")
.controller('coursesController',['$scope','$compile','$location','studentService', function($scope, $compile, $location, studentService) {

   var arrowDownIcon = "fa fa-chevron-down";
   var arrowLeftIcon = "fa fa-chevron-left";

  //  var tutors = [{'name' : 'Tahiri Ciquitraque'}, {'name' : 'Nelson Triple A'}, {'name' : 'Israel La Bestia'}]
   //
   //
  //  $scope.courseList=[
  //   {'code' : 'ICOM5016', 'name' : 'Database Systems', 'tutors' : tutors,
  //    'arrowIcon':arrowLeftIcon
  //   },
  //   {'code' : 'ICOM4035', 'name' : 'Data Structures', 'tutors' : tutors,
  //    'arrowIcon':arrowLeftIcon
  //   },
  //   {'code' : 'ICOM4075', 'name' : 'Foundations of Computing', 'tutors' : tutors,
  //    'arrowIcon':arrowLeftIcon
  //   },
  //   {'code' : 'ICOM4009', 'name' : 'Software Engineering', 'tutors' : tutors,
  //    'arrowIcon':arrowLeftIcon
  //    }
  //  ];

   $scope.courseList = [];

   //Get Student Courses
   studentService.getStudentCourses(1)
   .then(function(response){
      var studentInfo;
      studentInfo = response;
      function getTutors(tutors){
          var tutorsToAdd = [];
          for(var i = 0; i < tutors.length; i++){
            tutorsToAdd.push({'first': tutors[i].userFirstName,
                              'last': tutors[i].userLastName,
                              'image': tutors[i].userImage
                            });
          }
          return tutorsToAdd;
       }

       for(var i = 0; i < studentInfo.length; i++){
         var object = {'code' : studentInfo[i].courseCode,
                       'tutors': getTutors(studentInfo[i].tutors)
                      };
         $scope.courseList.push(object);
       }
   });

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

}]);
