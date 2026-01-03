sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sasu/util/formatter"
], function (Controller, MessageBox, MessageToast, JSONModel, Formatter) {
    'use strict';
    return Controller.extend("sasu.controller.Add", {
        formatter: Formatter,
        onInit: function () {
            this.oModel = new JSONModel();
            this.oModel.setData({
                "productData": {
                    "PRODUCT_ID": "",
                    "TYPE_CODE": "PR",
                    "CATEGORY": "Notebooks",
                    "NAME": "",
                    "DESCRIPTION": "",
                    "SUPPLIER_ID": "0100000046",
                    "SUPPLIER_NAME": "SAP",
                    "TAX_TARIF_CODE": "1",
                    "PRICE": "0",
                    "CURRENCY_CODE": "USD",
                    "DIM_UNIT": "CM",
                    "To_Orders": []
                }
            });
            this.getView().setModel(this.oModel, "viewModel");
        },

        onSave: function () {
            //Step 1: Prepare the payload
            debugger;
            var payload = this.oModel.getProperty('/productData');
            //Step 2: Get the odata model object to communicate Backend.
            var oDataModel = this.getView().getModel();
            //Step 3: Fire the POST call on Entityset with payload.
            oDataModel.create('/ProductSet', payload,{
                success: function(data){
                    MessageToast.show("The Product is added successfully");
                },
                error: function(oError){
                    MessageBox.error("An Internal Error occurred");
                }
            })
        },

        onClear: function(){
            var payload = this.oModel.getProperty('/productData');
            payload.NAME = "";
            payload.PRODUCT_ID = "";
            payload.SUPPLIER_ID = "";
            payload.PRICE = "";
            payload.CURRENCY_CODE = "";
            payload.DESCRIPTION = "";
            this.oModel.setProperty('/productData', payload);
        },

        onEnter: function(oEvent){
            var that = this
            //Step 1: Read the Product ID.
            var sText = oEvent.getSource().getValue();
            //Step 2: Get the oModel Object.
            var OData = this.getView().getModel();
            //Step 3: Fire the Read call
            this.getView().setBusy(true);
            OData.read("/ProductSet('" + sText + "')",{
                urlParameters:{
                    "$expand" : "To_Orders"
                },

                success: function(data){
                    that.getView().setBusy(false);
                    that.oModel.setProperty('/productData', data);
                    that.oModel.setProperty('/productData/To_Orders', data.To_Orders.results);
                },
                error: function(oError){
                    that.getView().setBusy(false);
                    MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                }
            })
        },

        onload: function(){
            var that = this
            var OData = this.getView().getModel();
            //Call function
            OData.callFunction("/GetMostExpensiveProduct",{
                
                urlParameters:{
                    "I_CATEGORY" : "PDAs & Organizers",
                },
                success: function(data){
                    that.oModel.setProperty("/productData",data);
                },
                error: function(oError){

                }
            })
        },

        onloadCheap: function(){
            var that = this
            var OData = this.getView().getModel();
            //Call function
            OData.callFunction("/GetMostCheapestProduct",{
                urlParameters:{
                    "I_CATEGORY" : "Notebooks",
                },
                success: function(data){
                    that.oModel.setProperty("/productData",data);
                },
                error: function(oError){

                }
            })
        },

        onUpdate: function(){
            debugger;
            var payload = this.oModel.getProperty('/productData');
            var OData = this.getView().getModel();

            OData.update("/ProductSet('"+ this.getView().byId("name").getValue() +"')",payload,{
                success: function(data){
                    MessageToast.show("Updated Successfully");
                },
                error: function(oError){
                    MessageBox.error("Internal Error");
                }

            })
        },

        onDelete: function(){

            debugger;

            var OData = this.getView().getModel();

            OData.remove("/ProductSet('"+ this.getView().byId("name").getValue() +"')",{
                success: function(data){
                    MessageToast.show("Deleted Successfully");
                },
                error: function(oError){
                    MessageBox.error("Internal Error");
                }

            })
        }

        

    });
});