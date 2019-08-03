
/**
 * Main js script that retrieve repositories data from Github API
 */

var app = new Vue({
  el: '#app',
  data: {
    repositories: [],
    page: 1,
    isLoading: false
  },
  computed: {
    fetchDate: function () {
      return moment().subtract(30, 'days').format('YYYY-MM-DD')
    },
    sourceUrl: function () {
      return 'https://api.github.com/search/repositories?q=created:>' + this.fetchDate + '&sort=stars&order=desc'
    }
  },
  methods: {
    /**
     * Return time interval in days between the current date & the repository creation date
     * 
     * @param  string date repository creation date
     * @return integer     time interval in days
     */
    timeInterval: function(date) {
      var todaysDate = moment(new Date());
      var repositoryCreationDate = moment(date);
      return todaysDate.diff(repositoryCreationDate, 'days');
    },
    /**
     * Get repositories data from API
     */
    loadMoreResults: function() {
      if (! this.isLoading) {
          this.isLoading = true;

          // set API request url
          var requestUrl = this.sourceUrl + (this.page > 1 ? '&page=' + this.page : '');
          console.log(requestUrl);

          // do http request
          var vm = this;
          axios.get(requestUrl)
            .then(function(response) {
              console.log(response);
              if (response.data.items) {
                // add results
                vm.repositories = vm.repositories.concat(response.data.items);
                vm.page++;
              }
            })
            .catch(function(error) {
              console.log(error);
            })
            .finally(function() {
              vm.isLoading = false;
            });
      }
    }
  }
});
