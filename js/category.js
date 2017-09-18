$(function(){
    $("#category").on("click",".category-ul>li>a",function(){
         $(this).parent().find("ul").toggle();
        $(this).parent().siblings().find("ul").slideUp();
        var titleId = $(this).attr("data-title-id");
        $that = $(this);
        categoryProduct(titleId,$that);
    });
    categoryTitle();
})

function categoryTitle(){
    $.ajax({
        url:"http://182.254.146.100:3000/api/getcategorytitle",
        success:function(data){
            var html = template("category-title",data);
            $(".category-ul").html(html)
        }
    })
}

function categoryProduct(titleId,$that){
    $.ajax({
        url:"http://182.254.146.100:3000/api/getcategory?titleid="+titleId,
        success:function(data){
            var html = template("category-product",data)
            var $ul = $that.siblings("ul");
            $ul.html(html);
        }
    })
}