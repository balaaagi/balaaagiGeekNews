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
	'$scope','$location','$http',
	'posts',
	function($scope,$location,$http,posts){
		
		$scope.posts=posts.posts;
		

		$scope.addPost=function(){
			var elements = angular.element('<a href="'+$scope.url+'"/>');
			var sitename=elements[0].hostname;
			var siteTitle=elements[0].title;
			var req={
				method:"POST",
				url:'/processurl',
				data:{weburl:$scope.url}
			};
			$http(req).then(function(res,err){
				console.log("coming here");
				console.log(res.data.message);
				alert(res.body);
			});
			
			$scope.posts.push({
				title:$scope.title,
				url:$scope.url,
				domain: sitename,
				date : Date(),
				upvotes:0
			})
		$location.url('/home');
		
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


