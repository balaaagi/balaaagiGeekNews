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
	},
	login= {
		name:'login', 
		  url: '/login',
		  templateUrl: '/login.html',
		  controller: 'AuthCtrl',
		  onEnter: ['$state', 'auth', function($state, auth){
		    if(auth.isLoggedIn()){
		      $state.go('home');
		    }
		  }]
	},
	register={
		name:'register',
  url: '/register',
  templateUrl: '/register.html',
  controller: 'AuthCtrl',
  onEnter: ['$state', 'auth', function($state, auth){
    if(auth.isLoggedIn()){
      $state.go('home');
    }
  }]
};
  $stateProvider.state(home);
  $stateProvider.state(post);
  $stateProvider.state(login);
  $stateProvider.state(register);
 

  $urlRouterProvider.otherwise('home');
}]);

app.controller('NavCtrl', [
'$scope',
'auth',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
}]);

app.controller('MainCtrl',[
	'$scope','$state',
	'posts','auth',
	function($scope,$state,posts,auth){
		$scope.isLoggedIn = auth.isLoggedIn;
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
	'posts','auth',
	function($scope,$location,$http,posts,auth){
		$scope.isLoggedIn = auth.isLoggedIn;
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


app.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
}]);


app.factory('posts',['$http','auth',function($http,auth){
	 var o = {
    		posts: []
			};

	o.getAll=function(){
		return $http.get('/posts').success(function(data){
			angular.copy(data,o.posts);
		});
	};	

	o.create = function(post) {
  		return $http.post('/posts', post, {
    	headers: {Authorization: 'Bearer '+auth.getToken()}
  		}).success(function(data){
    	o.posts.push(data);
  		});
	};

o.upvote = function(post) {
  		return $http.put('/posts/' + post._id + '/upvote', null, {
    	headers: {Authorization: 'Bearer '+auth.getToken()}
  		}).success(function(data){
    	post.upvotes += 1;
  		});
	};

  	return o;
}]);

app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {};
   auth.saveToken = function (token){
  		$window.localStorage['flapper-news-token'] = token;
	};

	auth.getToken = function (){
  		return $window.localStorage['flapper-news-token'];
	}

	auth.isLoggedIn = function(){
		  var token = auth.getToken();

		  if(token){
		    var payload = JSON.parse($window.atob(token.split('.')[1]));

		    return payload.exp > Date.now() / 1000;
		  } else {
		    return false;
		  }
	};
	auth.register = function(user){
  		return $http.post('/register', user).success(function(data){
    	auth.saveToken(data.token);
  		});
	};

	auth.logIn = function(user){
  		return $http.post('/login', user).success(function(data){
    	auth.saveToken(data.token);
  		});
	};

	auth.logOut = function(){
  		$window.localStorage.removeItem('flapper-news-token');
	};
  return auth;
}])


