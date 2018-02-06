app.controller('loginCtrl',function($scope,$http,$location){
    $scope.adminLogin = ()=>{
        $http.post('https://bandreddyapp-v2.herokuapp.com/adminLogin',{adminName:$scope.adminName,adminPassword:$scope.adminPassword}).then((loginResponse)=>{
            if(loginResponse.data == 'tryWithCorrectCredentials'){
                alert(loginResponse.data);
                $scope.adminName='';
                $scope.adminPassword='';
            }
            else{
                localStorage.setItem('adminName',$scope.adminName);
                localStorage.setItem('adminPassword',$scope.adminPassword);
                $location.path('/homeApi');
            };

        });
    }
})