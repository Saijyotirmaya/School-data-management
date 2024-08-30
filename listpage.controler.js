sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox"
],
  function (Controller, JSONModel, Filter, FilterOperator, MessageBox) {
    "use strict"
    return Controller.extend("com.sap.ui.studentdata.controller.listpage", {
      onInit: function () {

      },

      onListitempress: function (oEvent) {
        var oSelectedItem = oEvent.getSource();
        var oCtxt = oSelectedItem.getBindingContext();
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("detail", {
          ID: oCtxt.getProperty("ID"),
        });
      },

      onSearch: function () {
        var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
          var oControl = oFilterGroupItem.getControl(),
            aSelectedKeys = oControl.getSelectedKeys(),
            aFilters = aSelectedKeys.map(function (sSelectedKey) {
              return new Filter({
                path: oFilterGroupItem.getName(),
                operator: FilterOperator.Contains,
                value1: sSelectedKey
              });
            });

          if (aSelectedKeys.length > 0) {
            aResult.push(new Filter({
              filters: aFilters,
              and: false
            }));
          }

          return aResult;
        }, []);

        this.oTable.getBinding("items").filter(aTableFilters);
        this.oTable.setShowOverlay(false);
      },

      onDelete: function () {
        var table = this.getView().byId("idtable");
        var selected = table.getSelectedItems();
        var msg;
        if (selected["length"] === 0) {
          msg = "Please select atleast one row";
          sap.m.MessageBox.show(msg, {
            icon: sap.m.MessageBox.Icon.ERROR,
            title: "Error"
          });
        } else {
          var length = selected.length;
          for (var i = 0; i < length; i++) {
            selected[i].destroy();
            msg = "Task Complete";
            sap.m.MessageBox.show(msg, {
              icon: sap.m.MessageBox.Icon.SUCCESS,
              title: "Success"
            });

          }
        }
      },
      _setUIChanges : function (bHasUIChanges) {
        if (this._bTechnicalErrors) {
          // If there is currently a technical error, then force 'true'.
          bHasUIChanges = true;
        } else if (bHasUIChanges === undefined) {
          bHasUIChanges = this.getView().getModel().hasPendingChanges();
        }
        var oModel = this.getView().getModel();
        oModel.setProperty("/hasUIChanges", bHasUIChanges);
      },

      onCreate: function () {
        var oList = this.byId("idtable"),
          oBinding = oList.getBinding("items"),
          oContext = oBinding.create({
            "School_Name": "",
            "Roll_no": "",
            "Student_Name": "",
            "Class": ""
          });

        this._setUIChanges();
        this.getView().getModel().setProperty("/Studentdata", true);

        oList.getItems().some(function (oItem) {
          if (oItem.getBindingContext() === oContext) {
            oItem.focus();
            oItem.setSelected(true);
            return true;
          }
        });
        // var oItem  = new sap.m.ColumnListItem({
        //   cells:[

        //     new sap.m.Input(),
        //     new sap.m.Input({
        //       type:"Number",
        //     }),
        //     new sap.m.Input(),
        //     new sap.m.Input(),
        //     new sap.m.Input(),
        //     new sap.m.Input(),
        //     new sap.m.Input(),
        //     new sap.m.Input(),
        //     new sap.m.Input(),
        //     new sap.m.Input({
        //       type:"Number",
        //     }),
        //   ],
        // }) ;
        // var oTable = this.getView().byId("idtable");
        // oTable.addItem(oItem)
      },





    });
  });
