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

        OnBulkCreate() {
            var oModelV4 = this.getView().getModel();
            var aEmployee = oModelV4.getData().employees;
            aEmployee.forEach(function (item) {
                item.StdntId = Number(item.StdntId);

            });
            var oModel = this.getOwnerComponent().getModel("oModel");
            var aDefGroup = oModel.getDeferredGroups();
            aDefGroup = aDefGroup.concat(["CREATEBATCH"]);
            oModel.setDeferredGroups(aDefGroup);

            
            for (let i = 0; i < aEmployee.length; i++) {
                oModel.create("/StdntInfoSet", aEmployee[i],
                    { groupId: "CREATEBATCH" }
                );

            }

            oModel.submitChanges({
                groupId: "CREATEBATCH",
                success: function (req, res) {
                    if (res.statusCode === "202") {
                        sap.m.MessageToast.show("Details Updated");
                    }
                },
                error: function (oError) {
                    sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                }
            })

        },
        onBack(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },

        onFileChange(oEvent) {
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
                        StdntId: row.id,
                        StdntName: row.name
                    };
                });

                // Set to model
                var oModel = this.getView().getModel();
                oModel.setProperty("/employees", employees);



            }.bind(this);
            reader.readAsBinaryString(file);




        }
    });





});
