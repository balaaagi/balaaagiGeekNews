var app=angular.module('balajinews',['ui.router']);


app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    ;

 

  $urlRouterProvider.otherwise('home');
}]);


app.controller('MainCtrl',[
	'$scope',
	'posts',
	function($scope,posts){
		
		$scope.posts=posts.posts;
		
		$scope.incrementUpvotes=function(post){
			post.upvotes+=1;
		}; 			
		}
	
	]);





app.factory('posts',[function(){
	 var o = {
    		posts: [
    		{title:'post 1',upvotes:5},
			{title:'post 2',upvotes:6},
			{title:'post 3',upvotes:7}
			]
  			};
  	return o;
}]);


