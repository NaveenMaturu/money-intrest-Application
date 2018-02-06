var functionPage=require('./src/serverJSFiles/functionPage');

const express = require('express');
const mongodb = require('mongodb');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const expressSession=require('express-session');
const MongoClient = mongodb.MongoClient;
const MongoStore = require('connect-mongo')(expressSession);
const timeStamp=require('time-stamp')
const server = express();
//server.use(express.static(__dirname + 'src/App'));
server.use(express.static(__dirname + '/',{ index: 'index.html' }));

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.use(cookieParser());
server.use(expressSession({
				
						secret:'appilcation',
						saveUninitilized:'false',
						resave:'false',						
 						store: new MongoStore({
								host: '127.0.0.1',
								port: '27017',
								db: 'session',
								url: functionPage.dbUrl,
								ttl: 5*60
								}) 
						}));
MongoClient.connect(functionPage.dbUrl,(err,db)=>{
	if(err)
	{
		console.log('connection is not established');
	}
	else
	{

		console.log('connection is established');
		console.log(functionPage.sampleData);
		var userDetails=db.collection('userDetails');
		var adminDetails=db.collection('adminDetails');

//Admin Login

//here req.body={adminName:'Ramprakash',adminPassword:'*******'}

		server.post('/adminLogin',(req,res)=>{
			console.log('adminLogin Api');
			var jsonData={
				adminName:req.body.adminName,
				adminPassword:req.body.adminPassword
			}
			functionPage.adminLogin(adminDetails,jsonData,(loginResponse)=>{
				console.log(loginResponse);
				req.session.adminName=loginResponse.adminName;
				req.session.adminPassword=loginResponse.adminPassword;
				console.log(req.session);	
				res.send(loginResponse);
			})

		})// end of adminLogin Api

//Admin Logout

		server.post('/adminLogout',(req,res)=>{
			console.log('adminLogout Api');
			req.session.destroy((err)=>{
				res.send(err == null ? 'loggedOut' : 'notLoggedOut'); 
			});

		});//end of adminLogout api




// Adding  new Users

//here req.body={userName:'Ramprakash',userPhone:'9951818285',userLocation:'VSKP',userAddress:'VSKP'}
		server.post('/insertIndUser',(req,res)=>{
			if(req.session.adminName){
				console.log('insertIndUserapi');
				var jsonData={
					userName:req.body.userName,
					userPhone:req.body.userPhone,
					userLocation:req.body.userLocation,
					userAddress:req.body.userAddress,
					time:timeStamp('YYYY/MM/DD'),
					userMoneyDetails:[]
				}
				functionPage.findIndUser(userDetails,{userName:jsonData.userName},(findResponse)=>{
					findResponse == 'noUserAvailable' ?	functionPage.insertIndUser(userDetails,jsonData,(insertResponse)=>{
													res.send(insertResponse);
												}) : res.send(findResponse);
				})
			}
			else{
				console.log('notLoggedIn');
				res.send('notLoggedIn');
			}

		})//end of insertIndUserApi

//searching all the users/ individual users		

//here req should have req.body={userName:'Ramprakash'}/{} 
//here body may have anything=> userName/userPhone/userAddress

		server.post('/findUserDetails',(req,res)=>{
			console.log('findUserDetails api');
			if(req.session.adminName){
				console.log(req.body);
				var dataDetails={};
				dataDetails[req.body.Name]=new RegExp('^'+req.body.Value);
				functionPage.findUserDetails(userDetails,dataDetails,(findData)=>{
					console.log(findData);
					res.send(findData);
				})
			}
			else{
				console.log('notLoggedIn');
				res.send('notLoggedIn');
			}

		});// end of findUserDetailsApi

//deleting a user

//here req.body={userName:'Ramprakash',userPhone:'9951818285'}		
		server.post('/deleteUser',(req,res)=>{
			console.log('deleteUser api');
			if(req.session.adminName){
				var jsonData={
					userName:req.body.userName,
					userPhone:req.body.userPhone
				}
				functionPage.deleteUser(userDetails,jsonData,(deletedData)=>{
					console.log(deletedData);
					res.send(deletedData);
				});
			}
			else{
				console.log('notLoggedIn');
				res.send('notLoggedIn');
			}

		});// end of deleteUserApi

//Adding Principle Amount

//here req.body={userName:'Ramprakash',userPhone:'9951818285',initialMoney:'12000',interestRate:'3'}
		server.post('/insertUserIndData',(req,res)=>{
			console.log('insertUserIndData');
			if(req.session.adminName){
				var jsonData={
					userName:req.body.userName,
					userPhone:req.body.userPhone
				}

				var jsonDataMoneyDetails={
					initialMoney:parseInt(req.body.initialMoney),
					interestRate:parseInt(req.body.interestRate),
					timeOfGiven:timeStamp('YYYY/MM/DD'),
					userCredit:0,
					totalInterest:0,
					comments:req.body.comments,
					userDebt:parseInt(req.body.initialMoney),
					individualPayments:[]
				}
				functionPage.insertUserIndData(userDetails,jsonData,jsonDataMoneyDetails,(insertedData)=>{
					console.log(insertedData);
					res.send(insertedData);
				});
			}
			else{
				console.log('notLoggedIn');
				res.send('notLoggedIn');
			}

		});//end of insertUserIndDataApi

//deleting user whole debt

//here req.body={userName:'Ramprakash',userPhone:'9951818285',initialMoney:'12000',interestRate:'3',timeOfGiven:'2017/12/26'}
		server.post('/deleteUserIndData',(req,res)=>{
			console.log('deleteUserIndData');
			if(req.session.adminName){
				var jsonData={
					userName:req.body.userName,
					userPhone:req.body.userPhone
				}
				var jsonDataMoneyDetails={
					initialMoney:parseInt(req.body.initialMoney),
					interestRate:parseInt(req.body.interestRate),
					timeOfGiven:req.body.timeOfGiven
				}
				functionPage.updateUserIndData(userDetails,jsonData,jsonDataMoneyDetails,(updatedData)=>{
					console.log(updatedData);
					res.send(updatedData);
				})
			}
			else{
				console.log('notLoggedIn');
				res.send('notLoggedIn');
			}

		});//end of deleteUserIndDataApi

//Adding the latest user credits

//here req.body={userName:'Ramprakash',userPhone:'9951818285',initialMoney:'12000',interestRate:'3',timeOfGiven:'2016/11/12',paymentMoney:'3000',paymentBefore:'2000'}

		server.post('/updateUserIndData',(req,res)=>{
			console.log('updateUsesIndData');
			if(req.session.adminName){
				var jsonData={
					userName:req.body.userName,
					userPhone:req.body.userPhone,
					'userMoneyDetails.timeOfGiven':req.body.timeOfGiven,
					'userMoneyDetails.interestRate':parseInt(req.body.interestRate),
					'userMoneyDetails.initialMoney':parseInt(req.body.initialMoney)
				}
				var timeDiff = Math.abs(new Date(timeStamp('YYYY/MM/DD')).getTime() - new Date(req.body.timeOfGiven).getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 			
				console.log(diffDays);
				var jsonDataMoneyPayments={

					$inc:{
						'userMoneyDetails.$.userCredit':parseInt(req.body.paymentMoney)
					},
					$set:{
						'userMoneyDetails.$.totalInterest':parseInt(req.body.initialMoney)*parseInt(req.body.interestRate)*parseInt(diffDays)/3000,
						'userMoneyDetails.$.userDebt':parseInt(req.body.initialMoney)+(parseInt(req.body.initialMoney)*parseInt(req.body.interestRate)*parseInt(diffDays)/3000)-parseInt(req.body.paymentMoney)-parseInt(req.body.paymentBefore)
					},
					$push:{
						'userMoneyDetails.$.individualPayments':
						{
									timeNow:timeStamp('YYYY/MM/DD'),
									paymentMoney:parseInt(req.body.paymentMoney),
									comments:req.body.comments
							}
					}
				}
				functionPage.updateUserIndDataIndPayments(userDetails,jsonData,jsonDataMoneyPayments,(updatedData)=>{
					console.log(updatedData);
					res.send(updatedData);
				})
			}
			else{
				console.log('notLoggedIn');
				res.send('notLoggedIn');
			}

		})// end of updateUserIndDataApi



	

	
		}//end of else case
	});
	
	
	
server.listen((process.env.PORT || 5005),()=>{
	console.log('running on port '+(process.env.PORT || 5005));
})