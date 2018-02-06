
module.exports={

    sampleData:'Hello, Good Morning!',

    dbUrl : 'mongodb://venky:venky@ds131237.mlab.com:31237/bandreddy_application',

    adminLogin: (collection,jsonData,callback)=>{
        console.log('adminLogin');
        collection.findOne(jsonData,(err,responseData)=>{
            callback(responseData != null ? responseData : 'tryWithCorrectCredentials');
        })
    },




    findUserDetails : (collection,jsonData,callback)=>{
        console.log('findAllUserDetails');
        collection.find(jsonData).toArray((err,responseData)=>{
            callback(responseData.length > 0 ? responseData : 'noUsersAvailable');
        });
    },  //done

    findIndUser : (collection,jsonData,callback)=>{
        console.log('findIndUser');
        collection.findOne(jsonData,(err,responseData)=>{
            callback((responseData != null) ? 'tryWithAnotherUser' : 'noUserAvailable');
        })
    },  //done

    insertIndUser : (collection,jsonData,callback)=>{
        console.log('insertIndUser');
        collection.insert(jsonData,(err,responseData)=>{
            callback((responseData.insertedCount > 0) ? 'success' : 'failed');
        })
    },  //done
    
    deleteUser : (collection,jsonData,callback)=>{
        console.log('deleteUser');
        collection.removeOne(jsonData,(err,responseData)=>{
            callback(responseData.deletedCount >0 ? 'success' : 'failed');
        })
    },   //done

    insertUserIndData : (collection,jsonData,jsonDataMoneyDetails,callback)=>{
        console.log('insertUserIndData');
        collection.updateOne(jsonData,{$push:{userMoneyDetails:jsonDataMoneyDetails}},(err,responseData)=>{
            console.log(responseData);
            console.log(responseData.result.nModified);
            callback(responseData.result.nModified==1 ? 'success' : 'failed');
        });
    },//done

    updateUserIndData : (collection,jsonData,jsonDataMoneyDetails,callback)=>{
        console.log('updateUserIndData');
        collection.updateOne(jsonData,{$pull:{userMoneyDetails:jsonDataMoneyDetails}},(err,responseData)=>{
            callback(responseData.result.nModified==1 ? 'success' : 'failed');
        });
    },//done

    updateUserIndDataIndPayments : (collection,jsonData,jsonDataMoneyPayments,callback)=>{
        console.log('updateUserIndDataIndPayments');
        collection.updateOne(jsonData,jsonDataMoneyPayments,(err,responseData)=>{
            callback(responseData.result.nModified==1 ? 'success' : 'failed');
        });
    },//done
    
    deleteUserIndData : (collection,jsonData,callback)=>{
        console.log('deleteUserIndData');
        collection.updateOne(jsonData,{},(err,responseData)=>{
            callback(responseData.result.nModified==1 ? 'success' : 'failed');
        });
    
    }//done


    
}








