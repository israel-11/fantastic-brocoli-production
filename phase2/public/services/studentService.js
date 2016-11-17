angular.module('users')
.factory('studentService', [
'$http',
function($http) {
	var studentService = {};
	studentService.getStudents = function () {
		return $http.get("https://glacial-journey-85518.herokuapp.com/allstudents")
		.then(function (response) {
			return response.data;
		})
		.then(null, function (err) {
			console.error(err);
		});
	};

	studentService.getStudentCourses = function(studentID){
	    return $http.get("https://glacial-journey-85518.herokuapp.com/studentCourses/"+studentID)
	    .then(function(response) {
	        return response.data;
	    })
	    .catch(null, function(err) {
	        console.error(err);
	    })

	}

	studentService.getStudentGroups = function(studentID){
    	    return $http.get("https://glacial-journey-85518.herokuapp.com/groupStudents/"+studentID)
    	    .then(function(response) {
    	        return response.data;
    	    })
    	    .then(null, function(err) {
    	        console.error(err);
    	    })

    }

    studentService.getAllGroups = function(){
        	    return $http.get("https://glacial-journey-85518.herokuapp.com/allgroups")
        	    .then(function(response) {
        	        return response.data;
        	    })
        	    .then(null, function(err) {
        	        console.error(err);
        	    })

        }


	return studentService;
}]);
