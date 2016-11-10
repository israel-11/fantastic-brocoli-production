var app = angular.module("users")
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/login',
        {
          templateUrl:    'login.html',
          controller:     'authenticationController'
        });
    $routeProvider.when('/home',
    {
      templateUrl:    'src/home/view/home.html',
      controller:     'authenticationController'
    });
    $routeProvider.when('/courses',
    {
      templateUrl:    'src/courses/view/courses.html',
      controller:     'authenticationController'
    });
    $routeProvider.when('/courses/tutors-profile',
    {
          templateUrl:    'src/tutors/view/tutors-profile.html',
          controller:     'authenticationController'
    });
    $routeProvider.when('/groups',
    {
      templateUrl:    'src/groups/view/groups.html',
      controller:     'authenticationController'
    });
    $routeProvider.when('/tutors',
    {
          templateUrl:    'src/tutors/view/tutors.html',
          controller:     'authenticationController'
    });
    $routeProvider.when('/settings',
    {
          templateUrl:    'src/settings/view/settings.html',
          controller:     'authenticationController'
    });
    $routeProvider.when('/verify',
    {
          templateUrl:    'verify.html',
          controller:     'authenticationController'
    });
    $routeProvider.otherwise(
    {
      redirectTo:     '/login',
      controller:     'authenticationController',
    }
  );
});

app.controller('NavCtrl',
['$scope', '$location', function ($scope, $location) {

  if($location.path().length>3){
    $scope.currentNavItem = $location.path();
  }
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'all';
    return page === currentRoute ? 'active' : '';
  };
}]);

app.controller('CoursesCtrl', function($scope, $compile) {


});

app.controller('GroupsCtrl', function($scope, $compile) {


});

app.controller('TutorsCtrl', function($scope, $compile) {


});

app.controller('HomeCtrl', function($scope, $compile) {

});
app.controller('SettingsCtrl', function($scope, $compile) {

});
app.controller('authenticationController', function($scope, $compile) {
  
});
