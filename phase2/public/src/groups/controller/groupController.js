var app = angular.module("users")
.controller('groupController', function($scope, $compile, $location, $rootScope, $mdDialog) {

    var arrowDownIcon = "fa fa-chevron-down"
    var arrowLeftIcon = "fa fa-chevron-left"
    var members = [{'name' : 'Tahiri Ciquitraque'}, {'name' : 'Nelson Triple A'}, {'name' : 'Israel La Bestia'}]

    $scope.selectedItems = [];
    $scope.items = [];
    var list = [];
    $scope.submit = false;
    var submit = false;
    $scope.newObject = {'id' : '', 'idc' : '1', 'members' : members, 'name' : '', 'size' : '3', 'limit' : '', 'arrowIcon' : arrowLeftIcon};
    var nameSet = false;
    var limitSet = false;
    var courseSet = false;
    $scope.createGroup = false;

    $scope.groupList = [
    {'id' : '1','idc' : '1', 'name' : 'Project', 'size' : '3', 'limit' : '4', 'arrowIcon' : arrowLeftIcon, 'members' : members},
    {'id' : '2', 'idc' : '2', 'name' : 'Exam 1', 'size' : '3', 'limit' : '3', 'arrowIcon' : arrowLeftIcon, 'members' : members},
    {'id' : '3', 'idc' : '3', 'name' : 'Chilea', 'size' : '3', 'limit' : '5', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '4', 'idc' : '4', 'name' : 'Study Group', 'size' : '3', 'limit' : '8', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '5', 'idc' : '5', 'name' : 'Final Project', 'size' : '3', 'limit' : '3', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '6', 'idc' : '1', 'name' : 'Final Exam', 'size' : '3', 'limit' : '4', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '7', 'idc' : '3', 'name' : 'Exam 3', 'size' : '3', 'limit' : '5', 'arrowIcon' : arrowLeftIcon, 'members': members}
    ]

    $rootScope.groupsList = [
        {'id' : '1', 'idc' : '1', 'name' : 'Project', 'size' : '3', 'limit' : '4', 'arrowIcon' : arrowLeftIcon, 'members' : members},
        {'id' : '2', 'idc' : '2', 'name' : 'Exam 1', 'size' : '3', 'limit' : '3', 'arrowIcon' : arrowLeftIcon, 'members' : members}
        ]

    $scope.courseList = [
    {'id' : '1', 'idc' : '1', 'code' : 'ICOM4035', 'title' : 'Data Structures'},
    {'id' : '2', 'idc' : '2', 'code' : 'ICOM4075', 'title' : 'Foundations of Computing'},
    {'id' : '3', 'idc' : '3', 'code' : 'ICOM4015', 'title' : 'Advanced Programming'},
    {'id' : '4', 'idc' : '4', 'code' : 'ICOM4009', 'title' : 'Software Engineering'},
    {'id' : '5', 'idc' : '5', 'code' : 'MATE0666', 'title' : 'Mate der Diablou'}
    ]

    $scope.toggleGroups = function(i){
        if ($rootScope.groupsList[i].arrowIcon.search(arrowDownIcon)>-1){
            $rootScope.groupsList[i].arrowIcon = arrowLeftIcon;
        }
        else
            $rootScope.groupsList[i].arrowIcon = arrowDownIcon;
    }

    $scope.courseGroups = function (selectedCourse){
        var selected = 0;
        var length = $scope.courseList.length;
        var items = [];
        var length2 = $scope.groupList.length;

        for (var i = 0; i < length; i++) {
            var selection = selectedCourse.split("-");
            var temp = selection[0].split(" ");
            var string = temp[1];
            if($scope.courseList[i].code == string) {
                selected = $scope.courseList[i].idc;
                break;
            }
        }

        for (var j = 0; j < length2; j++) {
            if ($scope.groupList[j].idc == selected) {
                items.push($scope.groupList[j]);
            }
        }

        $scope.items = items;
    }

    $scope.toggle = function (item, list) {
      console.log(list);
      console.log(item);
      var idx = $scope.selectedItems.indexOf(item);
      if (idx > -1) {
        $scope.selectedItems.splice(idx, 1);
      }
      else {
        //list.push(item);
        $scope.selectedItems.push(item);
        console.log($scope.selectedItems);
      }
    }

    $scope.exists = function (item, list) {
      return $scope.selectedItems.indexOf(item) > -1;
    }

    $scope.submitGroup = function(){
        submit = true;
        for (var i = 0; i < $scope.selectedItems.length; i++){
            console.log($scope.selectedItems[i]);
            var objectList = $rootScope.groupsList;
            var length3 = objectList.length;
            var object = $rootScope.groupsList[length3-1];
            $scope.selectedItems[i].id = object.id + 1;
            $rootScope.groupsList.push($scope.selectedItems[i]);
        }
        console.log($rootScope.groupsList);
        //$location.path('#/groups');
        console.log($scope.createGroup);
        if ($scope.createGroup == true) {
            objectList = $rootScope.groupsList;
            length4 = objectList.length;
            object = $rootScope.groupsList[length4-1];
            $scope.newObject.id = object.id + 1;
            $rootScope.groupsList.push($scope.newObject);
        }
    }

    $scope.saveGroup = function(tempGroups) {
        console.log(tempGroups);
        for(i = 0; i < tempGroups; i++){
            console.log(tempGroups);
        }
    }

    $scope.removeGroup = function(group) {
        var index = $rootScope.groupsList.indexOf(group);
        $rootScope.groupsList.splice(index,1);
        console.log($rootScope.groupsList);
    }

    self.removeGroup = $scope.removeGroup;
    self.submitGroup = $scope.submitGroup;

    $scope.update = function(data, key) {
        console.log(data, key);
        if (key == 'name') {
            $scope.newObject.name = data;
            nameSet = true;
        }
        else if (key == 'limit') {
            $scope.newObject.limit = data;
            limitSet = true
        }
        else if (key == 'course') {
            courseSet = true;
        }
        if (nameSet == true && limitSet == true && courseSet == true) {
            $scope.createGroup = true;
        }
    }

    $scope.showTabDialog = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'tabDialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
         .then(function(answer) {
                  $scope.status = 'You said the information was "' + answer + '".';
                  submitGroup();
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
});
