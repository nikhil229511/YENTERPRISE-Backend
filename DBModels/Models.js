var Sequelize = require('sequelize');
var con=require('./connection');
var connect=con.connect();
con.testConnection();

//var loginmaster;
//var company;
//model definition
var miscincome,miscitem;
module.exports={

    loginMaster:function(){
        var loginmaster = connect.define('login_master', {
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            username: {
                type: Sequelize.STRING(45),
                allowNull:false
            },
            password: {
                type: Sequelize.STRING(45),
                allowNull:false
            },
            fName: {
                type: Sequelize.STRING(30),
                allowNull:false                
            },
            lName: {
                type: Sequelize.STRING(30),
            },
            user_type: {
                type: Sequelize.STRING(10),
                allowNull:false
            },
            financialYear: {
                type: Sequelize.STRING(20),
                allowNull:false
            }        
        });
        return loginmaster;
    },

    companyMaster:function(){
        var companymaster = connect.define('company_master', {
            company_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            name: {
                type: Sequelize.STRING(45),
                allowNull:false
            },
            add1: {
                type: Sequelize.TEXT,
                allowNull:false
            },
            add2: {
                type: Sequelize.TEXT
            },
            PIN: {
                type: Sequelize.STRING(45),
                allowNull:false
            },
            state: {
                type: Sequelize.STRING(3),
                allowNull:true
            },
            statecode: {
                type: Sequelize.STRING(3)
            },
            GSTNo: {
                type: Sequelize.STRING(10)
            },
            contactno: {
                type: Sequelize.STRING(10),
                allowNull:false
            },
            logo: {
                type: Sequelize.STRING,
                allowNull:true
            }
        });
        return companymaster;
    },

    ItemMaster:function(){
        var itemmaster = connect.define('item_master', {
            item_master_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true,
                allowNull:false
            },
            item_master_name: {
                type: Sequelize.STRING(45),
                allowNull:false
            },
            hsn_code: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull:true               
            }
        });
        return itemmaster;
    },

    ItemDetail:function(){
        var itemdetail = connect.define('item_detail', {
            item_detail_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            item_detail_name: {
                type: Sequelize.STRING(45),
                allowNull:false
            },
            item_master_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            total_items: {
                type: Sequelize.INTEGER,
                defaultValue:0
            },
            damaged_items: {
                type: Sequelize.INTEGER,
                defaultValue:0
            },
            description: {
                type: Sequelize.TEXT
            }
        });
        return itemdetail;
    },

    BusinessAssociates:function(){
        var businessassociates = connect.define('business_associates', {
            ba_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            name: {
                type: Sequelize.STRING(45),
                allowNull:false
            },
            add1: {
                type: Sequelize.TEXT,
                allowNull:false
            },
            add2: {
                type: Sequelize.TEXT
            },
            PIN: {
                type: Sequelize.STRING(45),
                allowNull:false
            },
            statecode: {
                type: Sequelize.STRING(3)
            },
            GSTNo: {
                type: Sequelize.STRING(10)
            },
            contactno: {
                type: Sequelize.STRING(10)
            },
            email:{
                type: Sequelize.STRING(50),
                allowNull:true
            },
            is_customer: {
                type: Sequelize.BOOLEAN,
                allowNull:false
            }
        });
        return businessassociates;
    },

    PurchaseMaster:function(){
        var purchasemaster = connect.define('purchase_master', {
            purchase_master_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            invoice_no: {
                type: Sequelize.STRING(14),
                allowNull:false
            },
            date: {
                type: Sequelize.DATE,
                allowNull:false
            },
            ba_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            company_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            amount: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false
            },
            taxes: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false,
                defaultValue:0
            },
            overhead_charges: {
                type: Sequelize.DECIMAL(10,2),
                defaultValue:0
            },
            is_credit: {
                type: Sequelize.BOOLEAN,
                allowNull:false
            }
        });
        return purchasemaster;
    },

    PurchaseDetail:function(){
        var purchasedetail = connect.define('purchase_detail', {
            purchase_detail_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true

            },
            purchase_master_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            item_detail_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            rate: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            cgst: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false
            },
            sgst: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false
            },
            igst: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false
            }
        });
        return purchasedetail;
    },

    Cashflow:function(){
        var cashflow = connect.define('cashflow', {
            voucher_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            is_payment: {
                type: Sequelize.BOOLEAN,
                allowNull:false
            },
            is_cheque: {
                type: Sequelize.BOOLEAN,
                allowNull:false
            },
            ba_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            amount: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false,
                defaultValue:0
            },
            description: {
                type: Sequelize.TEXT
            },
            cheque_no: {
                type: Sequelize.STRING(12)
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull:false
            }
        });
        return cashflow;
    },
    
    RentMaster:function(){
        var rentmaster = connect.define('rent_master', {
            rent_master_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            invoice_no: {
                type: Sequelize.STRING(14),
                allowNull:false
            },
            date: {
                type: Sequelize.DATE,
                allowNull:false
            },
            ba_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            company_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            amount: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false,
                defaultValue:0
            },
            taxes: {
                type: Sequelize.DECIMAL(7,2),
                allowNull:false
            },
            overhead_charges: {
                type: Sequelize.DECIMAL(10,2),
                defaultValue:0
            },
            is_credit: {
                type: Sequelize.BOOLEAN,
                allowNull:false
            },
            status: {
                type: Sequelize.STRING(25),
                allowNull:false
            },
            return_date:{
                type: Sequelize.DATEONLY,
                allowNull:true
            },
            status:{
                type: Sequelize.STRING,
                allowNull:true
            } 

        });
        return rentmaster;
    },

    RentDetail:function(){
        var rentdetail = connect.define('rent_detail', {
            rent_detail_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            rent_master_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            item_detail_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            rate: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            cgst: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false
            },
            sgst: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false
            },
            igst: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false
            }
        });
        return rentdetail;
    },
  
    TransportMaster:function(){
        var transportmaster = connect.define('transport_master', {
            transport_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            name: {
                type: Sequelize.STRING(45),
                allowNull:false
            },
            add1: {
                type: Sequelize.TEXT,
                allowNull:false
            },
            add2: {
                type: Sequelize.TEXT
            },
            PIN: {
                type: Sequelize.STRING(45),
                allowNull:false
            },
            statecode: {
                type: Sequelize.STRING(3),
                allowNull:true
            },
            GSTNo: {
                type: Sequelize.STRING(10),
                allowNull:true
            },
            email:{
                type:Sequelize.STRING(50),
                allowNull:true
            },
            contactno: {
                type: Sequelize.STRING(10),
                allowNull:false
            }
        });
        return transportmaster;
    },
    
    MiscItem:function(){
        miscitem = connect.define('misc_item', {
            misc_item_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            item_name: {
                type: Sequelize.STRING(45),
                allowNull:false
            },
            description: {
                type: Sequelize.TEXT
            }
        });
        return miscitem;
    },

    MiscIncome:function(){
        miscincome = connect.define('misc_income', {
            misc_income_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull:false
            },
            misc_item_id: {
                type: Sequelize.UUID,
            },
            company_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            amount: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull:true
            }
        });
        return miscincome;
    },

    MiscExpense:function(){
        var miscexpense = connect.define('misc_expense', {
            misc_expense_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull:false
            },
            misc_item_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            company_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            amount: {
                type: Sequelize.DECIMAL(10,2),
                allowNull:false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull:true
            }
        });
        return miscexpense;
    },
  
    DispatchMasterHistory:function(){
        var dispatchmasterhistory = connect.define('dispatch_master_history', {
            dispatch_master_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            invoice_no: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull:false
            },
            transport_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            }
        });
        return dispatchmasterhistory;
    },

    DispatchDetailHistory:function(){
        var dispatchdetailhistory = connect.define('dispatch_detail_history', {
            dispatch_detail_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            dispatch_master_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            item_detail_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull:false
            }            
        });
        return dispatchdetailhistory;
    },

    ReturnMasterHistory:function(){
        var returnmasterhistory = connect.define('return_master_history', {
            return_master_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            invoice_no: {
                type: Sequelize.INTEGER,
                allowNull:false
            },        
            date: {
                type: Sequelize.DATEONLY,
                allowNull:false
            }
        });
        return returnmasterhistory;
    },

    ReturnDetailHistory:function(){
        var returndetailhistory = connect.define('return_detail_history', {
            return_detail_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            return_master_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            item_detail_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            damaged_quantity: {
                type: Sequelize.INTEGER,
                allowNull:false,
                defaultValue:0
            }            
        });
        return returndetailhistory;
    },
    //other models here
    close: function(){        
        connect.close();
    }
};