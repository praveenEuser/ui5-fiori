sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller){
    'use strict';   
    return Controller.extend("sasu.controller.View2",{
        onInit: function(){
            //Step 1: Get the Router Object
            this.Router = this.getOwnerComponent().getRouter();
            //We forcefully pass this pointer to initial(event handler)
            this.Router.getRoute("detail").attachPatternMatched(this.intital, this);
        },

        intital:function(oEvent){
            debugger;
            var fruitId = oEvent.getParameter("arguments").fruitId;
            var sPath = '/fruits/' + fruitId;
            this.getView().bindElement(sPath); // binding with /fruits/4 -> datam
        },

        onBack: function(){
            this.oView.getParent().to("idView1"); //Chaining
        }
    });
});