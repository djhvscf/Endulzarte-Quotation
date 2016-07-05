var columnDefs = [
    {
        headerName: "Item", 
        field: "item",
        width: 60,
        suppressResize: true,
        suppressMovable: true,
        cellStyle: {
            "text-align": "center"
        }
    },
    {
        headerName: "Código", 
        field: "codigo",
        cellStyle: {
            "text-align": "center"
        },
        editable: true
    },
    {
        headerName: "Descripción / Producto",
        field: "producto",
        editable: true
    },
    {
        headerName: "Cantidad",
        field: "cantidad",
        cellStyle: {
            "text-align": "center"
        },
        editable: true,
        newValueHandler: numberNewValueHandler
    },
    {
        headerName: "Unidad",
        field: "unidad",
        editable: true,
        cellEditor: "select",
        cellEditorParams: {
            values: ["", "", "Otro"]
        }
    },
    {
        headerName: "Valor Unitario",
        field: "valor",
        cellStyle: {
            "text-align": "center"
        },
        editable: true,
        newValueHandler: numberNewValueHandler
    },
    {
        headerName: "Valor Total",
        field: "total",
        cellStyle: {
            "text-align": "center"
        },
        valueGetter: "data.cantidad * data.valor",
        volatile: true
    }
];

function numberNewValueHandler(params) {
    var valueAsNumber = parseInt(params.newValue);
    if (isNaN(valueAsNumber)) {
        window.alert("El valor tiene que se un número. Valor ingresado: " + params.newValue);
    } else {
        params.data[params.colDef.field] = valueAsNumber;
    }
}

function cellValueChanged() {
    gridOptions.api.softRefreshView();
    calculos.calcular(gridOptions);   
}

var rowData = [
    {
        item: "1", 
        codigo: "",
        producto: "",
        cantidad: 0,
        unidad: "",
        valor: 0,
        total: 0
    }
];

var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    singleClickEdit: true,
    enableColResize: true,
    onCellValueChanged: cellValueChanged
};

document.addEventListener("DOMContentLoaded", function() {
    var eGridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(eGridDiv, gridOptions);

    $("#agregarFilas").click(function() {
        gridHelper.agregarFilas(gridOptions)
    });

    $("#descuento").change(function() {
        calculos.calcular(gridOptions); 
    });

    $("#transporte").change(function() {
        calculos.calcular(gridOptions); 
    });

    calculos.calcular(gridOptions); 
});