angular.module('myApp', [])

.service('Calc', function() {
  this.sum = function(a, b) {
    return a + b;
  };
})

.service('UserService', function($http) {
  this.getOne = function (id) {
    return $http.get('/users/' + id).then(function(response) {
      return response.data;
    });
  };

  this.getAll = function () {
    return $http.get('/users').then(function(response) {
      return response.data;
    });
  };
})

.component('helloWorld', {
  template: 'Hello, world!',
  controller: function() {
    this.myTitle = 'hi';

    this.sayHi = function() {
      this.title = 'Hello';
    };
  }
})

.controller('MainController', function(Calc) {
  this.doCalculations = function (a, b) {
    this.result = Calc.sum(a, b);
  };
})

.directive('userCard', function(UserService) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      user: '='
    },
    template: '<div>{{user.name}}</div>',
    link: function(scope) {
      scope.someMethod = function() {
        UserService.getOne(1).then(function(user) {
          scope.user = user;
        });
      };
    }
  };
});
