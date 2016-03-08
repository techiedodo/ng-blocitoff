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
                created: Firebase.ServerValue.TIMESTAMP,
                date: $scope.newTaskDate.getTime(),
                status: 'active',
                expired: false
            });
        };  
        $scope.elapsedTime = function(currentTask) {
            var daysLeft = (7 - (Date.now() - currentTask.created)/86400000).toPrecision(2);
            if (daysLeft > 0) {
                return daysLeft;
            } else {
                tasksRef.child(currentTask.$id).update({status: 'expired'});
                tasksRef.child(currentTask.$id).update({expired: true});
                return 0
            };
        };
        $scope.completeTask = function(task) {
            if (task.status) {
                tasksRef.child(task.$id).update({status: 'complete'});
            };
        };
    }
    angular
        .module('blocitoff')
        .controller('HomeController', HomeController);
})();