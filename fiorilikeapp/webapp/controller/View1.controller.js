sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/m/MessageToast",   
    "sap/ui/model/FilterOperator"
], function(Controller, Filter,MessageToast, FilterOperator){
    'use strict';   
    return Controller.extend("sasu.controller.View1",{
        onInit: function(){
            //this is current class object - which is our controller
            //this.oView = this.getView();
            //The Router Object is readily available with Component.js
            //So we are getting the same.
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("detail").attachPatternMatched(this.intital, this);
        },

        intital:function(oEvent){
            debugger;
            var fruitId = oEvent.getParameter("arguments").fruitId;
            var sPath = '/fruits/' + fruitId;
            var oList = this.getView().byId("idLST");
            var element = {};
            for (let i = 0; i < oList.getItems().length; i++) {
                element = oList.getItems()[i];
                if(element.getBindingContextPath() === sPath){
                    break;
                }
                
            };
            oList.setSelectedItem(element);
        },

        onFruitSelect:function(oEvent){
            //Step 1: Get the router object
            //this.Router
            //Step 2: Trigger the Route
            var oSelectedfruit = oEvent.getParameter("listItem");
            this.oRouter.navTo("detail",{
                fruitId: oSelectedfruit.getBindingContextPath().split("/")[2]
            });
        },

        

        onNext: function(){
            //Step 1: Get the Parent Control Object - Container for our view
            var oApp = this.getView().getParent();

            //Step 2: Ask Parent to nav to next view
            oApp.to("idView2");
        },

        onAction1: function(){
            alert("Order Succesfully Placed");
        },

        onSearch: function(oEvent){
            //Step 1: What is that user type in search field
            var sSearch = oEvent.getParameter("query");

            if(sSearch ==="" || sSearch === undefined){
                var sSearch = oEvent.getParameter("newValue");    
            }

            //Step 2: Construct the filter object with operand and operator
            var oFilter = new Filter("name", FilterOperator.Contains, sSearch);
            var oFilter2 = new Filter("taste", FilterOperator.Contains, sSearch);
            var aFilter = [oFilter, oFilter2];

            var oMaster = new Filter({
                filters: aFilter,
                and: false //It will Automatically change to OR operator
            })
            //Step 3: Get the list object
            var oList = this.getView().byId("idLST");
            //Step 4: inject the filter to the list
            oList.getBinding("items").filter(oMaster);
        },
        onNavPress: function(){
            this.onNext();
        },

        onDlt: function(oEvent){
            //Step 1:  Find Out which item was selected for deletion
            var oSelected = oEvent.getParameter("listItem");
            //Step 2: Get List Object
            var oList = oEvent.getSource();
            //Step 3: Remove the Item from List
            oList.removeItem(oSelected);
        },

        //Excersion
        onDelete: function(){
            var oList = this.getView().byId("idLST");
            var aSelectedItems = oList.getSelectedItems();
            var len = aSelectedItems.length;
            if(len >= 1){
                aSelectedItems.forEach(item => {
                    oList.removeItem(item); 
                });
                MessageToast.show("Deleted Successfully");
            }
            else{
                MessageToast.show("No Items Selected");
            }
            
        }


    });
});