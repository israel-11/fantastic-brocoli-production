angular.module('users')
.factory('studentService', [
'$http',
function($http) {
	var studentService = {};
	studentService.getStudents = function () {
		return $http.get("https://lit-brook-54219.herokuapp.com/allstudents"+"&callback=?")
		.then(function (response) {
			return response.data;
		})
		.then(null, function (err) {
			console.error(err);
		});
	};

	studentService.getStudentCourses = function(studentID){
	    return $http.get("https://lit-brook-54219.herokuapp.com/studentCourses/"+studentID)
	    .then(function(response) {
	        return response.data;
	    })
	    .then(null, function(err) {
	        console.error(err);
	    })

	}
	return studentService;
}]);
