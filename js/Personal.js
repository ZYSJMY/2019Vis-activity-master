$(function() {
    var height = $(window).height()
    $(document.body).css("min-height", height)
})

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}
var phone = (getQueryString("phone"));
if (phone == null || phone == "") {
    //wechatId 是手机号
    if (localStorage["wechatId"] == null || localStorage["wechatId"] == undefined) {
        cover.style.display = "block"; //显示遮罩层
        modal.style.display = "block"; //显示弹出层
    } else {
        $(".text_phone span").html("用户手机号：" + localStorage["wechatId"] + "&nbsp;&nbsp;&nbsp;")
        $(".text_phone a").html("切换账号")
        vis_list(localStorage["wechatId"])
    }
} else {
    $(".text_phone span").html("用户手机号：" + phone + "&nbsp;&nbsp;&nbsp;")
    $(".text_phone a").html("切换账号")
    vis_list(phone)
}
//切换手机号
$("#qiehuan").click(function() {
    cover.style.display = "block"; //显示遮罩层
    modal.style.display = "block"; //显示弹出层
})
var waitTime = 60;

function time(ele) {
    if (waitTime == 0) {
        ele.disabled = false;
        ele.innerHTML = "获取验证码";
        waitTime = 60; // 恢复计时
    } else {
        ele.disabled = true;
        ele.innerHTML = waitTime + "秒后重新发送";
        waitTime--;
        setTimeout(function() {
            time(ele) // 关键处-定时循环调用
        }, 1000)
    }
}
// 获取验证码
$("#Code_btn").click(function() {
    var myreg = /^[1][3,4,5,7,8,6,1,2,9][0-9]{9}$/;
    if ($("input[name=tel]").val() == "") {
        $.message({
            message: "手机号不能为空！",
            type: 'warning',
            duration: 2000,
            showClose: false,
            center: false,
        });
        return false;
    } else if (!myreg.test($("input[name=tel]").val())) {
        $.message({
            message: "手机号格式不正确，请正确输入!",
            type: 'warning',
            duration: 2000,
            showClose: false,
            center: false,
        });　　
        return false;
    } else {
        //验证码
        time(this);
        var mobile = $("input[name=tel]").val()
        $.ajax({
            type: "post",
            async: true,
            dataType: "json",
            url: changeUrl.address + '/CommonApi/sendSms.do?mobile=' + mobile,
            success: function(data) {}
        })
    }
})

$("#sub").click(function() {
    var myreg = /^[1][3,4,5,7,8,6,1,2,9][0-9]{9}$/;
    if ($("input[name=tel]").val() == "") {
        $.message({
            message: "手机号不能为空！",
            type: 'warning',
            duration: 2000,
            showClose: false,
            center: false,
        });
        return false;
    } else if (!myreg.test($("input[name=tel]").val())) {
        $.message({
            message: "手机号格式不正确，请正确输入!",
            type: 'warning',
            duration: 2000,
            showClose: false,
            center: false,
        });　　
        return false;
    }
    if ($("input[name=code]").val() == "") {
        $.message({
            message: "验证码不能为空！",
            type: 'warning',
            duration: 2000,
            showClose: false,
            center: false,
        });
        return false;
    } else {
        var mobile = $("input[name=tel]").val()
        var code = $("input[name=code]").val()
        $.ajax({
            type: "post",
            async: true,
            dataType: "json",
            url: changeUrl.address + '/CommonApi/check_code.do?mobile=' + mobile + '&code=' + code,
            success: function(data) {
                console.log(data)
                if (data.code == 0) {
                    window.location.href = changeUrl.imgurl + "/nsi-event/2019Vis-activity/personal.html?phone=" + mobile
                } else {
                    $.message({
                        message: data.msg,
                        type: 'warning',
                        duration: 2000,
                        showClose: false,
                        center: false,
                    });
                    return false;
                }
            }
        })
    }
})


//请求数据
function vis_list(wechatId) {
    $.ajax({
        type: "POST",
        data: {
            "phone": wechatId
        },
        url: changeUrl.address + '/activity/vis_list_byPhone.do',
        success: function(data) {
            console.log(data)
            if (data.code == 0) {
                var data = data.data
                console.log(data)
                if (data == "") {
                    $(".dingdan").css("display", "block")
                    $(".main").css("display", "none")
                    $(".text_phone span").css("display", "none")
                    $(".text_phone a").css("display", "none")
                } else {
                    for (var i in data) {
                        var buyerMessagesplitlist = data[i].ticketType
                        var arr = buyerMessagesplitlist.split("-");
                        var buyerMessagesplit = arr.pop()
                        var html = '<hr>' +
                            ' <div>' +
                            '<div  class="main_list_one main_list_d  main_list_one' + i + '">' +
                            '<h4 title="' + data[i].name + '" class="pull-left pull_name"><span>' + data[i].name + '</span> <span id="' + data[i].entryId + '" class="main_span main_span' + i + '" data-phone="' + data[i].phone + '" data-creattime="' + data[i].createTime + '" data-order="' + data[i].orderNo + '">' + buyerMessagesplit + '</span>' +
                            '</h4>' +
                            '<button type="button" class="btn btn-primary pull-right">查看电子门票</button>' +
                            '</div>' +
                            '<p class="text-muted piao' + i + '"></p>' +
                            '<p class="text-muted time"> <span class="time_data' + i + '">时间：</span><span class="border-left"></span>北京昆泰酒店<a href="#"  title="' + data[i].totalPrice + '" class="invoice invoice_hide' + i + '" data-order="' + data[i].orderNo + '" data-phone="' + data[i].phone + '"  style="float:right;text-decoration: underline;">申请发票</a></p>' +
                            '</div>'
                        $(".main_list").append(html)
                        if (buyerMessagesplit == "尊享票") {
                            $(".main_span" + i).css("background-color", "#33619d")
                            $(".piao" + i).html("尊享票权益：9 - 10 日全天会议、 茶歇、 午餐、 2019 年报告、 2019 年会刊")
                            $(".time_data" + i).html("时间：2019-11-09")
                        }
                        if (buyerMessagesplit == "贵宾票") {
                            $(".main_span" + i).css("background-color", "#522491")
                            $(".piao" + i).html("贵宾票权益：8 日闭门会议(限100人)、 8 日社交晚宴、 9 - 10 日全天会议及VIP席位、 茶歇、 午餐、 2019 年报告、 2019 年会刊")
                            $(".time_data" + i).html("时间：2019-11-08")
                        }
                        if (data[i].type != "vis2019") {
                            $(".invoice_hide" + i).html(data[i].statusDesc)
                            $(".invoice_hide" + i).css("text-decoration", "none")
                            $(".invoice_hide" + i).removeClass("invoice")
                        }
                        if (data[i].statusDesc == "审核中") {
                            $(".main_list_one" + i).removeClass("main_list_d")
                            $(".invoice_hide" + i).css("color", "red")
                            $(".main_list_one" + i).find("button").attr("disabled", true)
                        }
                        if (data[i].statusDesc == "已审核") {
                            $(".invoice_hide" + i).css("color", "green")
                        }
                    }
                }

            }
        }
    })
}


$(document).on('click', ".main_list_d", function() {
    var nameval = $(this).find(".pull_name").attr("title")
    var ID = $(this).find(".main_span").attr("id")
    var main_span = $(this).find(".main_span").html()
    var phonex = $(this).find(".main_span").data("phone")
    var creattime = $(this).find(".main_span").data("creattime")
    var orderNo = $(this).find(".main_span").data("order")
    window.location.href = encodeURI(changeUrl.imgurl + "/nsi-event/2019Vis-activity/success.html?name=" + nameval + "&id=" + ID + "&main_span=" + main_span + "&phone=" + phonex + "&creattime=" + creattime + "&orderNo=" + orderNo)
})
$(document).on('click', ".invoice", function() {
    var orderNo = $(this).data("order")
    var phone = $(this).data("phone")
    var totalPrice = $(this).attr("title")

    //判断是否开过发票
    $.ajax({
        type: "get",
        url: changeUrl.address + '/Invoice/check_invoice.do?orderNo=' + orderNo,
        success: function(data) {
            console.log(data)
            if (data.code == 1) {
                $.message({
                    message: "您已申请过发票了哦",
                    type: 'success',
                    duration: 2000,
                    showClose: false,
                    center: false,
                });
            } else {
                window.location.href = changeUrl.imgurl + "/nsi-event/2019Vis-activity/invoice.html?orderNo=" + orderNo + "&totalPrice=" + totalPrice + "&phone=" + phone
            }
        }
    })


})
$(".top_img").click(function() {
    window.location.href = changeUrl.imgurl + "/nsi-event/2019Vis-activity/index.html"
})


$("#cover1").click(function() {
    cover1.style.display = "none"; //隐藏遮罩层
    modal1.style.display = "none"; //隐藏弹出层
})