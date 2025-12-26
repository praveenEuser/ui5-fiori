sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sasu/util/formatter',
],function(Controller, Formatter){
    return Controller.extend("sasu.controller.BaseController",{
        formatter:Formatter,
        extractPath: function(oEvent){
            var fruitId = oEvent.getParameter("arguments").fruitId;
            return '/fruits/' + fruitId;
        },

        readMessage: function(key, param1){
            var oResourceModel = this.getOwnerComponent().getModel("i18n");
            var oResourceBundel = oResourceModel.getResourceBundle();
            return oResourceBundel.getText(key,param1);
        }
    });
})