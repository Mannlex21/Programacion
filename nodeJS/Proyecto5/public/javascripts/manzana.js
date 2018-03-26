(function(){
    $("#manzana").hover(function(){
       $(this).animate({
          opacity: 1.0
       }, 1000);
    }, function(){
       $(this).animate({
          opacity: 0.3
       }, 500);
    });
 }).call(this);