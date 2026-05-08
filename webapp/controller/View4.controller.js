sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.View4", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView4").attachPatternMatched(this.onPatternMatched, this);
             var oModel = new JSONModel({
                employees: []
            });
            this.getView().setModel(oModel);
        },

        OnBulkCreate(){
            
        },


        onFileChange(oEvent){
             var file = oEvent.getParameter("files")[0];

            if (!file) {
                return;
            }

            var reader = new FileReader();
            reader.onload = function (e) {
                debugger;
                var data = e.target.result;

                // Read workbook
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                // Get first sheet
                var sheetName = workbook.SheetNames[0];
                var sheet = workbook.Sheets[sheetName];

                // Convert to JSON
                var jsonData = XLSX.utils.sheet_to_json(sheet);
                 // Expected format: [{id:1, name:"ABC"}]
                var employees = jsonData.map(function (row) {
                    return {
                        id: row.id,
                        name: row.name
                    };
                });

                // Set to model
                var oModel = this.getView().getModel();
                oModel.setProperty("/employees", employees);
               


                }.bind(this);
                 reader.readAsBinaryString(file);



            
        }});




           
});
