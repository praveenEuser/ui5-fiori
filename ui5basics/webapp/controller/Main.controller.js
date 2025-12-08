sap.ui.define(
    ['sap/ui/core/mvc/Controller'],
    function(Controller){
        return Controller.extend("bbs.controller.Main",{
            onInit: function(){
                console.log("Constructor is Running");
                console.log(this.getView());
            },
            onExit: function(){
                console.log("Destructor is Running");
            },
            onBeforeRendering: function(){
                console.log("Before Rendering is Running");
            },
            onAfterRendering: function(){
                console.log("After Rendering is Running");
                $("#idInp").fadeOut(1000).fadeIn(5000);
            },

            oNew1: function(){
                var vBtn = sap.ui.getCore().byId("idBtn");
                var lstore = sap.ui.getCore().byId("idBtn2");
                alert("First Button is Released")

                vBtn.setText("Released");
                sap.ui.getCore().byId("idInp").setValue("Vanakkam da Mapla")
                
                if( lstore.getText() === "Release"){
                    lstore.setText ("Opened")
                }
                vBtn.attachPress(function(){
                    var sVal = sap.ui.getCore().byId("idInp").getValue();
                    alert(sVal);
                })
                
            }
        });
    }    
);