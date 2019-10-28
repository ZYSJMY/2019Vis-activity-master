$(function() {
    var html = document.getElementsByTagName('html')[0];
    //屏幕的宽度（兼容处理）
    var w = $(window).width();
    //750这个数字是根据你的设计图的实际大小来的，所以值具体根据设计图的大小
    html.style.fontSize = w / 3.75 + "px";
})

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}

var id = getQueryString("id")
var E = window.wangEditor
var editor = new E('.jieshao')
var thumbValue

//ios 去掉alert url
window.alert = function(name) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}

var dateNow = new Date().getDate();
$(document).on("click", ".upbutton", function() {
    dateSave = new Date().getDate();
    // 第一天点击
    if (!localStorage.dateNow) {
        localStorage.setItem("dateNow", dateNow)
            // 第二天
    } else if (localStorage.dateNow != dateSave) {
        localStorage.setItem("Principal", "0")
        localStorage.setItem("dateNow", dateSave)
    }
    if (Principal()) {
        alert("投票成功")
        thumbValue++ // 赞数++
        $.ajax({
            type: "POST",
            data: { exhibitorId: id },
            url: changeUrl.address + "/CommonApi/thumb_up.do",
            success: function(res) {
                if (res.code == 0) {
                    if (thumbValue >= 10000) {
                        thum_ = String(thumbValue / 10000)
                        thumb_Num = thum_.substring(0, thum_.length - 3) + " 万"
                        $(".dianji").find(".zan_num").html(thumb_Num) // 赞数
                    } else {
                        thumb_Num = thumbValue
                        $(".dianji").find(".zan_num").html(thumb_Num) // 赞数
                    }
                } else {
                    alert("投票人数过多，请刷新本页重新投票！！！")
                }
            }
        })
    } else {
        alert("每天只能投五票，请您明天再来！")
    }
})

function Principal() {
    if (!localStorage.Principal) {
        localStorage.setItem("Principal", "0")
    }
    localStorage.Principal++

        if (localStorage.Principal > 5) {
            localStorage.setItem("Principal", "5")
            return false
        } else {
            return true
        }
}

$(".top_img").click(function() {
    window.location.href = changeUrl.imgurl + "/nsi-event/2019Vis-activity/exhibitor_Principal.html"
})

function loading2() {
    $("body").fadeIn(2000)
    $('body').loading({
        loadingWidth: 168,
        title: '',
        name: 'test',
        discription: '加载中',
        direction: 'column',
        type: 'origin',
        originDivWidth: 40,
        originDivHeight: 40,
        originWidth: 6,
        originHeight: 6,
        smallLoading: false,
        loadingMaskBg: 'rgba(0,0,0,0.2)'
    });
    $.ajax({
        type: "get",
        data: { exhibitorId: id },
        url: changeUrl.address + "/manager/exhibitor/detail.do",
        success: function(res) {
            console.log(res)
            editor.create()
            editor.txt.html(res.data.textDesc)
            editor.$textElem.attr('contenteditable', false)
            thumbValue = res.data.thumbValue
            if (res.data.thumbValue >= 10000) {
                thum_Num = String(res.data.thumbValue / 10000)
                thumbValueNum = thum_Num.substring(0, thum_Num.length - 3) + " 万"
                $(".dianji").find(".zan_num").html(thumbValueNum) // 赞数
            } else {
                thumbValueNum = res.data.thumbValue
                $(".dianji").find(".zan_num").html(thumbValueNum) // 赞数
            }
            $(".content_main").find(".left_img img").attr('src', res.data.logoIcon) // logo
            $(".content_main").find(".right_text .exhibitorName").html(res.data.exhibitorName) // 公司名称
            $(".intro").html(res.data.intro)
            setTimeout(function() {
                removeLoading('test');
            }, 1500)

        }
    })

}
loading2()