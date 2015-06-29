app.directive('backButton', ['$window','$state', function($window, $state) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind('click', function () {
        $window.history.back();
        // $state.go('^');
      });
    }
  };
}]);
