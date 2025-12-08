sap.ui.define([
    "sap/ui/core/format/NumberFormat",
    "sap/ui/core/format/DateFormat"
],function(NumberFormat, DateFormat){
    'use strict';
    return{
        myformatter:function(input){
            if(input){
                return input.toUpperCase();
            }
        },
        cfort: function(amt,curr){
            var oCurrencyFormat = NumberFormat.getCurrencyInstance();
            return oCurrencyFormat.format(amt, curr);
        },

        datefot: function(joo){
            var oDateFormat = DateFormat.getDateInstance({
                pattern: "dd/MM/YYYY"
            });
            
            var oDate = new Date(joo);
            return oDateFormat.format(oDate)
            
        }
    };

});