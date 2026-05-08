sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project1.controller.View2", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatched, this);
        },
        onPatternMatched(oEvent){
            var stid = oEvent.getParameter("arguments").key;
            this.stid = stid;
            this.byId("_IDGenSimpleForm3").bindElement("oModel>/StdntInfoSet("+stid+")");
            this.byId("_IDGenIconTabBar").bindElement("oModel>/StdntInfoSet("+stid+")");
        },


        onBack(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },


        onDetails(oEvent){
           var clas = this.byId("_IDGenInput4").getValue();
           var sname = this.byId("_IDGenInput1.1.3").getValue();
           
       
        var paylod = {
        StdntClass: clas,
        StdntSurname:sname,

       };
       var oModel = this.getOwnerComponent().getModel("oModel");
       
       var sPath = "/StdntInfoSet("+this.stid+")";
        // this.byId("_IDGenSimpleForm1").bindElement("oModel>/StdntInfoSet("+rollNo+")");

      oModel.update(sPath, paylod, {
        method: "MERGE", // important!
        success: function (req,res) {
            if (res.statusCode === "204") {
                sap.m.MessageToast.show("Details Updated");
            }
        },
        error: function (oError) {
            sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value);
        }
    })



        }

           });
});



