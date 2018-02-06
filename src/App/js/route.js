app.config(function($routeProvider) {
	
	$routeProvider
		.when('/loginApi',{
			templateUrl:'src/App/html/login.html',
			controller:'loginCtrl'
		})
		.when('/homeApi',{
			templateUrl:'src/App/html/home.html',
			controller:'homeCtrl'
        })
		.when('/addUserApi',{
			templateUrl:'src/App/html/addUser.html',
			controller:'addUserCtrl'
        })
		.when('/particularUserDetailsApi',{
			templateUrl:'src/App/html/particularUserDetails.html',
			controller:'addUserCtrl'
        })
		.when('/principlePaymentApi',{
			templateUrl:'src/App/html/principlePayment.html',
			controller:'principlePaymentCtrl'
		})
		.otherwise({
			redirectTo:'/loginApi'
		});
		
});//service provider end