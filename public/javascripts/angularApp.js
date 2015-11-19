var app=angular.module('balajinews',['ui.router']);


app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
	var home={
		name:'home',
		url:'/home',
		templateUrl:'/home.html',
		controller:'MainCtrl',
		resolve:{
			postPromise:['posts',function(posts){
				return posts.getAll();
			}]
		}

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
			posts.upvote(post);
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
		
		if ($scope.url === '') {
			return;
		}

		var req={
				method:"GET",
				url:'/processTitle',
				headers: {
   				'Content-Type': undefined,
   				'weburl' : $scope.url
 				},
				data:{ weburl:$scope.url }
			};
			$http(req).then(function(res,err){
				console.log("Success");
				posts.create({
					title:res.data.title,
					url:res.data.link,
					hostname: res.data.hostname,
						
				});
				
				
			},function(err){
				console.log("Error While Processing the URL.. Try Again...!");
			});
			
			
			$location.url('/home');
		
	    }; 			


	}
]);

app.factory('posts',['$http',function($http){
	 var o = {
    		posts: []
			};

	o.getAll=function(){
		return $http.get('/posts').success(function(data){
			angular.copy(data,o.posts);
		});
	};	

	o.create = function(post) {
 		 return $http.post('/posts', post).success(function(data){
  		  o.posts.push(data);
  		});
	};	

	o.upvote = function(post) {
  		return $http.put('/posts/' + post._id + '/upvote')
    		.success(function(data){
      		post.upvotes += 1;
    });
};
  	return o;
}]);


