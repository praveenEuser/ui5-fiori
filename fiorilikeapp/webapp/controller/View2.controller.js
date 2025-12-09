sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller){
    'use strict';   
    return Controller.extend("sasu.controller.View2",{
        oInit: function(){

        },

        onBack: function(){
            this.oView.getParent().to("idView1"); //Chaining
        }
    });
});