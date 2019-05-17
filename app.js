
/**
 * Main js script that retrieve repositories data from Github API
 */

// Initialise module
var app = angular.module('myApp', ['infinite-scroll']);

// Configure infinite scroll to process scroll events a maximum of once every 250 ms
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250);

// Set controller
app.controller('mainController', ['$scope', '$http', function($scope, $http) {
  // init scope variables
  $scope.repositories = [];
  $scope.page = 1;
  $scope.isLoading = false;

  // set API request url
  var fetchDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  var sourceUrl = 'https://api.github.com/search/repositories?q=created:>' + fetchDate + '&sort=stars&order=desc';

  /**
   * Return time interval in days between the current date & the repository creation date
   * 
   * @param  string date repository creation date
   * @return integer     time interval in days
   */
  $scope.timeInterval = function(date) {
    var todaysDate = moment(new Date());
    var repositoryCreationDate = moment(date);
    return todaysDate.diff(repositoryCreationDate, 'days');
  };

  /**
   * Get repositories data from API
   */
  $scope.loadMoreResults = function() {
    if (! $scope.isLoading) {
        $scope.isLoading = true;

        var requestUrl = sourceUrl + ($scope.page > 1 ? '&page=' + $scope.page : '');
        console.log(requestUrl);

        $http({
          method : 'GET',
          url : requestUrl
        }).then(function mySuccess(response) {
          console.log(response);
          if (response.data.items) {
            // add results
            $scope.repositories = $scope.repositories.concat(response.data.items);
            $scope.page++;
          }
          $scope.isLoading = false;
        }, function myError(response) {
          console.log(response);
          $scope.isLoading = false;
        });
    }
  };

}]);
