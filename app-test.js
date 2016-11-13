describe('myApp', () => {
  beforeEach(module('myApp'));

  describe('service', () => {
    it('should do sum', inject(function(Calc) {
      expect(Calc.sum(3, 4)).toBe(7);
    }));
  });

  describe('service with $http', () => {
    let UserService, $httpBackend, mockUsers = [{name: 'Bob'}];

    beforeEach(inject(function(_UserService_, _$httpBackend_) {
      UserService = _UserService_;
      $httpBackend = _$httpBackend_;
      $httpBackend.whenGET('/users').respond(mockUsers);
      $httpBackend.whenGET('/users/1').respond(mockUsers[0]);
    }));

    it('should get one user', function(done) {
      UserService.getOne(1).then(function(user) {
        expect(user).toEqual(mockUsers[0]);
        done();
      });

      $httpBackend.flush();
    });

  });

  describe('controller', () => {
    let controller, Calc;

    beforeEach(inject(function(_Calc_, $controller) {
      Calc = _Calc_;
      spyOn(Calc, 'sum').and.returnValue(7);
      controller = $controller('MainController', {Calc});
    }));

    it('should call Calc service', function() {
      controller.doCalculations(3, 4);
      expect(Calc.sum).toHaveBeenCalled();
    });
    it('should output results', function() {
      controller.doCalculations(3, 4);
      expect(controller.result).toBe(7);
    });
  });

  describe('directive', () => {
    let UserService, $scope, isolateScope, element, mockUsers = [{name: 'Bob'}];;

    beforeEach(inject(function($q, $rootScope, $compile, _UserService_) {
        const deffered = $q.defer();
        UserService = _UserService_;
        $scope = $rootScope.$new();
        $scope.user = {name: 'Bob'};
        element = angular.element('<user-card user="user"></user-card>');
        $compile(element)($scope);
        isolateScope = element.isolateScope();
        spyOn(UserService, 'getOne').and.returnValue(deffered.promise);
        deffered.resolve(mockUsers[0]);
        $scope.$digest();
    }));

    it('someMethod should call UserService', function() {
      isolateScope.someMethod();
      expect(UserService.getOne).toHaveBeenCalled();
    });

    it('someMethod should output user', function() {
      isolateScope.someMethod();
      expect(isolateScope.user).toEqual({name: 'Bob'});
    });
  });

  describe('component', () => {
    let $componentController, $scope, controller;
    beforeEach(inject(function($rootScope, _$componentController_) {
      $componentController = _$componentController_;
      $scope = $rootScope.$new();
      controller = $componentController('helloWorld', {$scope: $scope});
    }));

    it('should be attached to the scope', function() {
      expect($scope.$ctrl).toBe(controller);
    });

    it('should expose my title', function() {
      expect(controller.myTitle).toBeDefined();
      expect(controller.myTitle).toBe('hi');
    });
  });

});
