function docReady() {
    //datatable
    $('.datatable').dataTable({
        "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'i><'col-md-12 center-block'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "每页 _MENU_ 条记录",
            "sProcessing": "处理中...",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
    });

    /***
        先从数据库判断，如果数据库里已经有数据了，就要直接把书签显示出来
        这一步交给老蒋了
    ***/

    //excel文件上传
    $('#file_upload').uploadify({
        'swf': 'misc/uploadify.swf',
        'uploader': 'misc/uploadify.php',
        'buttonText':'选择上传的文件',
        'onUploadSuccess' : function(file,data,response) {
            //判断名字是否一致，一致就把大×改为钩
            if (file.name == "新监控大值班报表.xls") {
                $("#graph1").removeClass("glyphicon-remove").addClass("glyphicon-ok");
                $("#button1").removeClass("btn-default").addClass("btn-primary");
            }
            if (file.name == "eMSC性能报表.xls") {
                $("#graph2").removeClass("glyphicon-remove").addClass("glyphicon-ok");
                $("#button2").removeClass("btn-default").addClass("btn-primary");
            }
            if (file.name == "VoLTE SBC关键性能报表.xls") {
                $("#graph3").removeClass("glyphicon-remove").addClass("glyphicon-ok");
                $("#button3").removeClass("btn-default").addClass("btn-primary");
            }
            if (file.name == "S-CSCF关键性能报表.xls") {
                $("#graph4").removeClass("glyphicon-remove").addClass("glyphicon-ok");
                $("#button4").removeClass("btn-default").addClass("btn-primary");
            }
            if (file.name == "TD-LTE网络性能指标统计报表.xls") {
                $("#graph5").removeClass("glyphicon-remove").addClass("glyphicon-ok");
                $("#button5").removeClass("btn-default").addClass("btn-primary");
            }
            if (file.name == "GSM B表日统计粒度.xls") {
                $("#graph6").removeClass("glyphicon-remove").addClass("glyphicon-ok");
                $("#button6").removeClass("btn-default").addClass("btn-primary");
            }
            if (file.name == "GSM B表晚忙时报表.xls") {
                $("#graph7").removeClass("glyphicon-remove").addClass("glyphicon-ok");
                $("#button7").removeClass("btn-default").addClass("btn-primary");
            }
            if (file.name == "GSM B表早忙时报表.xls") {
                $("#graph8").removeClass("glyphicon-remove").addClass("glyphicon-ok");
                $("#button8").removeClass("btn-default").addClass("btn-primary");
            }
            if ($("#button1").hasClass("btn-primary") &&
                $("#button2").hasClass("btn-primary") &&
                $("#button3").hasClass("btn-primary") &&
                $("#button4").hasClass("btn-primary") &&
                $("#button5").hasClass("btn-primary") ) {
                $("#calculatedzb").removeClass("btn-primary").addClass("btn-success");
            }
        }
    });

    //书签初始化函数
    $('#myTab a:first').tab('show');
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    //按钮“所有文件上传成功后点击生成数据”
    $("#calculatedzb").click(function(e) {
        e.preventDefault();
        $("#kpiOverall").show();
        //在这里我们模拟数据导入，这4个数据是我们自己瞎编的，真实情况下，应该从导入的excel中提取
        $("#number").val("120.44").trigger("change");
        $("#ims").val("97.29").trigger("change");
        $("#traffic").val("129.25").trigger("change");
        $("#esrvcc").val("93.77").trigger("change");
    });


    /***
        这里一段是VolTE的数据记录
    ***/
    //这里定义一个docReady函数内的全局变量reason
    //这是一个字符串，当做原因分析时，这个变量会被改写
    var reason = "上海网络运行正常，无影响业务的故障发生。";
    //这4个布尔变量为了判定哪些指标超标，用来坐分析的，初始为false
    var number = false;
    var traffic = false;
    var ims = false;
    var esrvcc = false;

    //VoLTE注册用户数
    $("#number").change(function() {
    	var n1 = parseFloat($('#number').val());
    	if (!n1) {
    		console.log("不是合法的数字");
    		$("#numberbd").html("不是合法的数字").css("color","#ef5b9c");
    		return false;
    	}
    	var n2 = $('#numberwd').html();
    	var bd = ((n1 - n2) / n2) * 100;
    	var bdoutput = bd.toFixed(2) + '%';
    	if (Math.abs(bd) >= 30) {
            number = true;
    		$("#numberbd").html(bdoutput).css("color","red");
    	}
    	else {
            number = false;
    		$("#numberbd").html(bdoutput).css("color","black");
    	}
        $('#number').val(n1.toFixed(2));
    });

    //VoLTE话务量
    $("#traffic").change(function() {
    	var n1 = parseFloat($('#traffic').val());
    	if (!n1) {
    		console.log("不是合法的数字");
    		$("#trafficbd").html("不是合法的数字").css("color","#ef5b9c");
    		return false;
    	}
    	var n2 = $('#trafficwd').html();
    	var bd = ((n1 - n2) / n2) * 100;
    	var bdoutput = bd.toFixed(2) + '%';
    	if (Math.abs(bd) >= 30) {
            traffic = true;
    		$("#trafficbd").html(bdoutput).css("color","red");
    	}
    	else {
            traffic = false;
    		$("#trafficbd").html(bdoutput).css("color","black");
    	}
        $('#traffic').val(n1.toFixed(2));
    });

    //	IMS初始注册成功率
    $("#ims").change(function() {
    	var n1 = parseFloat($('#ims').val());
    	if (!n1) {
    		console.log("不是合法的数字");
    		$("#imsbd").html("不是合法的数字").css("color","#ef5b9c");
    		return false;
    	}
    	if (n1 > 100) {
    		console.log("大于100了，哥");
    		$("#imsbd").html("超过100%了").css("color","#ef5b9c");
    		return false;
    	}
    	var bdoutput = n1.toFixed(2) + '%';
    	if (n1 < 95) {
            ims = true;
    		$("#imsbd").html(bdoutput).css("color","red");
    	}
    	else {
            ims = false;
    		$("#imsbd").html(bdoutput).css("color","black");
    	}
        $('#ims').val(n1.toFixed(2));
    });

    //	eSRVCC切换成功率
    $("#esrvcc").change(function() {
    	var n1 = parseFloat($('#esrvcc').val());
    	if (!n1) {
    		console.log("不是合法的数字");
    		$("#esrvccbd").html("不是合法的数字").css("color","#ef5b9c");
    		return false;
    	}
    	if (n1 > 100) {
    		console.log("大于100了，哥");
    		$("#esrvccbd").html("超过100%了").css("color","#ef5b9c");
    		return false;
    	}
    	var bdoutput = n1.toFixed(2) + '%';
    	if (n1 < 90) {
            esrvcc = true;
    		$("#esrvccbd").html(bdoutput).css("color","red");
    	}
    	else {
            esrvcc = false;
    		$("#esrvccbd").html(bdoutput).css("color","black");
    	}
        $('#esrvcc').val(n1.toFixed(2));
    });

    // 按钮--保存大值班数据
    $('#saveVolte').on('click', function() {
    	//先判断是否4个值都正确填写
    	var n1 = parseFloat($('#number').val());
    	console.log(n1);
    	if (!n1) {
    		alert("VoLTE注册用户数是非法数据，不能提交到数据库");
    		return false;
    	}
    	var n2 = parseFloat($('#traffic').val());
    	console.log(n2);
    	if (!n2) {
    		alert("VoLTE话务量是非法数据，不能提交到数据库");
    		return false;
    	}
    	var n3 = parseFloat($('#ims').val());
    	console.log(n3);
    	if (!n3) {
    		alert("IMS初始注册成功率是非法数据，不能提交到数据库");
    		return false;
    	}
    	if (n3 > 100 || n3 <= 0) {
    		alert("IMS初始注册成功率是非法数据，不能提交到数据库");
    		return false;
    	}
    	var n4 = parseFloat($('#esrvcc').val());
    	console.log(n4);
    	if (!n4) {
    		alert("eSRVCC切换成功率是非法数据，不能提交到数据库");
    		return false;
    	}
    	if (n4 > 100 || n4 <= 0) {
    		alert("eSRVCC切换成功率是非法数据，不能提交到数据库");
    		return false;
    	}
    	//再ajax提交到后台
      	//都成功以后，就可以启用数据分析按钮，
      	//每次保存以后，如果没有改动，那么保存按钮就应该禁用
      	// $("#analyzeVolte").attr("disabled", false);
      	$("#saveVolte").attr("disabled", true);
        $("#saveVolte").removeClass("btn-danger").addClass("btn-success");
        $("#saveVolte").text("已保存");
    });

    //按钮--分析超标原因
    $('#analyzeVolte').on('click', function() {
        //在分析原因按钮点击以后，应该直接后台保存原因至数据库，防止用户忘记保存
        reason = "上海网络运行正常，无影响业务的故障发生。";
        var count = 1;
        if (number == true) {
            reason += "&#13;&#10;"+count+"、VoLTE注册用户数为xx万户，与上月周中参考值xx万户比较，增加xx万户，增幅xx%。较前一天减少xx万户，降幅xx%，较上周同期增加xx万户，增幅xx%。用户行为引起，网络侧无异常。";
            count++;
        }
        if (ims == true) {
            reason += "&#13;&#10;"+count+"、IMS初始注册成功率低于门限，稍后将以邮件形式补报集团。"
            count++;
        }
        if (traffic == true) {
            reason += "&#13;&#10;"+count+"、VoLTE话务量为xx万erl，与上月周日参考值xx万erl比较，增加xx万erl，增幅xx%。较前一天减少xx万erl，降幅xx%，较上周同期增加xx万erl，增幅xx%。用户行为引起，网络侧无异常。";
            count++;
        }
        if (esrvcc == true) {
            reason += "&#13;&#10;"+count+"、eSRVCC切换成功率低于门限，稍后将以邮件形式补报集团。"
            count++;
        }
        $("#reason").html(reason);
    	$("#list").show();
        //加上这段代码目的是，如果用户又点了一次分析超标原因，save按钮会跳不回去，所以要人工让其跳回去
        $('#saveReason').attr("disabled", false).removeClass("btn-success").addClass("btn-danger").text("保存原因至数据库");
    });	

    //按钮--保存原因至数据库
    $('#saveReason').click(function (e){
        e.preventDefault();
        $(this).text('已保存').removeClass("btn-danger").addClass("btn-success").attr("disabled", true);
        //发送ajax到后端，保存数据
    });

    //每次input有变动时，保存大值班应该就重新激活
    $('.volte').change(function() {
    	$("#saveVolte").attr("disabled", false);
        $("#saveVolte").removeClass("btn-success").addClass("btn-danger");
        $("#saveVolte").text("保存大值班数据");
    });
    //每次textarea有变动时，保存原因至数据库就重新激活
    $('#reason').change(function() {
        $('#saveReason').attr("disabled", false).removeClass("btn-success").addClass("btn-danger").text("保存原因至数据库");
    });


    /***
        下面开始重复的工作了，先是cmnet
    ***/
    var cmnetReason = "上海网络运行正常，无影响业务的故障发生。";
    var cmnetTraffic = false;
    //Cmnet地市入流量
    $("#cmnet-traffic").change(function() {
        var n1 = parseFloat($('#cmnet-traffic').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#cmnet-traffic-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        var n2 = $('#cmnet-traffic-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) >= 15) {
            cmnetTraffic = true;
            $("#cmnet-traffic-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            cmnetTraffic = false;
            $("#cmnet-traffic-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#cmnet-traffic').val(n1.toFixed(2));
    });   
    // Cmnet按钮--保存大值班数据
    $('#saveCmnet').on('click', function() {
        //先判断是否每个值都正确填写
        var n1 = parseFloat($('#cmnet-traffic').val());
        console.log(n1);
        if (!n1) {
            alert("CMNET地市入流量是非法数据，不能提交到数据库");
            return false;
        }
        //再ajax提交到后台
        //都成功以后，就可以启用数据分析按钮，
        //每次保存以后，如果没有改动，那么保存按钮就应该禁用
        //如果有改动过，那么保存按钮应该回到初始状态
        $("#saveCmnet").attr("disabled", true);
        $("#saveCmnet").removeClass("btn-danger").addClass("btn-success");
        $("#saveCmnet").text("已保存");
    });
    // Cmnet按钮--分析超标原因
    $('#analyzeCmnet').on('click', function() {
        //在分析原因按钮点击以后，应该直接后台保存原因至数据库，防止用户忘记保存
        cmnetReason = "上海网络运行正常，无影响业务的故障发生。";
        var count = 1;
        //当某一数据波动超门限的时候，就分析原因，模版如下：
        if (cmnetTraffic == true) {
            cmnetReason += "&#13;&#10;"+count+"、CMNET地市入流量为xxTB，与上月周日参考值xxTB比较，增加xxTB，增幅xx%。较前一天增加xxTB，增幅xx%，较上周同期增加xxTB，增幅xx%。主要是由于。。。";
            count++;
        }
        $("#cmnet-reason").html(cmnetReason);
        $("#cmnet-list").show();
        //每次点分析按钮，都要让保存按钮重新回过来
        $('#saveCmnetReason').attr("disabled", false).removeClass("btn-success").addClass("btn-danger").text("保存原因至数据库");
    }); 
    // Cmnet按钮--保存原因至数据库
    $('#saveCmnetReason').click(function (e){
        e.preventDefault();
        $(this).text('已保存').removeClass("btn-danger").addClass("btn-success").attr("disabled", true);
        //发送ajax到后端，保存数据
    });
    //每次Cmnet输入的input有变动时，保存大值班应该就重新激活
    $('.cmnet').change(function() {
        $("#saveCmnet").attr("disabled", false);
        $("#saveCmnet").removeClass("btn-success").addClass("btn-danger");
        $("#saveCmnet").text("保存大值班数据");
    });
    //每次textarea有变动时，保存原因至数据库就重新激活
    $('#cmnet-reason').change(function() {
        $('#saveCmnetReason').attr("disabled", false).removeClass("btn-success").addClass("btn-danger").text("保存原因至数据库");
    });

    /***
        接下去做TD的数据表
    ***/








    
}

//additional functions for data table
$.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
    return {
        "iStart": oSettings._iDisplayStart,
        "iEnd": oSettings.fnDisplayEnd(),
        "iLength": oSettings._iDisplayLength,
        "iTotal": oSettings.fnRecordsTotal(),
        "iFilteredTotal": oSettings.fnRecordsDisplay(),
        "iPage": Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
        "iTotalPages": Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
    };
};
$.extend($.fn.dataTableExt.oPagination, {
    "bootstrap": {
        "fnInit": function (oSettings, nPaging, fnDraw) {
            var oLang = oSettings.oLanguage.oPaginate;
            var fnClickHandler = function (e) {
                e.preventDefault();
                if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                    fnDraw(oSettings);
                }
            };

            $(nPaging).addClass('pagination').append(
                '<ul class="pagination">' +
                    '<li class="prev disabled"><a href="#">&larr; ' + oLang.sPrevious + '</a></li>' +
                    '<li class="next disabled"><a href="#">' + oLang.sNext + ' &rarr; </a></li>' +
                    '</ul>'
            );
            var els = $('a', nPaging);
            $(els[0]).bind('click.DT', { action: "previous" }, fnClickHandler);
            $(els[1]).bind('click.DT', { action: "next" }, fnClickHandler);
        },

        "fnUpdate": function (oSettings, fnDraw) {
            var iListLength = 5;
            var oPaging = oSettings.oInstance.fnPagingInfo();
            var an = oSettings.aanFeatures.p;
            var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

            if (oPaging.iTotalPages < iListLength) {
                iStart = 1;
                iEnd = oPaging.iTotalPages;
            }
            else if (oPaging.iPage <= iHalf) {
                iStart = 1;
                iEnd = iListLength;
            } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                iStart = oPaging.iTotalPages - iListLength + 1;
                iEnd = oPaging.iTotalPages;
            } else {
                iStart = oPaging.iPage - iHalf + 1;
                iEnd = iStart + iListLength - 1;
            }

            for (i = 0, iLen = an.length; i < iLen; i++) {
                // remove the middle elements
                $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                // add the new list items and their event handlers
                for (j = iStart; j <= iEnd; j++) {
                    sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                    $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                        .insertBefore($('li:last', an[i])[0])
                        .bind('click', function (e) {
                            e.preventDefault();
                            oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                            fnDraw(oSettings);
                        });
                }

                // add / remove disabled classes from the static elements
                if (oPaging.iPage === 0) {
                    $('li:first', an[i]).addClass('disabled');
                } else {
                    $('li:first', an[i]).removeClass('disabled');
                }

                if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                    $('li:last', an[i]).addClass('disabled');
                } else {
                    $('li:last', an[i]).removeClass('disabled');
                }
            }
        }
    }
});