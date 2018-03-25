var Sequelize = require('sequelize');
var con=require('./connection');
var model=require('./Models');

var associations=function(){
    // model.ItemDetail().belongsToMany(model.ItemMaster(),{through: 'im',foreignKey:'item_master_id'});
    //model.PurchaseMaster().belongsToMany(model.BusinessAssociates(),{foreignKey:'ba_id'});
    // model.PurchaseMaster().belongsToMany(model.companyMaster(),{foreignKey:'company_id'});
    // model.PurchaseDetail().belongsToMany(model.PurchaseMaster(),{foreignKey:'purchase_master_id'});
    // model.PurchaseDetail().belongsToMany(model.ItemDetail(),{foreignKey:'item_detail_id'});
    // model.Cashflow().belongsToMany(model.BusinessAssociates(),{foreignKey:'ba_id'});
    // model.RentMaster().belongsToMany(model.BusinessAssociates(),{foreignKey:'ba_id'});
    // model.RentMaster().belongsToMany(model.companyMaster(),{foreignKey:'company_id'});
    // model.RentDetail().belongsToMany(model.RentMaster(),{foreignKey:'rent_master_id'});    
    // model.RentDetail().belongsToMany(model.ItemDetail(),{foreignKey:'item_detail_id'});
    // model.DispatchMasterHistory().belongsToMany(model.RentMaster(),{foreignKey:'invoice_no'});
    // model.DispatchMasterHistory().belongsToMany(model.TransportMaster(),{foreignKey:'transport_id'});
    // model.DispatchDetailHistory().belongsToMany(model.DispatchMasterHistory(),{foreignKey:'dispatch_master_id'});
    // model.DispatchDetailHistory().belongsToMany(model.ItemDetail(),{foreignKey:'item_detail_id'});
    // model.ReturnMasterHistory().belongsToMany(model.RentMaster(),{foreignKey:'invoice_no'});
    // model.ReturnDetailHistory().belongsToMany(model.ItemDetail(),{foreignKey:'item_detail_id'});
    // model.ReturnDetailHistory().belongsToMany(model.ReturnMasterHistory(),{foreignKey:'return_master_id'});
    // model.MiscIncome().belongsToMany(model.MiscItem(),{foreignKeyConstraint:'fk2',through: 'mimi',foreignKey:'misc_item_id'});
    // model.MiscIncome().belongsToMany(model.companyMaster(),{foreignKey:'company_id'});
    // model.MiscExpense().belongsToMany(model.MiscItem(),{foreignKey:'misc_item_id'});
    // model.MiscExpense().belongsToMany(model.companyMaster(),{foreignKey:'company_id'});
    // console.log('hi');
}

//foreign keys
//associations();

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