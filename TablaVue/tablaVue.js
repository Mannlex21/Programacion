window.onload = function() {
Vue.use(VueTables.ClientTable,{
    compileTemplates: true,
    filterByColumn: true,
    texts: {
      filter: "Search:"
    }
  });
  
  new Vue({
    el: "#app",
    data: {
      columns: ['name', 'code', 'uri'],
      data: getData(),
      options: {
        headings: {
          name: 'Country Name',
          code: 'Country Code',
          uri: 'View Record'
        },
        sortable: ['name', 'code'],
        filterable: ['name', 'code']
      }
    }
  });
  
  function getData() {
    return [{
      code: "ZW",
      name: "Zimbabwe",
      created_at: "2015-04-24T01:46:50.459583",
      updated_at: "2015-04-24T01:46:50.459593",
      uri: "http://api.lobbyfacts.eu/api/1/country/245",
      id: 245
    }, {
      code: "ZM",
      name: "Zambia",
      created_at: "2015-04-24T01:46:50.457459",
      updated_at: "2015-04-24T01:46:50.457468",
      uri: "http://api.lobbyfacts.eu/api/1/country/244",
      id: 244
    }, {
      code: "YE",
      name: "Yemen",
      created_at: "2015-04-24T01:46:50.454731",
      updated_at: "2015-04-24T01:46:50.454741",
      uri: "http://api.lobbyfacts.eu/api/1/country/243",
      id: 243
    }, {
      code: "EH",
      name: "Western Sahara",
      created_at: "2015-04-24T01:46:50.452002",
      updated_at: "2015-04-24T01:46:50.452011",
      uri: "http://api.lobbyfacts.eu/api/1/country/242",
      id: 242
    }, {
      code: "WF",
      name: "Wallis & Futuna",
      created_at: "2015-04-24T01:46:50.449346",
      updated_at: "2015-04-24T01:46:50.449355",
      uri: "http://api.lobbyfacts.eu/api/1/country/241",
      id: 241
    }, {
      code: "VN",
      name: "Vietnam",
      created_at: "2015-04-24T01:46:50.446644",
      updated_at: "2015-04-24T01:46:50.446652",
      uri: "http://api.lobbyfacts.eu/api/1/country/240",
      id: 240
    }, {
      code: "VE",
      name: "Venezuela",
      created_at: "2015-04-24T01:46:50.444031",
      updated_at: "2015-04-24T01:46:50.444040",
      uri: "http://api.lobbyfacts.eu/api/1/country/239",
      id: 239
    }, {
      code: "VU",
      name: "Vanuatu",
      created_at: "2015-04-24T01:46:50.441423",
      updated_at: "2015-04-24T01:46:50.441433",
      uri: "http://api.lobbyfacts.eu/api/1/country/238",
      id: 238
    }, {
      code: "UZ",
      name: "Uzbekistan",
      created_at: "2015-04-24T01:46:50.438748",
      updated_at: "2015-04-24T01:46:50.438757",
      uri: "http://api.lobbyfacts.eu/api/1/country/237",
      id: 237
    }, {
      code: "UY",
      name: "Uruguay",
      created_at: "2015-04-24T01:46:50.435761",
      updated_at: "2015-04-24T01:46:50.435770",
      uri: "http://api.lobbyfacts.eu/api/1/country/236",
      id: 236
    }, {
      code: "VI",
      name: "United States Virgin Islands",
      created_at: "2015-04-24T01:46:50.433229",
      updated_at: "2015-04-24T01:46:50.433238",
      uri: "http://api.lobbyfacts.eu/api/1/country/235",
      id: 235
    }, {
      code: "US",
      name: "United States",
      created_at: "2015-04-24T01:46:50.430335",
      updated_at: "2015-04-24T01:46:50.430340",
      uri: "http://api.lobbyfacts.eu/api/1/country/234",
      id: 234
    }, {
      code: "GB",
      name: "United Kingdom",
      created_at: "2015-04-24T01:46:50.427956",
      updated_at: "2015-04-24T01:46:50.427961",
      uri: "http://api.lobbyfacts.eu/api/1/country/233",
      id: 233
    }, {
      code: "AE",
      name: "United Arab Emirates",
      created_at: "2015-04-24T01:46:50.425383",
      updated_at: "2015-04-24T01:46:50.425392",
      uri: "http://api.lobbyfacts.eu/api/1/country/232",
      id: 232
    }];
  }
  };