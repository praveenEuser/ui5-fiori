sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent){
    'use strict';
    return UIComponent.extend("sasu.Component",{
        metadata: {},
        init: function(){
            //this line will call the base class contructor
            UIComponent.prototype.init.apply(this);
        },
        createContent: function(){
            var oView = sap.ui.view({
                viewName: "sasu.view.App",
                id: "idAppView",
                type: "XML"
            })

            //Step 1: Create view 1 object
            var oView1 = sap.ui.view({
                viewName: "sasu.view.View1",
                id: "idView1",
                type: "XML"
            })
            //Step 2: Create view 2 object
            var oView2 = sap.ui.view({
                viewName: "sasu.view.View2",
                id: "idView2",
                type: "XML"
            })
            //Step 3: Get the App Container Control Object from App.view.xml
            var oAppCon = oView.byId("appCon");
            //Step 4: Inject the View1 and View2 inside the Container
            oAppCon.addPage(oView1).addPage(oView2);
            return oView;
        }


    });
})