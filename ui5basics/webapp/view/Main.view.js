sap.ui.jsview("bbs.view.Main",{
    getControllerName: function() {
        return "bbs.controller.Main"
    },

    createContent: function(oController) {
        // var oControlName = new libraryName.ClassName(sId, sProperties)

        var oInp = new sap.m.Input("idInp");
        //oInp.placeAt("canvas");
        var oBtn = new sap.m.Button("idBtn",{
            text: "Locked",
            icon: "sap-icon://employee",
            press: function(){
                var vals = sap.ui.getCore().byId("idBtn").getText();
                if (vals === "Locked")
                alert("This button is Locked"); 
            }
        });

        //oBtn.placeAt("content");

        var oBtn2 = new sap.m.Button("idBtn2",{
            text: "Release",
            press: oController.oNew1
        })
        //oBtn2.placeAt("cds");

        return [oInp,oBtn,oBtn2];
    }
});

