$(function() {

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        }
        var inviter_a = (getQueryString("name"));
        if (inviter_a == "wuyue") {
            inviter_name = "吴越"
        } else if (inviter_a == "chengjing") {
            inviter_name = "程静"
        } else if (inviter_a == "qinqiaoyun") {
            inviter_name = "覃巧云"
        } else if (inviter_a == "suhengliang") {
            inviter_name = "苏恒良"
        } else if (inviter_a == "lvmingxin") {
            inviter_name = "吕明鑫"
        } else if (inviter_a == "xuxinmo") {
            inviter_name = "许欣默"
        } else {
            inviter_name = "无"
        }
        console.log(inviter_name)
            //验证码
        var waitTime = 60;
        document.getElementById("Code_btn").onclick = function() {
            time(this);
        }

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
        //获取验证码
        $("#Code_btn").click(function() {
                var mobile = $("input[name=tel]").val()
                $.ajax({
                    type: "post",
                    async: true,
                    dataType: "json",
                    url: changeUrl.address + '/CommonApi/sendSms.do?mobile=' + mobile,
                    success: function(data) {

                    }
                })
            })
            // 判断手机号是否正确
        $("input[name=tel]").keyup(function(event) {
            var phoneNum = $(this).val();
            console.log(phoneNum.length);
            var myreg = /^[1][3,4,5,7,8,6,1,2,9][0-9]{9}$/;
            if (phoneNum.length == 11) {
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
                    $("#Code_btn").attr("disabled", true)　
                    return false;
                }
                $("#Code_btn").attr("disabled", false)
            } else {
                $("#Code_btn").attr("disabled", true)
            }
        })
        var sub = $("#sub")
        sub.on("click", function() {
            //手机号
            var myreg = /^[1][3,4,5,7,8,6,1,2,9][0-9]{9}$/;
            if ($("input[name=user]").val() == "") {
                $.message({
                    message: "姓名不能为空！",
                    type: 'warning',
                    duration: 2000,
                    showClose: false,
                    center: false,
                });
                return false;
            } else {
                var userval = $("input[name=user]").val()
            }
            if ($("input[name=school]").val() == "") {
                $.message({
                    message: "公司或学校不能为空！",
                    type: 'warning',
                    duration: 2000,
                    showClose: false,
                    center: false,
                });
                return false;
            } else {
                var schoolval = $("input[name=school]").val()
            }
            //复选框
            if ($('input[type="checkbox"]:checked').length != 0) {
                var checkbox_array = new Array();
                $('input[type="checkbox"]:checked').each(function() {
                    checkbox_array.push($(this).val()); //向数组中添加元素  
                });
                var checkboxval = checkbox_array.join(','); //将数组元素连接起来以构建一个字符串
            } else {
                $.message({
                    message: "需求至少要选择一项",
                    type: 'warning',
                    duration: 2000,
                    showClose: false,
                    center: false,
                });
                return false;
            }
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
                var telval = $("input[name=tel]").val()
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
                        if (data.code != 0) {
                            $.message({
                                message: data.msg,
                                type: 'warning',
                                duration: 2000,
                                showClose: false,
                                center: false,
                            });
                            return false;
                        } else {
                            var Data = "name=" + (userval + ("(嘉宾)")) + "&company=" + schoolval + "&position=0" + "&mail=0" + "&phone=" + telval + "&option01=" + checkboxval + "&ispublic=0" + "&attendno=1" + "&type=嘉宾"
                            $.ajax({
                                type: "post",
                                data: Data,
                                async: true,
                                dataType: "json",
                                url: changeUrl.address + '/activity/vis_insert.do',
                                success: function(data) {
                                    console.log(data)
                                    if (data.code == 0) {
                                        var ID = data.data
                                        console.log(ID)
                                        zeng(ID, inviter_name, telval)
                                    }
                                },
                            })
                        }
                    }
                })
            }
        })
    })
    // body高度


function zeng(entryId, inviter, telval) {
    var Data = "entryId=" + entryId + "&inviter=" + inviter
    $.ajax({
        type: "post",
        data: Data,
        async: true,
        dataType: "json",
        url: changeUrl.address + '/entryAudit/add.do',
        success: function(data) {
            console.log(data)
            if (data.code == 0) {
                window.location.href = changeUrl.imgurl + "/nsi-event/2019Vis-activity/personal.html?phone=" + telval
            }
        },
    })
}
$(function() {
    var height = $(window).height()
    $(document.body).css("min-height", height)
})