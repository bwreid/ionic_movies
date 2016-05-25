// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'js/search/search.template.html',
        controller: 'SearchCtrl',
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'js/auth/login.template.html',
        controller: 'LoginCtrl',
      }
    },
    data: {
      blockLogin: true,
    }
  })

  .state('app.logout', {
    url: '/logout',
    views: {
      'menuContent': {
        controller: 'LoginCtrl',
      }
    },
    data: {
      requireLogin: true,
    }
  })

    .state('app.stream_series', {
      url: '/streaming/series/:type/:id',
      views: {
        'menuContent': {
          templateUrl: 'js/streaming/streaming_series.template.html',
          controller: 'StreamCtrl',
        }
      },
      data: {
        requireLogin: true,
      }
    })

  .state('app.stream_movie', {
    url: '/streaming/movie/:type/:id',
    views: {
      'menuContent': {
        templateUrl: 'js/streaming/streaming.template.html',
        controller: 'StreamCtrl',
      }
    },
    data: {
      requireLogin: true,
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'js/auth/register.template.html',
        controller: 'RegisterCtrl',
      }
    },
    data: {
      blockLogin: true,
    }
  })

  .state('app.scan', {
      url: '/scan',
      views: {
        'menuContent': {
          templateUrl: 'js/scanner/scanner.template.html',
          controller: 'ScanCtrl',
        }
      }
    })
    .state('app.collection', {
      url: '/collection',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/collection/collection.template.html',
          controller: 'CollectionCtrl'
        }
      },
      data: {
        requireLogin: true,
      }
    })

    .state('app.random', {
      url: '/random',
      views: {
        'menuContent': {
          templateUrl: 'js/random/random.template.html',
          controller: 'RandomCtrl'
        }
      },
      data: {
        requireLogin: true,
      }
    })

  .state('app.single', {
    url: '/collection/:title',
    views: {
      'menuContent': {
        templateUrl: 'js/movie/movie.template.html',
        controller: 'MovieCtrl'
      }
    },
    data: {
      requireLogin: true,
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/collection');

  angular.module('myApp')
    .run(function($rootScope, $state, $window) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;
        var blockLogin = toState.data.blockLogin;
        $rootScope.currentUser = $window.localStorage.getItem('user');
        if (requireLogin && !$rootScope.currentUser) {
          event.preventDefault();
          $state.go('app.login');
        }
        if (blockLogin && $rootScope.currentUser) {
          event.preventDefault();
          $state.go('app.collection');
        }
      });
    });
});
