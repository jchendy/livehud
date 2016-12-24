var app = angular.module('livehudApp', [
  'ui.bootstrap',
  'ngAnimate'
  ]);

app.controller('LiveHudCtrl', function ($scope, $uibModal, $sce) {

  $scope.potsize = 40;
  $scope.stacksize = 260;

  $scope.spr = () => {
    return $scope.stacksize / $scope.potsize;
  };

  $scope.nextspr = (currentspr, betsize, streets = 1) => {
    if (streets === 1) {
      return (currentspr-betsize)/(1 + 2*betsize);
    }
      return $scope.nextspr($scope.nextspr(currentspr, betsize, 1), betsize, streets - 1);
  };

  $scope.turnpot = (size) => $scope.potsize + $scope.potsize * size * 2;
  $scope.turnstack = (size) => $scope.stacksize - $scope.potsize * size;

  $scope.riverpot = (size) => $scope.turnpot(size) + $scope.turnpot(size) * size * 2;
  $scope.riverstack = (size) => $scope.turnstack(size) - $scope.turnpot(size) * size;  

});
