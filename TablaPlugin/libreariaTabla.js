var makeTable = function() {
    var parentNode;
    function table(data,parent,nameColumns,estiloTabla,estiloTablaCabecera,estiloTablaBody) {
        var errorTamColumnas=0;
        if(parent==""){
            console.error("Error in content element");
            return;
        }
        if(countProperties(data)!=0){
            var noColumnaInicial=countProperties(data[0]);
            var table = document.createElement('table');
            table.setAttribute("class","tableLib "+estiloTabla);
            var tableHead = document.createElement("thead");
            
            tableHead.setAttribute("class","tHeadLib "+estiloTablaCabecera)
            var columnsName = document.createElement('tr');
            if(nameColumns.length===noColumnaInicial){
                nameColumns.forEach(element => {
                    var columnName = document.createElement('th');
                    columnName.appendChild(document.createTextNode(element))
                    columnName.setAttribute("scope","col");
                    columnsName.appendChild(columnName);
                });
                tableHead.appendChild(columnsName);
                table.appendChild(tableHead);
                var tableBody=document.createElement("tbody");
                tableBody.setAttribute("class","cabeceraTabla "+estiloTablaBody)
                data.forEach(element=>{
                    var columnsText = document.createElement('tr');
                    Object.keys(element).map(function(objectKey, index) {
                        var value = element[objectKey];
                        var columnText = document.createElement('td');
                        columnText.setAttribute("scope","row")
                        columnText.appendChild(document.createTextNode(value))
                        columnsText.appendChild(columnText);
                    });
                    tableBody.appendChild(columnsText);
                    table.appendChild(tableBody);
                })
                console.log(table)
                window.onload = function(){
                    parentNode = document.getElementById(parent);
                    parentNode.appendChild(table)    
                };
                
            }else{
                console.error("Error in column size");
            }
        }else{
            
        };
    };
    
    function countProperties(obj) {
        var count = 0;
    
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                ++count;
        }
        return count;
    }
 	return {
        table: table
	}
}();

