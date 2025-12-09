sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller){
    'use strict';   
    return Controller.extend("sasu.controller.View1",{
        oInit: function(){
            //this is current class object - which is our controller
            oView: this.getView();
        },

        onNext: function(){
            //Step 1: Get the Parent Control Object - Container for our view
            var oApp = this.oView.getParent();

            //Step 2: Ask Parent to nav to next view
            oApp.to("idView2");
        },

        onAction1: function(){
            alert("Order Succesfully Placed");
        }
    });
});