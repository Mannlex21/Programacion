$(document).ready(function () {
    /*var xmlhttp = new XMLHttpRequest();
    var url = "/Notas/GetNotas";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonResult = JSON.parse(this.responseText);
            app.object = jsonResult.notas;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();*/
   
    //$.ajax({
    //    url: url,
    //    method: 'GET',
    //    success: function (data) {
    //        console.log(data.notas)
    //        app.object = data.notas;
    //    },
    //    error: function (error) {
    //        console.log(error);
    //    }
    //});
    
    //var params = typeof data == 'string' ? data : Object.keys(data).map(
    //    function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    //).join('&');

    //var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    //xhr.open('POST', url);
    //xhr.onreadystatechange = function () {
    //    if (xhr.readyState > 3 && xhr.status == 200) { success(xhr.responseText); }
    //};
    //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //xhr.send(params);<
});