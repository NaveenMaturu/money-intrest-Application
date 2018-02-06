app.controller('homeCtrl', function($scope,$http,$location,$route){
    $scope.searchUsers='';;
    $scope.Sort='userName';
    $scope.searchUserFunction=function(){
        console.log($scope.Sort+$scope.searchUsers);
        $http.post('https://bandreddyapp-v2.herokuapp.com/findUserDetails',{Name:$scope.Sort,Value:$scope.searchUsers}).then((userDetails)=>{
//            alert(JSON.stringify(userDetails.data));
            if(userDetails.data!='noUsersAvailable')
            $scope.userBasicDetails=userDetails.data;
            else
            $scope.userBasicDetails={};
        });
    };
    $scope.searchUserFunction();

    $scope.addUsers=function(){
        $location.path('/addUserApi');
    }
    $scope.particularUserClick=function(data){
       localStorage.setItem('particularUserDetails',JSON.stringify(data));
       $location.path('/particularUserDetailsApi');
    }
    $scope.addPrincipleAmount=function(data){
        localStorage.setItem('addPrincipleAmount',JSON.stringify(data));
        $location.path('/principlePaymentApi');
    }
//here req.body={userName:'Ramprakash',userPhone:'9951818285'}		
    var jsonData={}
    $scope.deleteUser=function(data){
        jsonData={
            userName:data.userName,
            userPhone:data.userPhone
        }
        $scope.jsonData=jsonData;
        $scope.jsonData.userLocation=data.userLocation;
        $scope.jsonData.userAddress=data.userAddress;
        $('#finalUserDeleteModal').modal('show');
    }
    $scope.finalDeleteUser=function(){
        $('#finalUserDeleteModal').modal('hide');
        $http.post('https://bandreddyapp-v2.herokuapp.com/deleteUser',jsonData).then(function(deleteResponse){
            if(deleteResponse.data=='success'){
                alert('successfully deleted!');
            }
            else{
                alert('Sorry, user not deleted. Please try again!');
            }
            $route.reload();
        });
    }
    $scope.finalCancelDelete=function(){
        $('#finalUserDeleteModal').modal('hide');        
    }
    $scope.logOut=function(){
        $http.post('https://bandreddyapp-v2.herokuapp.com/adminLogout').then((loggedResponse)=>{
            loggedResponse.data== 'loggedOut' ? $location.path('/loginApi') : alert('Sorry, Please try again!');
        })
        $location.path('/loginApi');
    }
})