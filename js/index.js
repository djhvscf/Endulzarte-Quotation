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
    var granTotal = 0;
    gridOptions.api.softRefreshView();
    gridOptions.api.forEachNode(function (e) {
        granTotal += gridOptions.api.getValue("total", e);
    });
    $("#granTotal").val(granTotal);
}

var rowData = [
    {
        item: "1", 
        codigo: "Celica",
        producto: "Queque",
        cantidad: 2,
        unidad: "",
        valor: 3500,
        total: 0
    },
    {
        item: "2", 
        codigo: "Celica",
        producto: "Queque",
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
});