
/**
 * Main js script that retrieve repositories data from Github API
 */

var app = angular.module('myApp', []);

app.controller('mainController', ['$scope', function($scope) {
  // init scope variables
  $scope.repositories = [];
  $scope.page = 1;

  // set API request url
  var fetchDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  var requestUrl = 'https://api.github.com/search/repositories?q=created:>' + fetchDate + '&sort=stars&order=desc';

  console.log(requestUrl);

  // get data from API
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: requestUrl,
    error: function ( result, status ) {
        console.log(result);
    },
    success: function ( result, status ) {
        console.log(result);
        if (result.items) {
            // save results
            $scope.repositories = result.items;
            // update view
            $scope.$apply();
        }
    }
  });

  // scope functions
  $scope.timeInterval = function(date) {
    var todaysDate = moment(new Date());
    var repositoryCreationDate = moment(date);
    return todaysDate.diff(repositoryCreationDate, 'days');
  };

}]);
