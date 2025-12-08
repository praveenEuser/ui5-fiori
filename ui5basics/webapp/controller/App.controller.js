sap.ui.define([
    'sap/ui/core/mvc/Controller', 
    'bbs/model/models',
    'bbs/util/formatter'
], function (Controller, Models, Formatter) {
        return Controller.extend("bbs.controller.App",{
            formatter:Formatter,
            onInit: function(){
                this.oView = this.getView();
                //Calling our own reuse class to create model object
                oModel = Models.createJSONModel("model/mockdata/dataset.json");
                //oModel.setDefaultBindingMode("OneWay");
                //St ep 3: Make the model aware to the Application
                sap.ui.getCore().setModel(oModel); //a model with no name is default model

                oModel2 = Models.createResourceModel();
                //Named Model
                sap.ui.getCore().setModel(oModel2, "i18n");

                oModel1 = Models.createJSONModel("model/mockdata/sample.json");
                //Named Model
                sap.ui.getCore().setModel(oModel1, "Second");
                
                
                //oXml = Models.createXMLModel("model/mockdata/mydata.xml");
                //sap.ui.getCore().setModel(oXml);


                // //Option 3
                // var oSalary = this.oView.byId("idEmpSal");
                // oSalary.bindValue("Second>/empStr/salary");
                // //Option 4
                // var oCurr = this.oView.byId("idEmpCurr");
                // oCurr.bindProperty("value","Second>/empStr/currency");
            },

            onLock: function(){

                // var oHk = this.oView.byId("idEmpId")

                // if(this.oView.byId("idEmpId").getEnabled == true ){
                //     this.oView.byId("idEmpId").setEnabled(false);
                // }
                // else{
                //     this.oView.byId("idEmpId").setEnabled(true);
                // }


                //Step 1 : Get the Model Object
                var oModel = sap.ui.getCore().getModel();
                //Step 2 : Change Data in the Model
                var oData = oModel.getProperty("/empStr");
                console.log(oData);
                var res = oModel.getProperty("/empStr/hunk");
                console.log(res);
                
                if(oModel.getProperty("/empStr/hunk") === true){
                    oModel.setProperty("/empStr/empName","Ram");
                    oModel.setProperty("/empStr/hunk",false);
                }
                else{
                    oModel.setProperty("/empStr/hunk",true);
                }
            },
            //Event Handler Function
            oRowClick: function(oEvent){


                //Step 1: What is the Row which was selected by user
                var oGet = oEvent.getParameter("rowContext");
                //Step 2: Know the address of the element
                var sPath = oGet.getPath();
                console.log(sPath);
                //Step 3: Get the Object of the Simple Form
                var oSimpleForm = this.getView().byId("idSimpF");
                //Step 4: Perform Element Binding
                oSimpleForm.bindElement(sPath);
                
            },

            
            
            onFlip: function(){ 

                    var oModel = sap.ui.getCore().getModel();
                    var oGOT = sap.ui.getCore().getModel("Second");

                    sap.ui.getCore().setModel(oGOT);
                    sap.ui.getCore().setModel(oModel,"Second");

                    

                    // var oModel = sap.ui.getCore().getModel();
                    // if(oModel.getProperty("/empStr/hunk") === false){
                    //     oId = this.oView.byId("idEmpId");
                    //     oId.bindValue("Second>/empStr/empId");
                    //     oId = this.oView.byId("idEmpName");
                    //     oId.bindValue("Second>/empStr/empName");
                    //     oId = this.oView.byId("idEmpSal");
                    //     oId.bindValue("Second>/empStr/salary");
                    //     oId = this.oView.byId("idEmpCurr");
                    //     oId.bindValue("Second>/empStr/currency");
                    //     oModel.setProperty("/empStr/hunk",true);
                    // }
                    // else if(oModel.getProperty("/empStr/hunk") === true){
                    //     oId = this.oView.byId("idEmpId");
                    //     oId.bindValue("/empStr/empId");
                    //     oId = this.oView.byId("idEmpName");
                    //     oId.bindValue("/empStr/empName");
                    //     oId = this.oView.byId("idEmpSal");
                    //     oId.bindValue("/empStr/salary");
                    //     oId = this.oView.byId("idEmpCurr");
                    //     oId.bindValue("/empStr/currency");
                    //     oModel.setProperty("/empStr/hunk",false);
                    // }
                    
            } 
        })
    }
)