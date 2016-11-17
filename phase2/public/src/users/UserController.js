var app = angular.module("users")
    .controller('UserController',['userService','$mdSidenav','$mdBottomSheet', '$timeout', '$log', '$scope', '$mdDialog', '$location', '$rootScope', '$q', '$route', 'DirectMessageService', 'settingsService', function(userService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog, $location, $rootScope, $q, $route, DirectMessageService,settingsService)
    {

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */

    var self = this;
    $scope.statusMessage = 'El ser humano es vago por naturaleza';
    self.loggedIn = false;
    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    self.makeContact  = makeContact;
    $scope.showCalendar=false;
    $scope.isFire=false;
    $scope.showName=false;
    self.courseList=[];

    function getSettings(){
      // GET User Information
      var id;
      var email = firebase.auth().currentUser.email;
      if(email==='israel.figueroa@upr.edu'){
        id=1;
        $scope.userRole='tutors'
        $scope.route('/tutors');
        $route.reload();
      }
      else{
        id=2;
        $scope.userRole='student';
        $scope.route('/home');
        $route.reload();
      }
      settingsService.getUserInfo(id)
      .then(function(response){
        $scope.userName=response[0].userFirstName;
        $scope.profilePicture = response[0].userImage;
        $scope.statusMessage = response[0].userStatus;
      });
    }

    $scope.route = function(path){
        $location.path(path);
    }


    $scope.isNavBarHide = function(){
        if($location.path().search('login')>-1){
            return true;
        }
        return false;
    }

    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(user.emailVerified){
      getSettings();
    }
    else{
      $scope.route('/verify');
    }
  }
  else {
    $scope.route('/login');
  }
});

    $scope.logIn = function(){
            var validated = true;
            var email = $scope.userEmail;
            var password = $scope.userPassword;
            if (typeof email === 'undefined' || !email) {
              swal("Please type an email", "", "warning");
              validated = false;
            }
            else if (typeof password === 'undefined' || !password) {
              swal("Please type a password", "", "warning");
              validated = false;
            }
            if(validated){
              $scope.loading=true;
              firebase.auth().signInWithEmailAndPassword(email, password)
              .then(function(onResolve){
                // $scope.route('home')
                $scope.loading=false;
              }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                  swal("Wrong Password", "", "error");
                } else {
                  swal(errorMessage, "", "error");
                }
                $scope.loading=false;
                $timeout($scope.$apply());
            });
          }
        }

        $scope.resend = function(){
          firebase.auth().currentUser.sendEmailVerification();
          swal('Verification email sent to: '+firebase.auth().currentUser.email, "", "success");
        }

        $scope.isUserVerified = function(){
          if(typeof(firebase.auth().currentUser) == 'undefined' || !firebase.auth().currentUser){
            return false;
          }
          return firebase.auth().currentUser.emailVerified;
        }

        $scope.signUp = function(){
          $scope.signFeedback="";
          if(typeof($scope.newEmail) != 'undefined' || $scope.newEmail){
            var domain = $scope.newEmail.split('@')[1];
            if(domain!='upr.edu'){
                swal('Type a upr student email. ¯\_(ツ)_/¯', "", "warning");
            }
            else{
              firebase.auth().createUserWithEmailAndPassword($scope.newEmail, $scope.newPassword)
              .then(function(onResolve){
                firebase.auth().currentUser.sendEmailVerification();
                swal('Verification email sent.', "", "success");
                $route.reload();
                //
                swal.setDefaults({
                  input: 'text',
                  confirmButtonText: 'Next &rarr;',
                  showCancelButton: true,
                  animation: false,
                  progressSteps: ['1', '2', '3']
                })

                var steps = [
                  {
                    title: 'Set Up your info.',
                    text: 'What is your name?'
                  },
                  'Question 2',
                  'Question 3'
                ]

                swal.queue(steps).then(function (result) {
                  swal.resetDefaults()
                  swal({
                    title: 'All done!',
                    html:'Welcome: <h4>' + JSON.stringify(result[0]) + '</h4>',
                    confirmButtonText: 'Lovely!',
                    showCancelButton: false
                  })
                }, function () {
                  swal.resetDefaults()
                })
                //
              }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                swal(errorMessage, "", "error");
            });
            }
          }
          else{
            swal('Type a valid email.', "", "warning");
          }

        }

        $scope.logOut = function(){
          firebase.auth().signOut();
        }

        $scope.forgotPassword = function(){
          var email=$scope.userEmail;
          if(typeof email === 'undefined' || !emailsorry){
            swal('Please type your email.', "", "info");
          }
          else{
            firebase.auth().sendPasswordResetEmail(email)
            .then(function(onResolve){
              swal('Email with password recovery instruction sent.', "", "success");
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              swal(errorMessage, "", "error");

          });
          }

        }



    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    $scope.toggleRightList = function(){
      $mdSidenav('right').toggle();
    }



    //
    var imagePath = "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xtf1/v/t1.0-1/13912618_10154625059185827_4804033282118954744_n.jpg?oh=71c307466a6f3cf85ffc580d1a588c02&oe=58C703DB&__gda__=1485738904_e299d10033dcc5340dcf7c055ddfd831";
    $scope.messages = [
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
      ];
    //

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

        $mdBottomSheet.show({
          controllerAs  : "vm",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }


   /* All of the following pertains to tutors*/

   var arrowDownIcon = "fa fa-chevron-down";
   var arrowLeftIcon = "fa fa-chevron-left";
   $scope.availability = "Available";
   self.deleteCourse = deleteCourse;

   $scope.status = '  ';
   $scope.customFullscreen = false;

   self.removeCourse = removeCourse;
   self.tempCourses = [];

   $rootScope.tempCourses = [];
   $scope.courseList=[
       {'id' :0,
        'code' : 'ICOM5016',
        'class': 'selectedButton'
       },
       {'id' :1,
        'code' : 'ICOM4035',
        'class': 'unselectedButton'
       },
       {'id' :2,
        'code' : 'ICOM4075',
        'class': 'unselectedButton'
       },
       {'id' :3,
        'code' : 'ICOM4009',
        'class': 'unselectedButton'
        }
      ];

   $scope.selectedCourse = $scope.courseList[0];

   $rootScope.currentCourses = [
        {'code' : 'ICOM5016','arrowIcon': arrowLeftIcon},
        {'code' : 'ICOM4035','arrowIcon': arrowLeftIcon}
   ]

   //$scope.newObject = {'code' : '','arrowIcon': arrowLeftIcon};

   function selectedItemChange(item) {
         //console.log(self.tempCourses);
         //console.log(item);
         //console.log(item.Code);
         $scope.isFire=true;
         $scope.item = item;
         $rootScope.tempCourses.push({'code': $scope.item.Code, 'arrowIcon': arrowLeftIcon});
         //$rootScope.currentCourses.push({'code': $scope.item.Code, 'arrowIcon': arrowLeftIcon});

         console.log($rootScope.tempCourses);

         //console.log($rootScope.currentCourses);
   //      $scope.tempCourses.push(item);
        $timeout(function() {
            $scope.isb = false;
        });
   }

   function saveCourses() {
        var length = $rootScope.tempCourses.length;
        console.log($rootScope.tempCourses);
        for (var i = 0; i < length; i++) {
            $rootScope.currentCourses.push($rootScope.tempCourses[i]);
            console.log($rootScope.tempCourses[i]);

        }
        console.log($rootScope.currentCourses);

//        console.log(tempCourses);
//        console.log($rootScope.currentCourses);
//        console.log(self.tempCourses.length);
//        console.log(self.tempCourses[0]);
//
//        while(tempCourses.length > 0)
//        {
//           $rootScope.currentCourses.push({'code': tempCourses[1], 'arrowIcon': arrowLeftIcon});
//           self.tempCourses.splice(0,1);
//           console.log($rootScope.currentCourses);
//        }

     }

   function removeCourse() {
           $rootScope.currentCourses.splice(courseToDelete,1);
           //console.log($rootScope.currentCourses);

      }

    $scope.toggleCourse = function(idx){
       var selected = idx;
       for(var i = 0; i < $scope.courseList.length; i++){
         if(i==selected){
           $scope.courseList[i].class = 'selectedButton';
           $scope.selectedCourse=$scope.courseList[i];
         }
         else{
           $scope.courseList[i].class = 'unselectedButton';
         }
       }
    }

    function deleteCourse(course){
        var index = $rootScope.currentCourses.indexOf(course);
        courseToDelete = index;
        //console.log(courseToDelete);
    }


    $scope.showConfirm = function(ev, course) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('Are you sure you want to delete this course?')
              .textContent('You can re-add the course later on.')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
          $scope.status = 'You decided to get rid of your debt.';
          deleteCourse(course);
          removeCourse();
        }, function() {
          $scope.status = 'You decided to keep your debt.';
        });
      };

    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'addCourses.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
	  if (answer == 'Done') {
            saveCourses();
          }
          $scope.status = 'You said the information was "' + answer + '".';
          //console.log(self.tempCourses);
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      };

  function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }


/* searchBarCtrl */

    self.simulateQuery = false;
    self.isDisabled    = false;

    self.repos         = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.removeChip = removeChip;

    //self.tempCourses=[];

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for repos... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
    }



    /**
     * Build `components` list of key/value pairs
     */
    function loadAll() {
      var repos = [
        {
          'Code': 'ICOM4035',
          'Title': 'Data Structures'
        },
        {
          'Code': 'ICOM4075',
          'Title': 'Foundations of Computing'
        },
        {
          'Code': 'ICOM4015',
          'Title': 'Advanced Programming'
        },
        {
          'Code': 'ICOM4009',
          'Title': 'Software Engineering'
        },
        {
          'Code': 'MATE666',
          'Title': 'Mate der Diablou'
        }
      ];
      return repos.map( function (repo) {
        repo.value = repo.Code.toLowerCase()+'-'+repo.Title.toLowerCase();
        return repo;
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) != -1);
      };

    }

    //Contact chips implementation
    self.readonly = false;

    // Lists of fruit names and Vegetable objects
    self.roCourseNames = angular.copy(self.repos);
    self.editableCourseNames = angular.copy(self.repos);

    self.tags = [];

    self.newCourse = function(chip) {
      return {
        Code: chip.Code,
        Title: chip.Title
      };
    };



    function removeChip(chip) {
//        var data = JSON.parse($scope.tempCourses);
//        var index = data.map(function(d) { return d['Code']; }).indexOf(chip.Code);
        //console.log(self.tempCourses);
    }

    function requestInfo(ev) {
      console.log('requesting...')
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'info.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
         .then(function(answer) {
                  $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                  $scope.status = 'You cancelled the dialog.';
                });
      };

    $scope.showSignUp = function(ev) {
      console.log(ev);
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'signup.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
         .then(function(answer) {
                  $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                  $scope.status = 'You cancelled the dialog.';
                });
      };


     function DialogController($scope, $mdDialog) {
         $scope.hide = function() {
           $mdDialog.hide();
         };

         $scope.cancel = function() {
           $mdDialog.cancel();
         };

         $scope.answer = function(answer) {
           $mdDialog.hide(answer);
         };
       }

  }]);
