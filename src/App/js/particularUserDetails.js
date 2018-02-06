app.controller('particularUserDetailsCtrl',function($scope,$http,$location){
    $scope.particularUserDetails=JSON.parse(localStorage.getItem('particularUserDetails'));
//    alert(JSON.stringify($scope.particularUserDetails));
    $scope.moreHistory=function(indexValue){
         $scope.historyDetails= $scope.particularUserDetails.userMoneyDetails[indexValue];
         $scope.ngPayment=false;
         $scope.ngHistory=true;
    }

    $scope.addPayment=function(indexValue){
        $scope.paymentUserDetails=$scope.particularUserDetails.userMoneyDetails[indexValue];
        $scope.ngPayment=true;
        $scope.ngHistory=false;
//        $location.path('/paymentApi');
    }

//here req.body={userName:'Ramprakash',userPhone:'9951818285',initialMoney:'12000',interestRate:'3',timeOfGiven:'2017/12/26'}
    var jsonData={
    }
    $scope.deleteAmount=function(indexValue){
        jsonData={
            userName:$scope.particularUserDetails.userName,
            userPhone:$scope.particularUserDetails.userPhone,
            initialMoney:$scope.particularUserDetails.userMoneyDetails[indexValue].initialMoney,
            interestRate:$scope.particularUserDetails.userMoneyDetails[indexValue].interestRate,
            timeOfGiven:$scope.particularUserDetails.userMoneyDetails[indexValue].timeOfGiven
        }
        $('#deleteAmount').modal('show');
    }

    $scope.finalDelete=function(){
        $('#deleteAmount').modal('hide');        
        $http.post('https://bandreddyapp-v2.herokuapp.com/deleteUserIndData',jsonData).then(function(deleteResponse){
            if(deleteResponse.data=='success'){
                alert('successfully deleted!');
                $location.path('/homeApi');
            }
            else{
                alert('Sorry, data not deleted. Please try again!');
                $location.path('/particularUserDetailsApi');
            }
        })
    }
    $scope.cancelDelete=function(){
        $('#deleteAmount').modal('hide');                   
    }


    $scope.confirmPay=function(){
        if($scope.userCredit>0){
            $('#addAmountModal').modal('show');
        }
        else{
            alert('please enter amount!')
        }
    }

    $scope.finalSubmission=function(){
        
        $('#addAmountModal').modal('hide');        
        var paymentDetails={
            userName:$scope.particularUserDetails.userName,
            userPhone:$scope.particularUserDetails.userPhone,
            initialMoney:$scope.paymentUserDetails.initialMoney,
            interestRate:$scope.paymentUserDetails.interestRate,
            timeOfGiven:$scope.paymentUserDetails.timeOfGiven,
            paymentBefore:$scope.paymentUserDetails.userCredit,
            paymentMoney:$scope.userCredit,
            comments:$scope.indComments
        }        
            $scope.paymentDisabled=true;
            $http.post('https://bandreddyapp-v2.herokuapp.com/updateUserIndData',paymentDetails).then(function(paymentResponse){
                alert(paymentResponse.data);
                if(paymentResponse.data=='success'){
                    alert('successfully added the payment!');
                    $location.path('/homeApi');
                }
                else{
                    alert('Sorry, failed adding payment. Please try again!');
                    $location.path('/particularUserDetails');
                }
                $scope.paymentDisabled=false;
            });
    }

    $scope.cancelPay=function(){
        $scope.ngCancelPay=false;
        $scope.userCredit='';
        $scope.ngPayment=false;       
        $('#addAmountModal').modal('hide');        
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