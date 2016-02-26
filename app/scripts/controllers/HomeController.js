(function() {
    //$firebaseArray is injected into the controller
    function HomeController($scope, $firebaseArray){
        var tasksRef = new Firebase("https://gaytan-blocitoff.firebaseIO.com/tasks");
        
        // create a synchronized array
        $scope.tasks = $firebaseArray(tasksRef);
        
        // add new items to the array
        $scope.addTask = function() {
            $scope.tasks.$add({
                text: $scope.newTaskText,
                date: $scope.newTaskDate
            });
        };
    }
    angular
        .module('blocitoff')
        .controller('HomeController', HomeController);
})();