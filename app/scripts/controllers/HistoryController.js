(function() {
    function HistoryController($scope, $firebaseArray){
        var tasksRef = new Firebase("https://gaytan-blocitoff.firebaseIO.com/tasks");
        
        $scope.tasks = $firebaseArray(tasksRef);
    }
    angular
        .module('blocitoff')
        .controller('HistoryController', HistoryController);
})();