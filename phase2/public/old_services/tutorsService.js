angular.module('users')
.factory('tutorsService', [
'$http',
function($http) {
	var tutorsService = {};
	tutorsService.getTutors = function () {
		return $http.get("https://rocky-shore-7054.herokuapp.com/api/course/search/")
		.then(function (response) {
			return response.data;
		})
		.then(null, function (err) {
			console.error(err);
		});
	};
	return tutorsService;
}]);
