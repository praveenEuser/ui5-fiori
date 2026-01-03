sap.ui.define([
    "sasu/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/MessageStrip"
], function(Controller, Fragment, Filter, FilterOperator, MessageBox, MessageToast, MessageStrip){
    'use strict';   
    return Controller.extend("sasu.controller.View2",{
        onInit: function(){
            //Step 1: Get the Router Object
            this.Router = this.getOwnerComponent().getRouter();
            //We forcefully pass this pointer to initial(event handler)
            this.Router.getRoute("detail").attachPatternMatched(this.intital, this);
        },

        intital:function(oEvent){
            //debugger;
            var sPath = this.extractPath(oEvent);
            this.getView().bindElement({
                path: sPath,
                parameters: {
                    expand: 'To_Supplier'
                }
            }); // binding with /fruits/4 -> datam
        },
        oCitypopup: null,
        oSupplierpopup: null,
         
        onConfirm: function(oEvent){
            var sId = oEvent.getSource().getId();
            if(sId.indexOf("city") !== -1){
                //1. Read the value which was selected in the group
                var oSelectedItem = oEvent.getParameter("selectedItem");
                var sText = oSelectedItem.getLabel()
                //2. Place that value to the field inside the table
                this.selectedfld.setValue(sText);
            }
            else{
                //1. get the table object
                var oTbl = this.getView().byId("idTbl");
                //2. read multi select items
                var oMV = oEvent.getParameter("selectedItems");
                //3. construct filter 
                var aFilter = [];
                for (let index = 0; index < oMV.length; index++) {
                    const oValue = oMV[index];
                    const sText = oValue.getLabel();
                    aFilter.push(new Filter('name', FilterOperator.EQ, sText));
                }

                var oFilter = new Filter({
                    filters: aFilter,
                    and: false
                })
                //4. pump to binding
                oTbl.getBinding("items").filter(oFilter);
            }
            
        },
        
        onFilter: function(oEvent){
            
           // alert("This functionality is under construction");
           if(!this.oSupplierpopup){
                var that = this;
                Fragment.load({
                    name: "sasu.fragments.popup",
                    type: "XML",
                    id: "supplier",
                    controller: this
                }).then(function(oSupplier) {
                    that.oSupplierpopup = oSupplier;
                    that.oSupplierpopup.setTitle("Select Supplier");
                    //providing access to the immune system to parasite using WBC (who already have access to resource.)
                    that.getView().addDependent(that.oSupplierpopup);
                    that.oSupplierpopup.bindAggregation("items",{
                        path: '/supplier',
                        template: new sap.m.DisplayListItem({
                            label: '{name}',
                            value: '{city}'
                        })
                    });
                    that.oSupplierpopup.open();
                });
           }else{
                this.oSupplierpopup.open();
           }
           
        },
        selectedfld: null,
        onF4Help: function(oEvent){
            //when user click on f4 on the field inside table, that field object we are storing now in a temporary object
            this.selectedfld = oEvent.getSource();
            if(!this.oCitypopup){
                var that = this;
                Fragment.load({
                    name: "sasu.fragments.popup",
                    type: "XML",
                    id: "city",
                    controller: this
                }).then(function(oPopup) {
                    //assign the object created by system to our global variable 
                    that.oCitypopup = oPopup;
                    that.oCitypopup.setTitle("Select Country");
                    that.getView().addDependent(that.oCitypopup);
                    that.oCitypopup.bindAggregation("items",{
                        path: '/SupplierSet',
                        template: new sap.m.DisplayListItem({
                            label: '{COUNTRY}',
                            value:'{CITY}'
                        })
                    })
                    that.oCitypopup.setMultiSelect(false);
                    that.oCitypopup.open();
                });
            }
            else{
                this.oCitypopup.open();
            }
           
        },

        onBack: function(){
            this.oView.getParent().to("idView1"); //Chaining
        },

        onSearch: function(oEvent){
            //Step 1: get the search string
            var sVal = oEvent.getParameter("value");
            var oBinding = oEvent.getParameter("itemsBinding");
            //step 2: prepare filter
            var oFilter = new Filter("name", FilterOperator.Contains, sVal);
            //Step 3: pass filter to popup items binding
            oBinding.filter(oFilter);


        },

        handleConfirm: function(status){
            if(status === "OK"){
                MessageToast.show(this.readMessage("MSG_ORDERREL","123123"));
            }else{
                MessageToast.show("You cancelled this order");
            }
        },

        onOrder: function(){
            MessageBox.confirm(this.readMessage("MSG_CONFIRM"),{
                title: 'Confirmation',
                onClose: this.handleConfirm.bind(this)
            })
        }
    });
});