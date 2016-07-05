var calculos = new function() {
    this.calcular = function (gridOptions) {
        this.calcularGranTotal(gridOptions);
    };
    this.calcularGranTotal = function(gridOptions) {
        var granTotal = 0;
        gridOptions.api.forEachNode(function (node) {
            granTotal += gridOptions.api.getValue("total", node);
        });
        $("#granTotal").val(granTotal);

        this.calcularDescuento(granTotal);
    };
    this.calcularDescuento = function(granTotal) {
        var descuentoFinal = $("#descuentoFinal"),
        descuento = $("#descuento"),
        descuentoFinalValue = (descuento.val() === "" ? 0 : descuento.val()) * (granTotal/100);
    
        descuentoFinal.val(descuentoFinalValue);
        this.calcularSubtotal(granTotal, descuentoFinalValue);
    };
    this.calcularSubtotal = function(granTotal, descuentoFinalValue) {
        var subtotal = $("#subtotal");
        subtotal.val(granTotal - descuentoFinalValue);

        this.calcularValorTotal();
    };
    this.calcularValorTotal = function() {
        var subtotal = $("#subtotal"),
            transporte = $("#transporte");

        $("#valorFinalTotal").val(parseFloat(subtotal.val() === "" ? 0 : subtotal.val()) + parseFloat(transporte.val() === "" ? 0 : transporte.val()));
    };
}