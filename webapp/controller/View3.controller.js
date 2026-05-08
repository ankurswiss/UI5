sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageBox,JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.View3", {
        onInit() {
           this.byId("_IDGenInput3").setValueState("None");
           this.certModel = this.getOwnerComponent().getModel("certModel");
           this.certModel.setData({
             aCertif:[
        //         // {
        //         //     StdntId:"1",
        //         //     CertId:"2",
        //         //     CertName:"HANA"
        //         // }
        //         // {
        //         //     StdntId:"",
        //         //     CertId:"",
        //         //     CertName:""
        //         // }
             ]


           })

        },

       onBack1(){
        this.getOwnerComponent().getRouter().navTo("RouteView1");
       },

       onAddRow(){
        this.certModel.getData().aCertif.push(
            {
                    StdntId: this.byId("_IDGenInput3").getValue(),
                    CertId:"",
                    CertName:""
                }



        );
        this.certModel.refresh();
       },
       onDeleteRow(oEvent){
       var index = oEvent.getSource().getParent().getBindingContextPath().split("/")[2];
       this.certModel.getData().aCertif.splice(index,1);
       this.certModel.refresh();

       },



       onBack2(){
       var name = this.byId("_IDGenInput2").getValue();
       var id = this.byId("_IDGenInput3").getValue();
       if (id === "") {
        this.byId("_IDGenInput3").setValueState("Error");
       }
       var oModel = this.getOwnerComponent().getModel("oModel");
      


       var paylod = {
        StdntId: parseInt(id),
        StdntName: name,
        toCert: this.certModel.getData().aCertif
       };
       paylod.toCert.forEach(function(item) {
    item.StdntId = Number(item.StdntId);
    item.CertId = Number(item.CertId);
});
       oModel.create("/StdntInfoSet",paylod,{
        success(req,res){
            if (res.statusCode === "201") {
                MessageBox.success("New ID created");
            }
        },
        error(oError){
            MessageBox.error(JSON.parse(oError.responseText).error.message.value);
        }
       });

       }
           });
});
