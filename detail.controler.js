sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "jquery.sap.global",
    "sap/ui/core/Fragment",

],
    function (Controller, Fragment) {
        "use strict";



        return Controller.extend("com.sap.ui.studentdata.controller.detail", {
            onInit: function () {
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                this.oRouter.getRoute("detail").attachPatternMatched(this.oRouterPatternMatched, this);

            },

            oRouterPatternMatched: function (oEvent) {
                var spath = "/Studentdata/" + oEvent.getParameter("arguments").ID;
                this.getView().bindElement(spath);
            },
            onEditPress: function (oEvent) {

                var oSelectedItem = oEvent.getSource();
                var oCtxt = oSelectedItem.getBindingContext();
                oCtxt.getProperty("ID")
                var newObject = $.extend({}, oCtxt);
                console.log(newObject);
            },
        });
    });
