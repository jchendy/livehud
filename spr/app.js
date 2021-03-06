var app = angular.module('livehudApp', [
  'ui.bootstrap',
  'ngAnimate'
  ]);

app.controller('LiveHudCtrl', function ($scope, $uibModal, $sce) {

  $scope.potsize = 40;
  $scope.stacksize = 280;

  $scope.spr = () => {
    return $scope.stacksize / $scope.potsize;
  };

  $scope.nextspr = (currentspr, betsize, streets = 1) => {
    if (streets === 1) {
      const result = (currentspr-betsize)/(1 + 2*betsize);
      return Math.max(result, 0);
    }
      return $scope.nextspr($scope.nextspr(currentspr, betsize, 1), betsize, streets - 1);
  };

  $scope.turnpot = (size) => {
    const result = $scope.potsize + $scope.potsize * size * 2;
    return $scope.constrain(result, 0, $scope.maxpot());
  }

  $scope.turnstack = (size) => {
    const result = $scope.stacksize - $scope.potsize * size;
    return Math.max(result, 0);
  }

  $scope.riverpot = (size) => {
    const result = $scope.turnpot(size) + $scope.turnpot(size) * size * 2;
    return $scope.constrain(result, 0, $scope.maxpot());
  }

  $scope.riverstack = (size) => {
    const result = $scope.turnstack(size) - $scope.turnpot(size) * size;
    return Math.max(result, 0);
  }

  $scope.maxpot = () => $scope.potsize + $scope.stacksize * 2;

  $scope.constrain = (num, min, max) => {
    if (num < min) {
      return min;
    }
    if (num > max) {
      return max;
    }
    return num;
  }

  $scope.getClass = (spr) => spr > .75 && spr < 1.15 ? "shove" : "";

});
