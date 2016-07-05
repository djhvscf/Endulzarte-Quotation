var gridHelper = new function() {
    this.agregarFilas = function (gridOptions) {
        var rowData = [],
        rowCount = 1;
        
        gridOptions.api.forEachNode(function (node) {
            rowData.push({
                item: gridOptions.api.getValue("item", node), 
                codigo: gridOptions.api.getValue("codigo", node),
                producto: gridOptions.api.getValue("producto", node),
                cantidad: gridOptions.api.getValue("cantidad", node),
                unidad: gridOptions.api.getValue("unidad", node),
                valor: gridOptions.api.getValue("valor", node),
                total: gridOptions.api.getValue("total", node)
            });
            rowCount++;
        });

        rowData.push({
            item: rowCount.toString(), 
            codigo: "",
            producto: "",
            cantidad: 0,
            unidad: "",
            valor: 0,
            total: 0
        });

        gridOptions.api.setRowData(rowData);
    };
}