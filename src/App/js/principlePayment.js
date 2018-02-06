app.controller('principlePaymentCtrl',function($scope,$http,$location){
   $scope.principlePaymentDetails=JSON.parse(localStorage.getItem('addPrincipleAmount'));
   $scope.paymentSubmit=function(){
    $('#principleAmountModal').modal('show');
    }
    $scope.finalPayment=function(){
 
    jsonData={
           userName:$scope.principlePaymentDetails.userName,
           userPhone:$scope.principlePaymentDetails.userPhone,
           initialMoney:$scope.principleAmount,
           interestRate:$scope.interestRate,
           comments:$scope.comments
       }
       $('#principleAmountModal').modal('hide');
       $http.post('https://bandreddyapp-v2.herokuapp.com/insertUserIndData',jsonData).then(function(insertResponse){
           if(insertResponse.data=='success'){
               alert('successfully added the principle amount!');
               $location.path('/homeApi');
           }
           else{
               alert('Sorry, amount not added. Please try again!');
               $location.path('/principlePaymentApi');
           }
       })
   }
   $scope.finalCancel=function(){
    $('#principleAmountModal').modal('hide');
      
   }
   $scope.cancelSubmit=function(){
       $location.path('/homeApi');
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
//here req.body={userName:'Ramprakash',userPhone:'9951818285',initialMoney:'12000',interestRate:'3'}
