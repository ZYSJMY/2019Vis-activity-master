$(document).on("click", ".content_main", function() {
    var id = $(this).find(".right_text").data("id")
    window.location.href = changeUrl.imgurl + "/nsi-event/2019Vis-activity/details_School.html?id=" + id
})

//ios 去掉alert url
window.alert = function(name) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}

$.ajax({
    type: "get",
    data: { type: "学校", pageNum: "1", pageSize: 30 },
    url: changeUrl.address + "/manager/exhibitor/list.do",
    success: function(res) {
        var data = res.data.list
        for (var i in data) {
            var html =
                '<div class = "content_main">' +
                '<div class = "left_img" >' +
                '<img class="img_one" src = "' + data[i].logoIcon + '"/>' +
                '</div> ' +
                '<div class = "right_text" data-id="' + data[i].id + '" >' +
                '<div class="fot">' +
                '<span class="exhibitorName">' + data[i].exhibitorName + '</span>' +
                '</div> ' +
                '<div class="bot">' +
                '<span class="intro" >' + data[i].intro + '</span>' +
                '<span class="boothNum">得票：' + data[i].thumbValue + '</span>' +
                '</div>' +
                '</div> ' +
                '</div>'
            $(".main").append(html)
        }
        $(".main .content_main").eq(0).find(".left_img").append('<img class="img_two" src="./images/jin.png"/>')
        $(".main .content_main").eq(1).find(".left_img").append('<img class="img_two" src="./images/yin.png"/>')
        $(".main .content_main").eq(2).find(".left_img").append('<img class="img_two" src="./images/tong.png"/>')
        $(".main .content_main").eq(3).find(".left_img").append('<img class="img_two" src="./images/4.png"/>')
        $(".main .content_main").eq(4).find(".left_img").append('<img class="img_two" src="./images/5.png"/>')
        $(".main .content_main").eq(5).find(".left_img").append('<img class="img_two" src="./images/6.png"/>')
        $(".main .content_main").eq(6).find(".left_img").append('<img class="img_two" src="./images/7.png"/>')
        $(".main .content_main").eq(7).find(".left_img").append('<img class="img_two" src="./images/8.png"/>')
        $(".main .content_main").eq(8).find(".left_img").append('<img class="img_two" src="./images/9.png"/>')
        $(".main .content_main").eq(9).find(".left_img").append('<img class="img_two" src="./images/10.png"/>')
    }
})

//学校
$(".school").click(function() {
    location.reload();
})

//校长
$(".principal").click(function() {
    window.location.href = changeUrl.imgurl + "/nsi-event/2019Vis-activity/exhibitor_Principal.html"
})

//服务商
$(".mechanism").click(function() {
    alert("十强供应商评选 暂未开始")
        // window.location.href = changeUrl.imgurl + "/nsi-event/2019Vis-activity/exhibitor_mechanism.html"
})


$(".top_img,.tiaozhuan").click(function() {
    window.location.href = changeUrl.imgurl + "/nsi-event/2019Vis-activity/index.html"
})

$(function() {
    var html = document.getElementsByTagName('html')[0];
    //屏幕的宽度（兼容处理）
    var w = $(window).width();
    //750这个数字是根据你的设计图的实际大小来的，所以值具体根据设计图的大小
    html.style.fontSize = w / 3.75 + "px";
})