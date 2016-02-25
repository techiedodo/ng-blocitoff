(function() {
    //$firebaseArray is injected into the controller
    function MainCtrl($scope, $firebaseArray){
        var tasksRef = new Firebase("https://gaytan-blocitoff.firebaseIO.com");
        
        //Data from a Firebase reference is downloaded into a (pseudo read-only) array
        $scope.tasks = $firebaseArray(tasksRef);
    }
    angular
        .module('blocitoff')
        .controller('MainCtrl', MainCtrl);
})();