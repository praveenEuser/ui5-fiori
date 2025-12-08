sap.ui.define([
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/xml/XMLModel',
    'sap/ui/model/resource/ResourceModel'
], function (JSONModel, XMLModel, ResourceModel) {
    'use strict';
    return {
        createJSONModel: function (sFilePath) {
            //Step 1: Create a Brand new model object
            var oModel = new JSONModel();
            //Step 2: Load or set the data to the model
            oModel.loadData(sFilePath);

            return oModel;
        },
        createXMLModel: function (sFilePath) {
            //Step 1: Create a Brand new model object
            var oModel = new XMLModel();
            //Step 2: Load or set the data to the model
            oModel.loadData(sFilePath);

            return oModel;
        },
        createResourceModel: function () {
            var oModel = new ResourceModel({
                bundleName: "bbs.i18n.i18n"
            });
            return oModel;
        }
    }
}

)