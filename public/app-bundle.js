(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var myApp = angular.module('myApp', [])

myApp.controller('GameBoardController',['$scope', '$http', function($scope, $http) {

  /*$scope.currentPlayer = "black";
  $scope.playingField = [
                        [{coord: [0, 0], color: ""}, {coord: [0, 1], color: ""}, {coord: [0, 2], color: ""}, {coord: [0, 3], color: ""}],
                        [{coord: [1, 0], color: ""}, {coord: [1, 1], color: "white"}, {coord: [1, 2], color: "black"}, {coord: [1, 3], color: ""}],
                        [{coord: [2, 0], color: ""}, {coord: [2, 1], color: "black"}, {coord: [2, 2], color: "white"}, {coord: [2, 3], color: ""}],
                        [{coord: [3, 0], color: ""}, {coord: [3, 1], color: ""}, {coord: [3, 2], color: ""}, {coord: [3, 3], color: ""}]
                        ]*/

  $http.get('/games')
  .success(function(data, status, headers, config) {
    console.log(data)
    $scope.currentPlayer = data.currentPlayer;
    $scope.playingField = data.playingField;
  })
  .error(function(data, status, headers, config) {
    throw new Error('get error!');
  });

  $scope.checkCell = function(cell) {
    var row = cell['coord'][0];
    var column = cell['coord'][1];
    var cellStack = [];

    //check if cell's empty
    if(this.playingField[row][column]['color'] !== "") {
      alert('cant play this cell')
    }
    //check right
    else if(this.playingField[row][column + 1]['color'] === '') {
      alert('illegal move!')
    }
    else if(this.playingField[row][column + 1]['color'] === 'white') {
      alert('enter the while loop')
      cellStack.push(this.playingField[row][column])
      while(this.playingField[row][column + 1]['color'] === 'white') {
        cellStack.push(this.playingField[row][column + 1])
        column++;
      }
      cellStack.push(this.playingField[row][column + 1])

      if(cellStack[cellStack.length - 1]['color'] === 'black') {
        alert('lets flip some cells')
      } else {
        alert('illegal move mate')
      }

      alert(cellStack)
      this.flipCells(cellStack)

      //this.playingField[row][column]['color'] = 'black'
    } else {
      alert('not a legal move')
    }

  }

  $scope.flipCells = function(cellStack) {
    cellStack.map(function(x) {
      x['color'] = 'black';
    })
  }


  /*$scope.updateGame = function(this.playingField) {

  }*/
}])


},{}]},{},[1]);
