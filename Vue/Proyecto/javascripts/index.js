$(document).ready(function(){
    new Vue({
        el: '#app',
        data: () => ({
          drawer: false
        }),
      
        props: {
          source: String
        }
      })
});
