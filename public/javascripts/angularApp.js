var app=angular.module('balajinews',['ui.router']);


app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
	var home={
		name:'home',
		url:'/home',
		templateUrl:'/home.html',
		controller:'MainCtrl'

	},
	post={
		name:'post',
		url:'/addPost',
		templateUrl:'/post.html',
		controller:'PostCtrl'
	}
  $stateProvider.state(home);
  $stateProvider.state(post);

 

  $urlRouterProvider.otherwise('home');
}]);


app.controller('MainCtrl',[
	'$scope','$state',
	'posts',
	function($scope,$state,posts){
		
		$scope.posts=posts.posts;
		

		$scope.incrementUpvotes=function(post){
			post.upvotes+=1;
		}; 

		$scope.moveToPost=function(){
			$state.transitionTo("post");
		}			
		}
]);


app.controller('PostCtrl',[
	'$scope','$location',
	'posts',
	function($scope,$location,posts){
		
		$scope.posts=posts.posts;
		

		$scope.addPost=function(){
			$scope.posts.push({
				title:$scope.title,
				url:$scope.url,
				upvotes:0
			})
		$location.url('/home');
		$scope.apply();
		}; 			
		}
]);

app.factory('posts',[function(){
	 var o = {
    		posts: [
    		{title:'post 1',upvotes:5,date:'17-NOV-2015'},
			{title:'post 2',upvotes:6,date:'17-NOV-2015'},
			{title:'post 3',upvotes:7,date:'22-NOV-2015'}
			]
  			};
  	return o;
}]);


