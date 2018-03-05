var Sequelize = require('sequelize');
var con=require('./connection');
var model=require('./Models');

model.loginMaster().sync({force:true}).then(function(){
    console.log('login master');
});

model.companyMaster().sync({force:true}).then(function(){
    console.log('Company Master');
});

model.ItemMaster().sync({force:true}).then(function(){
    console.log('Item Master');        
});

model.ItemDetail().sync({force:true}).then(function(){
    console.log('Item Detail');
});

model.BusinessAssociates().sync({force:true}).then(function(){
    console.log('Business Associates');
});

model.PurchaseMaster().sync({force:true}).then(function(){
    console.log('Purchase Master');
});

model.PurchaseDetail().sync({force:true}).then(function(){
    console.log('Purchase Detail');
});

model.Cashflow().sync({force:true}).then(function(){
    console.log('Cashflow');
});

model.RentMaster().sync({force:true}).then(function(){
    console.log('Rent Master');
});

model.RentDetail().sync({force:true}).then(function(){
    console.log('Rent Detail');
});

model.TransportMaster().sync({force:true}).then(function(){
    console.log('Transport Master');
});

model.MiscItem().sync({force:true}).then(function(){
    console.log('Misc. Item');
});

model.MiscIncome().sync({force:true}).then(function(){
    console.log('Misc. Income');
});

model.MiscExpense().sync({force:true}).then(function(){
    console.log('Misc. Expense');
});

model.DispatchMasterHistory().sync({force:true}).then(function(){
    console.log('Dispatch Master History');
});

model.DispatchDetailHistory().sync({force:true}).then(function(){
    console.log('Dispatch Detail History');
});

model.ReturnMasterHistory().sync({force:true}).then(function(){
    console.log('Return Master History');
});

model.ReturnDetailHistory().sync({force:true}).then(function(){
    console.log('Return Detail History');
});