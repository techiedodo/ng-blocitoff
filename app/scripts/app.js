(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
        });
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController as home',
                templateUrl: '/templates/home.html'
            });
    }
    angular
        .module('blocitoff', ['ui.router', 'firebase'])
        .config(config);
})();