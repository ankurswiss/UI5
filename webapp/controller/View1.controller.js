sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
        }
        ,
        onSubmit: function () {
            var sel1 = this.byId("_IDGenSelect").getSelectedKey();
            var sel2 = this.byId("_IDGenSelect_1").getSelectedKey();
            var sel3 = this.byId("_IDGenSelect_2").getSelectedKeys();
            var sel4 = this.byId("_IDGenRadioButtonGroup").getSelectedIndex();
        },
        onDropSelect() {
            var sel1 = this.byId("_IDGenSelect").getSelectedKey();
        },
        onDropSelect1() {
            var sel1 = this.byId("_IDGenSelect3").getSelectedKey();
        },
        onDropSelect2() {
            var sel1 = this.byId("_IDGenSelect4").getSelectedKey();
        },
        onSelectTable(oEvent) {
            var rollNo = oEvent.getSource().getBindingContext("oModel").getObject().StdntId;
            this.getOwnerComponent().getRouter().navTo("RouteView2", { key: rollNo });
        },
        onButton() {
            var rollNos = this.byId("_t1").getSelectedItems();
            // .getBindingContext("oModel").getObject().StdntId;
            for (var i = 0; i < rollNos.length; i++) {
                var rolno = rollNos[i].getBindingContext("oModel").getObject().StdntId;
            }
        }
        ,
        onShowValHelp() {

            if (this.dialog === undefined) {
                this.dialog = sap.ui.xmlfragment(this.getView().getId(), "jet.ztest1.fragments.RollNoF4help", this);
                this.getView().addDependent(this.dialog);
            }
            this.dialog.open();

        },
        onClosePopUp() {
            this.dialog.close();
        },
        onSelectTableF4(oEvent) {
            var rollNo = oEvent.getSource().getBindingContext("oModel").getObject().StdntId;
            var name = oEvent.getSource().getBindingContext("oModel").getObject().StdntName;
            this.byId("_IDGenInput").setValue(rollNo);
            // this.byId("_IDGenInput1").setText(name);
            // var rollNo_i = parseInt(rollNo);
            // this.byId("_IDGenSimpleForm1").bindElement("oModel>/StdntInfoSet(1)");
            this.byId("_IDGenSimpleForm1").bindElement("oModel>/StdntInfoSet(" + rollNo + ")");
            this.dialog.close();
        },
        onDetails() {
            var rollNo = this.byId("_IDGenInput").getValue();
            this.getOwnerComponent().getRouter().navTo("RouteView2", { key: rollNo });

        },
        onCreate() {
            // var rollNo = this.byId("_IDGenInput").getValue();
            // this.getOwnerComponent().getRouter().navTo("RouteView3");
            this.getOwnerComponent().getRouter().navTo("RouteView3");

        },

        onCreateBulk(){

            this.getOwnerComponent().getRouter().navTo("RouteView4");

        },

        onDelete() {
            var oModel = this.getOwnerComponent().getModel("oModel");
            var rollNos = this.byId("_t1").getSelectedItems();
            if (rollNos === null) {
                MessageBox.error("Choose the row first");
                return;
            }
            for (var i = 0; i < rollNos.length; i++) {

                var rolno = rollNos[i].getBindingContext("oModel").getObject().StdntId;
                oModel.remove("/StdntInfoSet(" + rolno + ")", {
                    success(req, res) {
                        if (res.statusCode === "204") {
                            MessageBox.success("Record deleted");
                        }
                    },
                    error(oError) {
                        MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                    }
                },)
            }
        }



    });
});

