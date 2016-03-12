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
                expired: false,
                priority: $scope.newTaskPriority
            });
        };  
        $scope.elapsedTime = function(currentTask) {
            var millisecsLeft = (Date.now() - currentTask.created);
            var daysLeft = Math.floor(7-(millisecsLeft/86400000));
            var days = ((7-((Date.now() - currentTask.created)/86400000))%24)-daysLeft;
            var hoursLeft = (days*24).toPrecision(4);
            var hours = Math.floor(hoursLeft);
            var minsLeft = Math.floor((hoursLeft-hours)*60);
            var output = daysLeft + ' days; ' + hours + ' hrs.; ' + minsLeft + ' mins.';
            //var daysLeft = (7 - (Date.now() - currentTask.created)/86400000).toPrecision(2);
            if (minsLeft >= 0) {
                return output;
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
        
        $scope.displayPriority = function(task) {
             if (task.priority == 3) {
                    return "High";
             } else if (task.priority == 2) {
                    return "Medium";
             }  else {
                    return "Low";
             };
        };
    }
    angular
        .module('blocitoff')
        .controller('HomeController', HomeController);
})();