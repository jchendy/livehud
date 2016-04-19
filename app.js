var app = angular.module('livehudApp', [
  'ui.bootstrap',
  'ngAnimate'
  ]);

app.controller('LiveHudCtrl', function ($scope, $uibModal, $sce) {

  $scope.items = ['1', '2', '3', '4', '5'];

  $scope.stats = {
    tight_loose: {
      name: "tight/loose",
      options: [
        {name: "tight", value: "1"},
        {name: "-", value: "2"},
        {name: "balanced", value: "3"},
        {name: "-", value: "4"},
        {name: "loose", value: "5"},
      ]
    },
    passive_aggressive: {
      name: "passive/aggressive",
      options: [
        {name: "passive", value: "1"},
        {name: "-", value: "2"},
        {name: "balanced", value: "3"},
        {name: "-", value: "4"},
        {name: "aggressive", value: "5"},
      ]
    },  
    threebet: {
      name: "3bet",
      options: [
        {name: "never", value: "1"},
        {name: "-", value: "2"},
        {name: "balanced", value: "3"},
        {name: "-", value: "4"},
        {name: "maniac", value: "5"},
      ]
    },
    fold_3bet: {
      name: "fold to 3bet",
      options: [
        {name: "never", value: "1"},
        {name: "-", value: "2"},
        {name: "balanced", value: "3"},
        {name: "-", value: "4"},
        {name: "always", value: "5"},
      ]
    },    
    call_fold: {
      name: "call/fold errors",
      options: [
        {name: "call", value: "1"},
        {name: "-", value: "2"},
        {name: "balanced", value: "3"},
        {name: "-", value: "4"},
        {name: "fold", value: "5"},
      ]
    },
    cbet: {
      name: "cbets",
      options: [
        {name: "rare", value: "1"},
        {name: "-", value: "2"},
        {name: "flop only", value: "3"},
        {name: "turn barrels", value: "4"},
        {name: "triple barrels", value: "5"},
      ]
    },
    raises: {
      name: "postflop raises",
      options: [
        {name: "nuts only", value: "1"},
        {name: "-", value: "2"},
        {name: "balanced", value: "3"},
        {name: "-", value: "4"},
        {name: "maniac", value: "5"},
      ]
    },    

  }

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
        },
        stats: function() {
          return $scope.stats;
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


app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, player, stat, stats) {

  $scope.items = items;
  $scope.player = player;
  $scope.selected = {
    item: $scope.items[0]
  };
  $scope.stat = stat;
  $scope.stats = stats;

  $scope.ok = function (result) {
    player[stat] = result;
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});