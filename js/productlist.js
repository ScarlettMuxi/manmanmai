$(function(){
    var categoryId = GetQueryString("categoryid");
    var pageId = GetQueryString("pageid");
    $.ajax({
        url:"http://182.254.146.100:3000/api/getcategorybyid",
        data:{
            "categoryid":categoryId
        },
        success:function(data){
            var cateName = data.result[0].category;
            $(".category-title").html(cateName)
        }
    })
    categoryProduct(categoryId,pageId);
});

function categoryProduct(categoryId,pageId){
    $.ajax({
        url:"http://182.254.146.100:3000/api/getproductlist",
        data:{
            "categoryid":categoryId,
            "pageid":pageId
        },
        success:function(data){
            var html = template("category-Product",data);
            $("#product-con>ul").html(html);
            var pageSize = data.pagesize;
            var totalCount = data.totalCount;
            var page = Math.floor(totalCount/pageSize);
            var option = "";
            if (page == 0){
              option += `<option>${1}</option>`;
            }else {
                for(var i = 0; i<page;i++){
                    if ((i+1)==pageId){
                        option+=`<option selected>${1+i}</option>`;
                    }else {
                        option+=`<option>${1+i}</option>`;
                    }
                }
            }
           $("#select").html(option);
            $("#select").on("change",function(){
                window.location.href=`./productlist.html?categoryid=${categoryId}&pageid=${$(this).val()}`
            })

            var pageid = pageId-0;
            if(page>0){
                var next = `./productlist.html?categoryid=${categoryId}&pageid=${pageid+1}`;
                $(".next a").attr("href",next);
                if (page!=pageid&&page>1){
                    if(pageid==1){
                       var previous = `./productlist.html?categoryid=${categoryId}&pageid=${pageid}`;
                        $(".previous a").attr("href",previous);
                    }
                    else {
                        var previous =`./productlist.html?categoryid=${categoryId}&pageid=${pageid-1}`;
                        $(".previous a").attr("href",previous);
                    }
                }
                else {
                    if (page==1){
                        var previous = `./productlist.html?categoryid=${categoryId}&pageid=${pageid}`;
                        $(".previous a").attr("href",previous);
                        var next = `./productlist.html?categoryid=${categoryId}&pageid=${pageid}`;
                        $(".next a").attr("href",next);
                    }
                    else {
                    var previous = `./productlist.html?categoryid=${categoryId}&pageid=${pageid-1}`;
                    $(".previous a").attr("href",previous);
                    var next = `./productlist.html?categoryid=${categoryId}&pageid=${pageid}`;
                    $(".next a").attr("href",next);
                    }
                }
            }
        }
    })
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}