app.controller('addUserCtrl',function($scope,$http,$location){
    $scope.cancelUser=function(){
        $location.path('/homeApi');
    }

    $scope.addUser= function(){
        $('#userSubmitModal').modal('show');  
    }
    $scope.finalSubmit=function(){
        $('#userSubmitModal').modal('hide');  
        var jsonData={
            userName:$scope.userName,
            userPhone:$scope.userPhone,
            userPassword:$scope.userPassword,
            userLocation:$scope.userLocation,
            userAddress:$scope.userAddress
        }
        $http.post('https://bandreddyapp-v2.herokuapp.com/insertIndUser',jsonData).then((addUserResponse)=>{
            if(addUserResponse.data == 'success'){
                alert($scope.userName +' is successfully added!');
                $location.path('/homeApi');
            }
            else{
                alert($scope.userName +' is available, please try with another name!');
                $scope.userName=''               
            }
        })
    }
    $scope.finalCancel=function(){
        $('#userSubmitModal').modal('hide');

    }

    $scope.logOut=function(){
        $http.post('https://bandreddyapp-v2.herokuapp.com/adminLogout').then((loggedResponse)=>{
            loggedResponse.data== 'loggedOut' ? $location.path('/loginApi') : alert('Sorry, Please try again!');
        })
        $location.path('/loginApi');
    };

    $scope.goHome=function(){
        $location.path('/homeApi');
    }    
    
})