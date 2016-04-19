var app = angular.module('livehudApp', [
  'ui.bootstrap',
  'ngAnimate'
  ]);

app.controller('LiveHudCtrl', function ($scope, $uibModal, $sce) {

  $scope.items = ['1', '2', '3', '4', '5'];

  $scope.open = function (player, stat) {

    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        items: function () {
          return $scope.items;
        },
        player: function() {
          return player;
        },
        stat: function() {
          return stat;
        }
      }
    });
  };

  $scope.players = [];

  for(var i = 1; i <= 10; i++) {
    $scope.players.push({seat: i, 
                          tight_loose: '-',                           
                          passive_aggressive: '-',
                          threebet: '-',
                          fold_3bet: '-',
                          call_fold: '-',
                          cbet: '-',
                          raises: '-'
                          });
  }

});


app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, player, stat) {

  $scope.items = items;
  $scope.player = player;
  $scope.selected = {
    item: $scope.items[0]
  };
  $scope.stat = stat;

  $scope.ok = function () {
    player[stat] = $scope.selected.item;
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});