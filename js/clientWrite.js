$(function() {
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
            //邮箱
            var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
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
            if ($("input[name=position]").val() == "") {
                $.message({
                    message: "职位不能为空！",
                    type: 'warning',
                    duration: 2000,
                    showClose: false,
                    center: false,
                });
                return false;
            } else {
                var positionval = $("input[name=position]").val()
            }
            if ($("input[name=mailbox]").val() == "") {
                $.message({
                    message: "邮箱不能为空！",
                    type: 'warning',
                    duration: 2000,
                    showClose: false,
                    center: false,
                });
                return false;
            } else if (!reg.test($("input[name=mailbox]").val())) {
                $.message({
                    message: "邮箱格式不正确，请正确输入!",
                    type: 'warning',
                    duration: 2000,
                    showClose: false,
                    center: false,
                });
                return false;
            } else {
                var mailboxval = $("input[name=mailbox]").val()
            }
            //单选框
            if ($('input[type="radio"]:checked').length != 0) {
                var radio = $("input[name=radio]")
                var radiovalue = ''; //radiovalue为radio中选中的值
                for (var i = 0; i < radio.length; i++) {
                    if (radio[i].checked == true) {
                        radiovalue = radio[i].value;
                        break;
                    }
                }
            } else {
                $.message({
                    message: "是否公开信息需要选择",
                    type: 'warning',
                    duration: 2000,
                    showClose: false,
                    center: false,
                });
                return false;
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
                            //下拉框
                            var options = $("#test option:selected");
                            var optionsval = options.val()
                            var Data = "name=" + userval + "&company=" + schoolval + "&position=" + positionval + "&mail=" + mailboxval + "&phone=" + telval + "&option01=" + checkboxval + "&ispublic=" + radiovalue + "&attendno=" + optionsval + "&type=vis2019"
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
                                        window.location.href = encodeURI(changeUrl.imgurl + "/nsi-event/2019Vis-activity/purchase.html?name=" + userval + "&company=" + schoolval + "&phone=" + telval + "&id=" + ID)
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
$(function() {
    var height = $(window).height()
    $(document.body).css("min-height", height)
})