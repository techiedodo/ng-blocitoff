(function() {
    //$firebaseArray is injected into the controller
    function HomeController($scope, $firebaseArray){
        var tasksRef = new Firebase("https://gaytan-blocitoff.firebaseIO.com/tasks");
        
        // create a synchronized array
        $scope.tasks = $firebaseArray(tasksRef);
        
        $scope.start = Date.now();
        
        // add new items to the array
        $scope.addTask = function() {
            $scope.tasks.$add({
                text: $scope.newTaskText,
                created: Firebase.ServerValue.TIMESTAMP,
                date: $scope.newTaskDate.getTime(),
                status: "active"
            });
        };
        
        
    }
    angular
        .module('blocitoff')
        .controller('HomeController', HomeController);
})();