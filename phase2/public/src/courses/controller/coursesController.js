var app = angular.module("users")
.controller('coursesController', ['$scope', 'studentService', '$compile', '$location', function($scope, studentService, $compile, $location) {

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

}]);
