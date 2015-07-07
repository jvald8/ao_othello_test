var myApp = angular.module('myApp', [])

myApp.controller('GameBoardController',['$scope', '$http', function($scope, $http) {

  $scope.currentPlayer = '';
  $scope.nextPlayer = '';
  $scope.playingField = [];

  $http.get('/games')
  .success(function(data, status, headers, config) {
    $scope.currentPlayer = data.currentPlayer;
    $scope.playingField = data.playingField;
    $scope.currentPlayer === 'white' ? $scope.nextPlayer = 'black' : $scope.nextPlayer = 'white'
  })
  .error(function(data, status, headers, config) {
    throw new Error('get error!');
  });

  $scope.switchPlayers = function() {
    if(this.currentPlayer === 'white') {
      $scope.currentPlayer = 'black'
      $scope.nextPlayer = 'white'
    } else {
      $scope.currentPlayer ='white'
      $scope.nextPlayer ='black'
    }
  }

  $scope.checkRight = function(cell) {
    var row = cell['coord'][0];
    var column = cell['coord'][1];
    var cellStack = [];

    //check if cell's empty
    if(this.playingField[row][column]['color'] !== "") {

    }
    //check right
    else if(this.playingField[row][column + 1]['color'] === this.currentPlayer) {

    }

    else if(this.playingField[row][column + 1]['color'] === this.nextPlayer) {
      cellStack.push(this.playingField[row][column])

      while(this.playingField[row][column + 1]['color'] === this.nextPlayer) {
        cellStack.push(this.playingField[row][column + 1])
        column++;
      }
      cellStack.push(this.playingField[row][column + 1])

      if(cellStack[cellStack.length - 1]['color'] === this.currentPlayer) {

        this.flipCells(cellStack)

      } else {

      }

    } else {

    }

  }

  $scope.checkBelow = function(cell) {
    var row = cell['coord'][0];
    var column = cell['coord'][1];
    var cellStack = [];

    //check if cell's empty
    if(this.playingField[row][column]['color'] !== "") {

    }
    //check below
    else if(this.playingField[row + 1][column]['color'] === this.currentPlayer) {

    }
    else if(this.playingField[row + 1][column]['color'] === this.nextPlayer) {
      cellStack.push(this.playingField[row][column])
      while(this.playingField[row + 1][column]['color'] === this.nextPlayer) {
        cellStack.push(this.playingField[row + 1][column])
        row++;
      }
      cellStack.push(this.playingField[row + 1][column])

      if(cellStack[cellStack.length - 1]['color'] === this.currentPlayer) {
        this.flipCells(cellStack)

      } else {

      }

    } else {

    }

  }

  $scope.checkLeft = function(cell) {
    var row = cell['coord'][0];
    var column = cell['coord'][1];
    var cellStack = [];

    //check if cell's empty
    if(this.playingField[row][column]['color'] !== "") {

    }
    //check left
    else if(this.playingField[row][column - 1]['color'] === this.currentPlayer) {

    }

    else if(this.playingField[row][column - 1]['color'] === this.nextPlayer) {
      cellStack.push(this.playingField[row][column])

      while(this.playingField[row][column - 1]['color'] === this.nextPlayer) {
        cellStack.push(this.playingField[row][column - 1])
        column--;
      }
      cellStack.push(this.playingField[row][column - 1])

      if(cellStack[cellStack.length - 1]['color'] === this.currentPlayer) {
        this.flipCells(cellStack)

      } else {

      }

    } else {

    }

  }

  $scope.checkAbove = function(cell) {
    var row = cell['coord'][0];
    var column = cell['coord'][1];
    var cellStack = [];

    //check if cell's empty
    if(this.playingField[row][column]['color'] !== "") {

    }
    //check above
    else if(this.playingField[row - 1][column]['color'] === this.currentPlayer) {

    }
    else if(this.playingField[row - 1][column]['color'] === this.nextPlayer) {
      cellStack.push(this.playingField[row][column])
      while(this.playingField[row - 1][column]['color'] === this.nextPlayer) {
        cellStack.push(this.playingField[row - 1][column])
        row--;
      }
      cellStack.push(this.playingField[row - 1][column])
      alert(cellStack)

      if(cellStack[cellStack.length - 1]['color'] === this.currentPlayer) {

        this.flipCells(cellStack)

      } else {

      }

    } else {

    }

  }

  $scope.flipCells = function(cellStack) {
    cellStack.map(function(x) {
      x['color'] = $scope.currentPlayer;
    })

    $scope.cellStack = [];

    this.switchPlayers()
  }

  $scope.updateGame = function(playingField, currentPlayer) {
    var game = this.playingField;
    var player = this.currentPlayer;
    $http.put('/games/1', {"id":1,"currentPlayer":player,"playingField":game})
    .success(function(data, status, headers, config) {
      $scope.playingField = data.playingField;
      $scope.currentPlayer = data.currentPlayer;
    })
    .error(function(data, status, headers, config) {
      throw new Error('update error!');
    });
  };

  $scope.newGame = function() {
    $scope.currentPlayer = "black";
    $scope.playingField = [
                        [{coord: [0, 0], color: ""}, {coord: [0, 1], color: ""}, {coord: [0, 2], color: ""}, {coord: [0, 3], color: ""}],
                        [{coord: [1, 0], color: ""}, {coord: [1, 1], color: "white"}, {coord: [1, 2], color: "black"}, {coord: [1, 3], color: ""}],
                        [{coord: [2, 0], color: ""}, {coord: [2, 1], color: "black"}, {coord: [2, 2], color: "white"}, {coord: [2, 3], color: ""}],
                        [{coord: [3, 0], color: ""}, {coord: [3, 1], color: ""}, {coord: [3, 2], color: ""}, {coord: [3, 3], color: ""}]
                        ]
  }

}])

