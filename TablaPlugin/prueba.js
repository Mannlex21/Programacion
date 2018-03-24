function getData() {
    return [{
        code: "ZW",
        name: "Zimbabwe",
        id: 245
    }, {
        code: "VI",
        name: "United States Virgin Islands",
        id: 235
    }, {
        code: "US",
        name: "United States",
        id: 234
    }];
}
makeTable.table(getData(),'app',['code','name','id'],"table table-hover","thead-dark","");
