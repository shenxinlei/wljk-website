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
    	if (Math.abs(bd) > 30) {
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
    	if (Math.abs(bd) > 30) {
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

        //每一次保存都让进度前向走20%
        var pb = $('#progress-bar');
        var pbValue = parseInt(pb.attr('data-transitiongoal'));
        console.log(pbValue);
        pbValue += 20;
        pb.attr('data-transitiongoal', pbValue).progressbar({display_text: 'fill'});
    });

    //按钮--分析超标原因
    $('#analyzeVolte').on('click', function() {
        //在分析原因按钮点击以后，应该直接后台保存原因至数据库，防止用户忘记保存
        reason = "上海网络运行正常，无影响业务的故障发生。";
        var count = 1;
        if (number == true) {
            reason += "\r\n"+count+"、VoLTE注册用户数为xx万户，与上月周中参考值xx万户比较，增加xx万户，增幅xx%。较前一天减少xx万户，降幅xx%，较上周同期增加xx万户，增幅xx%。用户行为引起，网络侧无异常。";
            count++;
        }
        if (ims == true) {
            reason += "\r\n"+count+"、IMS初始注册成功率低于门限，稍后将以邮件形式补报集团。"
            count++;
        }
        if (traffic == true) {
            reason += "\r\n"+count+"、VoLTE话务量为xx万erl，与上月周日参考值xx万erl比较，增加xx万erl，增幅xx%。较前一天减少xx万erl，降幅xx%，较上周同期增加xx万erl，增幅xx%。用户行为引起，网络侧无异常。";
            count++;
        }
        if (esrvcc == true) {
            reason += "\r\n"+count+"、eSRVCC切换成功率低于门限，稍后将以邮件形式补报集团。"
            count++;
        }
        $("#reason").val(reason);
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
        if ($("#saveVolte").hasClass('btn-success')) {
            var pb = $('#progress-bar');
            var pbValue = parseInt(pb.attr('data-transitiongoal'));
            pbValue -= 20;
            pb.attr('data-transitiongoal', pbValue).progressbar({display_text: 'fill'});
        }
        
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
        if (Math.abs(bd) > 15) {
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

        //每一次保存都让进度前向走20%
        var pb = $('#progress-bar');
        var pbValue = parseInt(pb.attr('data-transitiongoal'));
        console.log(pbValue);
        pbValue += 20;
        pb.attr('data-transitiongoal', pbValue).progressbar({display_text: 'fill'});
    });
    // Cmnet按钮--分析超标原因
    $('#analyzeCmnet').on('click', function() {
        //在分析原因按钮点击以后，应该直接后台保存原因至数据库，防止用户忘记保存
        cmnetReason = "上海网络运行正常，无影响业务的故障发生。";
        var count = 1;
        //当某一数据波动超门限的时候，就分析原因，模版如下：
        if (cmnetTraffic == true) {
            cmnetReason += "\r\n"+count+"、CMNET地市入流量为xxTB，与上月周日参考值xxTB比较，增加xxTB，增幅xx%。较前一天增加xxTB，增幅xx%，较上周同期增加xxTB，增幅xx%。主要是由于。。。";
            count++;
        }
        $("#cmnet-reason").val(cmnetReason);
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
        if ($("#saveCmnet").hasClass('btn-success')) {
            var pb = $('#progress-bar');
            var pbValue = parseInt(pb.attr('data-transitiongoal'));
            pbValue -= 20;
            pb.attr('data-transitiongoal', pbValue).progressbar({display_text: 'fill'});
        }


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
    var tdReason = "上海网络运行正常，无影响业务的故障发生。";
    var tdNumber = false;
    var tdVoiceTraffic = false;
    var tdVideoTraffic = false;
    var tdPackageTraffic = false;
    //VLR中TD-SCDMA网络位置区下存储的用户数
    $("#td-number").change(function() {
        var n1 = parseFloat($('#td-number').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#td-number-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        var n2 = $('#td-number-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) > 10) {
            tdNumber = true;
            $("#td-number-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            tdNumber = false;
            $("#td-number-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#td-number').val(n1.toFixed(2));
    }); 
    //TD系统语音话务量(RNC)
    $("#td-voiceTraffic").change(function() {
        var n1 = parseFloat($('#td-voiceTraffic').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#td-voiceTraffic-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        var n2 = $('#td-voiceTraffic-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) > 30) {
            tdVoiceTraffic = true;
            $("#td-voiceTraffic-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            tdVoiceTraffic = false;
            $("#td-voiceTraffic-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#td-voiceTraffic').val(n1.toFixed(2));
    }); 
    //TD系统视频话务量(RNC)
    $("#td-videoTraffic").change(function() {
        var n1 = parseFloat($('#td-videoTraffic').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#td-videoTraffic-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        //这里是weekday还是saturday还是sunday需要再判断的
        var n2 = $('#td-videoTraffic-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) > 50) {
            tdVideoTraffic = true;
            $("#td-videoTraffic-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            tdVideoTraffic = false;
            $("#td-videoTraffic-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#td-videoTraffic').val(n1.toFixed(2));
    });
    //TD系统分组域业务流量(RNC)
    $("#td-packageTraffic").change(function() {
        var n1 = parseFloat($('#td-packageTraffic').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#td-packageTraffic-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        //这里是weekday还是saturday还是sunday需要再判断的
        var n2 = $('#td-packageTraffic-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) > 50) {
            tdPackageTraffic = true;
            $("#td-packageTraffic-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            tdPackageTraffic = false;
            $("#td-packageTraffic-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#td-packageTraffic').val(n1.toFixed(2));
    });
    // td按钮--保存大值班数据
    $('#saveTd').on('click', function() {
        //先判断是否每个值都正确填写
        var n1 = parseFloat($('#td-number').val());
        console.log(n1);
        if (!n1) {
            alert("VLR中TD-SCDMA网络位置区下存储的用户数是非法数据，不能提交到数据库");
            return false;
        }
        var n2 = parseFloat($('#td-voiceTraffic').val());
        console.log(n2);
        if (!n2) {
            alert("TD系统语音话务量(RNC)是非法数据，不能提交到数据库");
            return false;
        }
        var n3 = parseFloat($('#td-videoTraffic').val());
        console.log(n3);
        if (!n3) {
            alert("TD系统视频话务量(RNC)是非法数据，不能提交到数据库");
            return false;
        }
        var n4 = parseFloat($('#td-packageTraffic').val());
        console.log(n4);
        if (!n4) {
            alert(" TD系统分组域业务流量(RNC)是非法数据，不能提交到数据库");
            return false;
        }      
        //再ajax提交到后台
        //都成功以后，就可以启用数据分析按钮，
        //每次保存以后，如果没有改动，那么保存按钮就应该禁用
        //如果有改动过，那么保存按钮应该回到初始状态
        $("#saveTd").attr("disabled", true);
        $("#saveTd").removeClass("btn-danger").addClass("btn-success");
        $("#saveTd").text("已保存");

        //每一次保存都让进度前向走20%
        var pb = $('#progress-bar');
        var pbValue = parseInt(pb.attr('data-transitiongoal'));
        console.log(pbValue);
        pbValue += 20;
        pb.attr('data-transitiongoal', pbValue).progressbar({display_text: 'fill'});
    });
    //td按钮--分析超标原因
    $('#analyzeTd').on('click', function() {
        //在分析原因按钮点击以后，应该直接后台保存原因至数据库，防止用户忘记保存
        tdReason = "上海网络运行正常，无影响业务的故障发生。";
        var count = 1;
        //当某一数据波动超门限的时候，就分析原因，模版如下：
        if (tdNumber == true) {
            tdReason += "\r\n"+count+"、VLR中TD-SCDMA网络位置区下存储的用户数为xx万户，与上月工作日参考值xx万户比较，减少xx万户，降幅xx%。较前一天增加xx万户，增幅xx%，较上周同期减少xx万户，降幅xx%。TD用户数基数较小，易受业务推广影响产生较大波动，网络侧无异常，属正常波动。";
            count++;
        }
        if (tdVoiceTraffic == true) {
            tdReason += "\r\n"+count+"、TD系统语音话务量(RNC)为xx万爱尔兰，与上月工作日参考值xx万爱尔兰比较，减少xx万爱尔兰，降幅xx%。较前一天增加xx万爱尔兰，增幅xx%，较上周同期减少xx万爱尔兰，降幅xx%。TD用户数基数较小，易受业务推广影响产生较大波动，网络侧无异常，属正常波动。";
            count++;
        }
        if (tdVideoTraffic == true) {
            tdReason += "\r\n"+count+"、TD系统视频话务量(RNC))为xx爱尔兰，与上月工作日参考值xx爱尔兰比较，减少xx爱尔兰，降幅xx%。较前一天增加xx爱尔兰，增幅xx%，较上周同期减少xx爱尔兰，降幅xx%。TD用户数基数较小，易受业务推广影响产生较大波动，网络侧无异常，属正常波动。";
            count++;
        }
        if (tdPackageTraffic == true) {
            tdReason += "\r\n"+count+"、TD系统分组域业务流量(RNC)为xxGBYTE，与上月工作日参考值xxGBYTE比较，减少xxGBYTE，降幅xx%。较前一天增加xxGBYTE，增幅xx%，较上周同期减少xxGBYTE，降幅xx%。TD用户数基数较小，易受业务推广影响产生较大波动，网络侧无异常，属正常波动。";
            count++;
        }
        $("#td-list").show();
        $("#td-reason").val(tdReason);
        //每次点分析按钮，都要让保存按钮重新回过来
        $('#saveTdReason').attr("disabled", false).removeClass("btn-success").addClass("btn-danger").text("保存原因至数据库");
    }); 
    // td按钮--保存原因至数据库
    $('#saveTdReason').click(function (e){
        e.preventDefault();
        $(this).text('已保存').removeClass("btn-danger").addClass("btn-success").attr("disabled", true);
        //发送ajax到后端，保存数据
    });
    //每次td输入的input有变动时，保存大值班应该就重新激活
    $('.td').change(function() {
        if ($("#saveTd").hasClass('btn-success')) {
            var pb = $('#progress-bar');
            var pbValue = parseInt(pb.attr('data-transitiongoal'));
            pbValue -= 20;
            pb.attr('data-transitiongoal', pbValue).progressbar({display_text: 'fill'});
        }
        $("#saveTd").attr("disabled", false);
        $("#saveTd").removeClass("btn-success").addClass("btn-danger");
        $("#saveTd").text("保存大值班数据");
    });
    //每次textarea有变动时，保存原因至数据库就重新激活
    $('#td-reason').change(function() {
        $('#saveTdReason').attr("disabled", false).removeClass("btn-success").addClass("btn-danger").text("保存原因至数据库");
    });

    /***

        接着做LTE的数据

    ***/
    var lteReason = "上海网络运行正常，无影响业务的故障发生。";
    var lteTraffic = false;
    var lteNumber = false;
    var lteWcp = false;
    var lteWlp = false;
    var lteAttach = false;
    // 吞吐量
    $("#lte-traffic").change(function() {
        var n1 = parseFloat($('#lte-traffic').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#lte-traffic-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        var n2 = $('#lte-traffic-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) >= 25) {
            lteTraffic = true;
            $("#lte-traffic-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            lteTraffic = false;
            $("#lte-traffic-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#lte-traffic').val(n1.toFixed(2));
    }); 
    //MME用户数
    $("#lte-number").change(function() {
        var n1 = parseFloat($('#lte-number').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#lte-number-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        var n2 = $('#lte-number-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) > 15) {
            lteNumber = true;
            $("#lte-number-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            lteNumber = false;
            $("#lte-number-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#lte-number').val(n1.toFixed(2));
    }); 
    //无线接通率
    $("#lte-wcp").change(function() {
        var n1 = parseFloat($('#lte-wcp').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#lte-wcp-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        if (n1 > 100) {
            $("#lte-wcp-fluctuate").html("超过100%了").css("color","#ef5b9c");
            return false;
        }
        if (n1 < 0) {
            $("#lte-wcp-fluctuate").html("小于0%了").css("color","#ef5b9c");
            return false;
        }
        //这里是weekday还是saturday还是sunday需要再判断的
        var n2 = $('#lte-wcp-weekday').html();
        var bd = n1 - n2;
        //计算波动的数值
        var bdoutput = bd.toFixed(2);
        if (Math.abs(bd) > 0.5) {
            lteWcp = true;
            $("#lte-wcp-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            lteWcp = false;
            $("#lte-wcp-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#lte-wcp').val(n1.toFixed(2));
    });
    //无线掉线率
    $("#lte-wlp").change(function() {
        var n1 = parseFloat($('#lte-wlp').val());
        if (!n1) {
            $("#lte-wlp-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        if (n1 > 100) {
            $("#lte-wlp-fluctuate").html("超过100%了").css("color","#ef5b9c");
            return false;
        }
        if (n1 < 0) {
            $("#lte-wlp-fluctuate").html("小于0%了").css("color","#ef5b9c");
            return false;
        }
        //这里是weekday还是saturday还是sunday需要再判断的
        var n2 = $('#lte-wlp-weekday').html();
        var bd = n1 - n2;
        //计算波动的数值
        var bdoutput = bd.toFixed(2);
        if (Math.abs(bd) > 0.5) {
            lteWlp = true;
            $("#lte-wlp-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            lteWlp = false;
            $("#lte-wlp-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#lte-wlp').val(n1.toFixed(2));
    });
    //排除用户原因附着成功率
    $("#lte-attach").change(function() {
        var n1 = parseFloat($('#lte-attach').val());
        if (!n1) {
            $("#lte-attach-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        if (n1 > 100) {
            $("#lte-attach-fluctuate").html("超过100%了").css("color","#ef5b9c");
            return false;
        }
        if (n1 < 0) {
            $("#lte-attach-fluctuate").html("小于0%了").css("color","#ef5b9c");
            return false;
        }
        //这里是weekday还是saturday还是sunday需要再判断的
        var n2 = $('#lte-attach-weekday').html();
        var bd = n1 - n2;
        //计算波动的数值
        var bdoutput = bd.toFixed(2);
        if (Math.abs(bd) > 0.5) {
            lteAttach = true;
            $("#lte-attach-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            lteAttach = false;
            $("#lte-attach-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#lte-attach').val(n1.toFixed(2));
    });
    // lte按钮--保存大值班数据
    $('#saveLte').on('click', function() {
        //先判断是否每个值都正确填写
        var n1 = parseFloat($('#lte-traffic').val());
        console.log(n1);
        if (!n1) {
            alert("吞吐量是非法数据，不能提交到数据库");
            return false;
        }
        var n2 = parseFloat($('#lte-number').val());
        console.log(n2);
        if (!n2) {
            alert(" MME用户数是非法数据，不能提交到数据库");
            return false;
        }
        var n3 = parseFloat($('#lte-wcp').val());
        console.log(n3);
        if (!n3) {
            alert("无线接通率是非法数据，不能提交到数据库");
            return false;
        }
        if (n3 > 100 || n3 < 0) {
            alert("无线接通率超过100%或低于0%了，不能提交到数据库");
            return false;
        }
        var n4 = parseFloat($('#lte-wlp').val());
        console.log(n4);
        if (!n4) {
            alert("无线掉线率是非法数据，不能提交到数据库");
            return false;
        }
        if (n4 > 100 || n4 < 0) {
            alert("无线掉线率超过100%或低于0%了，不能提交到数据库");
            return false;
        }    
        var n5 = parseFloat($('#lte-attach').val());
        console.log(n5);
        if (!n5) {
            alert("排除用户原因附着成功率是非法数据，不能提交到数据库");
            return false;
        }
        if (n5 > 100 || n5 <= 0) {
            alert("排除用户原因附着成功率超过100%或低于0%了，不能提交到数据库");
            return false;
        }  
        //再ajax提交到后台
        //都成功以后，就可以启用数据分析按钮，
        //每次保存以后，如果没有改动，那么保存按钮就应该禁用
        //如果有改动过，那么保存按钮应该回到初始状态
        $("#saveLte").attr("disabled", true);
        $("#saveLte").removeClass("btn-danger").addClass("btn-success");
        $("#saveLte").text("已保存");

        //每一次保存都让进度前向走20%
        var pb = $('#progress-bar');
        var pbValue = parseInt(pb.attr('data-transitiongoal'));
        console.log(pbValue);
        pbValue += 20;
        pb.attr('data-transitiongoal', pbValue).progressbar({display_text: 'fill'});
    });
    //lte按钮--分析超标原因
    $('#analyzeLte').on('click', function() {
        //在分析原因按钮点击以后，应该直接后台保存原因至数据库，防止用户忘记保存
        lteReason = "上海网络运行正常，无影响业务的故障发生。";
        var count = 1;

        //当某一数据波动超门限的时候，就分析原因，模版如下：
        if (lteTraffic == true) {
            lteReason += "\r\n"+count+"、吞吐量为xxTB，与上月工作日参考值xxTB比较，增加xxTB，增幅xx%。较前一天增加xxTB，增幅xx%，较上周同期增加xxTB，增幅xx%。主要是用户行为引起，网络侧无故障。";
            count++;
        }
        if (lteNumber == true) {
            lteReason += "\r\n"+count+"、MME用户数为xx万户，与上月工作日参考值xx万户比较，增加xx万户，增幅xx%。较前一天增加xx万户，增幅xx%，较上周同期增加xx万户，增幅xx%。属4G业务推广所致的正常现象。";
            count++;
        }
        if (lteWcp == true) {
            lteReason += "\r\n"+count+"、无线接通率为xx%，与上月工作日参考值xx%比较，减少xx%，波动超门限。原因稍后将以邮件形式补报集团。";
            count++;
        }
        if (lteWlp == true) {
            lteReason += "\r\n"+count+"、无线掉线率为xx%，与上月工作日参考值xx%比较，增加xx%，波动超门限。原因稍后将以邮件形式补报集团。";
            count++;
        }
        if (lteAttach == true) {
            lteReason += "\r\n"+count+"、排除用户原因附着成功率为xx%，与上月工作日参考值xx%比较，减少xx%，波动超门限。原因稍后将以邮件形式补报集团。";
            count++;
        }
        $("#lte-list").show();
        $("#lte-reason").val(lteReason);
        //每次点分析按钮，都要让保存按钮重新回过来
        $('#saveLteReason').attr("disabled", false).removeClass("btn-success").addClass("btn-danger").text("保存原因至数据库");
    }); 
    // lte按钮--保存原因至数据库
    $('#saveLteReason').click(function (e){
        e.preventDefault();
        $(this).text('已保存').removeClass("btn-danger").addClass("btn-success").attr("disabled", true);
        //发送ajax到后端，保存数据
    });
    //每次lte输入的input有变动时，保存大值班应该就重新激活
    $('.lte').change(function() {
        if ($("#saveLte").hasClass('btn-success')) {
            var pb = $('#progress-bar');
            var pbValue = parseInt(pb.attr('data-transitiongoal'));
            pbValue -= 20;
            pb.attr('data-transitiongoal', pbValue).progressbar({display_text: 'fill'});
        }
        $("#saveLte").attr("disabled", false);
        $("#saveLte").removeClass("btn-success").addClass("btn-danger");
        $("#saveLte").text("保存大值班数据");
    });
    //每次textarea有变动时，保存原因至数据库就重新激活
    $('#lte-reason').change(function() {
        $('#saveLteReason').attr("disabled", false).removeClass("btn-success").addClass("btn-danger").text("保存原因至数据库");
    });

    /***

        量最大的GSM KPI数据来了

    ***/
    var gsmReason = "上海网络运行正常，无影响业务的故障发生。";
    var gsmCaixin = false;
    var gsmCaixinWcp = false;
    var gsmDuanxin = false;
    var gsmDuanxinWcp = false;
    var gsmTraffic = false;
    var gsmDayTraffic = false;
    var gsmNightTraffic = false;
    var gsm6rushhourwlp = false;
    var gsm6rushhourwlpcap = false;
    var gsmPackageTraffic = false;
    //国内彩信发送总条数
    $("#gsm-caixin").change(function() {
        var n1 = parseFloat($('#gsm-caixin').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#gsm-caixin-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        var n2 = $('#gsm-caixin-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) > 10) {
            gsmCaixin = true;
            $("#gsm-caixin-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            gsmCaixin = false;
            $("#gsm-caixin-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#gsm-caixin').val(n1.toFixed(2));
    }); 
    //国内彩信网络接通率
    $("#gsm-caixin-wcp").change(function() {
        var n1 = parseFloat($('#gsm-caixin-wcp').val());
        if (!n1) {
            $("#gsm-caixin-wcp-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        if (n1 > 100) {
            $("#gsm-caixin-wcp-fluctuate").html("超过100%了").css("color","#ef5b9c");
            return false;
        }
        if (n1 < 0) {
            $("#gsm-caixin-wcp-fluctuate").html("小于0%了").css("color","#ef5b9c");
            return false;
        }
        //这里是weekday还是saturday还是sunday需要再判断的
        var n2 = $('#gsm-caixin-wcp-weekday').html();
        var bd = n1 - n2;
        //计算波动的数值
        var bdoutput = bd.toFixed(2);
        if (Math.abs(bd) > 0.1) {
            gsmCaixinWcp = true;
            $("#gsm-caixin-wcp-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            gsmCaixinWcp = false;
            $("#gsm-caixin-wcp-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#gsm-caixin-wcp').val(n1.toFixed(2));
    });        
    //短信全天条数
    $("#gsm-duanxin").change(function() {
        var n1 = parseFloat($('#gsm-duanxin').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#gsm-duanxin-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        var n2 = $('#gsm-duanxin-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) > 10) {
            gsmDuanxin = true;
            $("#gsm-duanxin-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            gsmDuanxin = false;
            $("#gsm-duanxin-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#gsm-duanxin').val(n1.toFixed(2));
    }); 
    //短信全程接通率
    $("#gsm-duanxin-wcp").change(function() {
        var n1 = parseFloat($('#gsm-duanxin-wcp').val());
        if (!n1) {
            $("#gsm-duanxin-wcp-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        if (n1 > 100) {
            $("#gsm-duanxin-wcp-fluctuate").html("超过100%了").css("color","#ef5b9c");
            return false;
        }
        if (n1 < 0) {
            $("#gsm-duanxin-wcp-fluctuate").html("小于0%了").css("color","#ef5b9c");
            return false;
        }
        //这里是weekday还是saturday还是sunday需要再判断的
        var n2 = $('#gsm-duanxin-wcp-weekday').html();
        var bd = n1 - n2;
        //计算波动的数值
        var bdoutput = bd.toFixed(2);
        if (Math.abs(bd) > 0.1) {
            gsmDuanxinWcp = true;
            $("#gsm-duanxin-wcp-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            gsmDuanxinWcp = false;
            $("#gsm-duanxin-wcp-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#gsm-duanxin-wcp').val(n1.toFixed(2));
    }); 
    //gsm全天话务量
    $("#gsm-traffic").change(function() {
        var n1 = parseFloat($('#gsm-traffic').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#gsm-traffic-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        var n2 = $('#gsm-traffic-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) > 5) {
            gsmTraffic = true;
            $("#gsm-traffic-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            gsmTraffic = false;
            $("#gsm-traffic-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#gsm-traffic').val(n1.toFixed(2));
    }); 
    //gsm早忙时话务量
    $("#gsm-day-traffic").change(function() {
        var n1 = parseFloat($('#gsm-day-traffic').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#gsm-day-traffic-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        var n2 = $('#gsm-day-traffic-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) > 5) {
            gsmDayTraffic = true;
            $("#gsm-day-traffic-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            gsmDayTraffic = false;
            $("#gsm-day-traffic-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#gsm-day-traffic').val(n1.toFixed(2));
    }); 
    //gsm晚忙时话务量
    $("#gsm-night-traffic").change(function() {
        var n1 = parseFloat($('#gsm-night-traffic').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#gsm-night-traffic-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        var n2 = $('#gsm-night-traffic-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) > 5) {
            gsmNightTraffic = true;
            $("#gsm-night-traffic-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            gsmNightTraffic = false;
            $("#gsm-night-traffic-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#gsm-night-traffic').val(n1.toFixed(2));
    }); 
    //6忙时掉话率
    $("#gsm-6rushhour-wlp").change(function() {
        var n1 = parseFloat($('#gsm-6rushhour-wlp').val());
        if (!n1) {
            $("#gsm-6rushhour-wlp-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        if (n1 < 0) {
            $("#gsm-6rushhour-wlp-fluctuate").html("小于0%了").css("color","#ef5b9c");
            return false;
        }
        //这里是weekday还是saturday还是sunday需要再判断的
        var n2 = $('#gsm-6rushhour-wlp-weekday').html();
        var bd = n1 - n2;
        //计算波动的数值
        var bdoutput = bd.toFixed(2);
        if (Math.abs(bd) > 0.1) {
            gsm6rushhourwlp = true;
            $("#gsm-6rushhour-wlp-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            gsm6rushhourwlp = false;
            $("#gsm-6rushhour-wlp-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#gsm-6rushhour-wlp').val(n1.toFixed(2));
    }); 
    //省会城市6忙时掉话率
    $("#gsm-6rushhour-wlp-cap").change(function() {
        var n1 = parseFloat($('#gsm-6rushhour-wlp-cap').val());
        if (!n1) {
            $("#gsm-6rushhour-wlp-cap-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        if (n1 < 0) {
            $("#gsm-6rushhour-wlp-cap-fluctuate").html("小于0%了").css("color","#ef5b9c");
            return false;
        }
        //这里是weekday还是saturday还是sunday需要再判断的
        var n2 = $('#gsm-6rushhour-wlp-cap-weekday').html();
        var bd = n1 - n2;
        //计算波动的数值
        var bdoutput = bd.toFixed(2);
        if (Math.abs(bd) > 0.1) {
            gsm6rushhourwlpcap = true;
            $("#gsm-6rushhour-wlp-cap-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            gsm6rushhourwlpcap = false;
            $("#gsm-6rushhour-wlp-cap-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#gsm-6rushhour-wlp-cap').val(n1.toFixed(2));
    }); 
    //2G分组域流量
    $("#gsm-package-traffic").change(function() {
        var n1 = parseFloat($('#gsm-package-traffic').val());
        if (!n1) {
            console.log("不是合法的数字");
            $("#gsm-package-traffic-fluctuate").html("不是合法的数字").css("color","#ef5b9c");
            return false;
        }
        var n2 = $('#gsm-package-traffic-weekday').html();
        var bd = ((n1 - n2) / n2) * 100;
        //计算波动的数值
        var bdoutput = bd.toFixed(2) + '%';
        if (Math.abs(bd) > 8) {
            gsmPackageTraffic = true;
            $("#gsm-package-traffic-fluctuate").html(bdoutput).css("color","red");
        }
        else {
            gsmPackageTraffic = false;
            $("#gsm-package-traffic-fluctuate").html(bdoutput).css("color","black");
        }
        //主要是为了把小数点都统一到保留2位
        $('#gsm-package-traffic').val(n1.toFixed(2));
    }); 
    // gsm按钮--保存大值班数据
    $('#saveGsm').on('click', function() {
        //先判断是否每个值都正确填写
        var n1 = parseFloat($('#gsm-caixin').val());
        console.log(n1);
        if (!n1) {
            alert("国内彩信发送总条数是非法数据，不能提交到数据库");
            return false;
        }
        var n2 = parseFloat($('#gsm-caixin-wcp').val());
        console.log(n2);
        if (!n2) {
            alert("国内彩信网络接通率是非法数据，不能提交到数据库");
            return false;
        }
        if (n2 > 100 || n2 < 0) {
            alert("国内彩信网络接通率超过100%或低于0%了，不能提交到数据库");
            return false;
        }
        var n3 = parseFloat($('#gsm-duanxin').val());
        console.log(n3);
        if (!n3) {
            alert("短信全天总条数是非法数据，不能提交到数据库");
            return false;
        }
        var n4 = parseFloat($('#gsm-duanxin-wcp').val());
        console.log(n4);
        if (!n4) {
            alert("短信全程接通率是非法数据，不能提交到数据库");
            return false;
        }
        if (n4 > 100 || n4 < 0) {
            alert("短信全程接通率超过100%或低于0%了，不能提交到数据库");
            return false;
        }
        var n5 = parseFloat($('#gsm-traffic').val());
        console.log(n5);
        if (!n5) {
            alert("全天话务量是非法数据，不能提交到数据库");
            return false;
        }
        var n6 = parseFloat($('#gsm-day-traffic').val());
        console.log(n6);
        if (!n6) {
            alert("早忙时话务量是非法数据，不能提交到数据库");
            return false;
        }
        var n7 = parseFloat($('#gsm-night-traffic').val());
        console.log(n7);
        if (!n7) {
            alert("晚忙时话务量是非法数据，不能提交到数据库");
            return false;
        }
        var n8 = parseFloat($('#gsm-6rushhour-wlp').val());
        console.log(n8);
        if (!n8) {
            alert("6忙时掉话率是非法数据，不能提交到数据库");
            return false;
        }
        if (n8 > 100 || n8 <= 0) {
            alert("6忙时掉话率超过100%或低于0%了，不能提交到数据库");
            return false;
        }  
        var n9 = parseFloat($('#gsm-6rushhour-wlp-cap').val());
        console.log(n9);
        if (!n9) {
            alert("省会城市6忙时掉话率是非法数据，不能提交到数据库");
            return false;
        }
        if (n9 > 100 || n9 <= 0) {
            alert("省会城市6忙时掉话率超过100%或低于0%了，不能提交到数据库");
            return false;
        }  
        var n10 = parseFloat($('#gsm-package-traffic').val());
        console.log(n10);
        if (!n10) {
            alert("2G分组域流量是非法数据，不能提交到数据库");
            return false;
        }
        //再ajax提交到后台
        //都成功以后，就可以启用数据分析按钮，
        //每次保存以后，如果没有改动，那么保存按钮就应该禁用
        //如果有改动过，那么保存按钮应该回到初始状态
        $("#saveGsm").attr("disabled", true);
        $("#saveGsm").removeClass("btn-danger").addClass("btn-success");
        $("#saveGsm").text("已保存");

        //每一次保存都让进度前向走20%
        var pb = $('#progress-bar');
        var pbValue = parseInt(pb.attr('data-transitiongoal'));
        console.log(pbValue);
        pbValue += 20;
        pb.attr('data-transitiongoal', pbValue).progressbar({display_text: 'fill'});
    });
    // gsm按钮--分析超标原因
    $('#analyzeGsm').on('click', function() {
        //在分析原因按钮点击以后，应该直接后台保存原因至数据库，防止用户忘记保存
        gsmReason = "上海网络运行正常，无影响业务的故障发生。";
        var count = 1;
        //当某一数据波动超门限的时候，就分析原因，模版如下：
        if (gsmCaixin == true) {
            gsmReason += "\r\n"+count+"、上海移动彩信业务总量（MO+AO）为xx万条，与上月工作日参考值xx万条比较，增加xx万条，增幅xx%。较前一天增加xx万条，增幅xx%，较上周同期增加xx万条，增幅xx%。其中MO总业务量增长了xx万条，增长了xx%；AO总业务量减少了xx万条，减少了xx%，其中。。。";
            count++;
        }
        if (gsmCaixinWcp == true) {
            gsmReason += "\r\n"+count+"、国内彩信网络接通率为xx%，与上月工作日参考值xx%比较，减少了xx%，波动超门限。原因将稍后以邮件形式补报集团。";
            count++;
        }
        if (gsmDuanxin == true) {
            gsmReason += "\r\n"+count+"、上海移动短信业务总量（MO+AO）为xx亿条，与上月周日参考值xx亿条比较，增加xx亿条，增幅xx%。较前一天增加xx亿条，增幅xx%，较上周同期减少xx亿条，降幅xx%。其中MO总业务量增长了xx万条，增长了xx%、AO总业务量增长了xx万条，增长了xx%。其中。。。";
            count++;
        }
        if (gsmDuanxinWcp == true) {
            gsmReason += "\r\n"+count+"、短信全程接通率为xx%，与上月工作日参考值xx%比较，减少了xx%，波动超门限。原因将稍后以邮件形式补报集团。";
            count++;
        }
        if (gsmTraffic == true) {
            gsmReason += "\r\n"+count+"、全天话务量为xx万ERL，与上月工作日参考值xx万ERL比较，增加xx万ERL，增幅xx%。较前一天减少xx万ERL，降幅xx%，较上周同期减少xx万ERL，降幅xx%。主要是由于全天VLR用户总数xx人，比上月工作日均值xx人，增幅xx%；系统试呼总次数xx次，比上月工作日均值xx次，增幅xx%。";
            count++;
        }
        if (gsmDayTraffic == true) {
            gsmReason += "\r\n"+count+"、早忙时话务量为xx万ERL，与上月工作日参考值xx万ERL比较，增加xx万ERL，增幅xx%。较前一天减少xx万ERL，降幅xx%，较上周同期减少xx万ERL，降幅xx%。主要是由于早忙时VLR用户总数xx人，比上月工作日均值xx人，增幅xx%；系统试呼总次数xx次，比上月工作日均值xx次，增幅xx%。";
            count++;
        }
        if (gsmNightTraffic == true) {
            gsmReason += "\r\n"+count+"、晚忙时话务量为xx万ERL，与上月工作日参考值xx万ERL比较，增加xx万ERL，增幅xx%。较前一天减少xx万ERL，降幅xx%，较上周同期减少xx万ERL，降幅xx%。主要是由于晚忙时VLR用户总数xx人，比上月工作日均值xx人，增幅xx%；系统试呼总次数xx次，比上月工作日均值xx次，增幅xx%。";
            count++;
        }
        if (gsm6rushhourwlp == true) {
            gsmReason += "\r\n"+count+"、6忙时掉话率为xx%，与上月工作日参考值xx%比较，增加了xx%，波动超门限。原因将稍后以邮件形式补报集团。";
            count++;
        }
        if (gsm6rushhourwlpcap == true) {
            gsmReason += "\r\n"+count+"、省会城市6忙时掉话率为xx%，与上月工作日参考值xx%比较，增加了xx%，波动超门限。原因将稍后以邮件形式补报集团。";
            count++;
        }
        if (gsmPackageTraffic == true) {
            gsmReason += "\r\n"+count+"、2G分组域流量为xxTB，与上月工作日参考值xxTB比较，增加xxTB，增幅xx%。较前一天增加xxTB，增幅xx%，较上周同期增加xxTB，增幅xx%。";
            count++;
        }
        $("#gsm-reason").val(gsmReason);
        $("#gsm-list").show();
        //每次点分析按钮，都要让保存按钮重新回过来
        $('#saveGsmReason').attr("disabled", false).removeClass("btn-success").addClass("btn-danger").text("保存原因至数据库");
        //每次点分析按钮，要让统计字数进行刷新
        var text = $("#gsm-reason").val();
        var count = 1000-text.length;
        if (count < 0) {
            var text = "已超过"+Math.abs(count)+"个字符";
            $("#gsm-count").text(text);
        }
        else {
            var text = "还可以输入"+count+"个字符";
            $("#gsm-count").text(text);
        }
        
    }); 
    //gsm按钮--保存原因至数据库
    $('#saveGsmReason').click(function (e){
        e.preventDefault();
        $(this).text('已保存').removeClass("btn-danger").addClass("btn-success").attr("disabled", true);
        //发送ajax到后端，保存数据
    });
    //每次gsm输入的input有变动时，保存大值班应该就重新激活
    $('.gsm').change(function() {
        //先做个判断，判断保存按钮是否是绿色，是绿色的话，就要修改进度条，回退20%
        if ($("#saveGsm").hasClass('btn-success')) {
            var pb = $('#progress-bar');
            var pbValue = parseInt(pb.attr('data-transitiongoal'));
            pbValue -= 20;
            pb.attr('data-transitiongoal', pbValue).progressbar({display_text: 'fill'});
        }
        $("#saveGsm").attr("disabled", false);
        $("#saveGsm").removeClass("btn-success").addClass("btn-danger");
        $("#saveGsm").text("保存大值班数据");  
    });
    //每次textarea有变动时，保存原因至数据库就重新激活
    $('#gsm-reason').change(function() {
        $('#saveGsmReason').attr("disabled", false).removeClass("btn-success").addClass("btn-danger").text("保存原因至数据库");
    });
    //统计GSM原因分析的字数，集团超过1000个字符会不让填写
    var gsmText = gsmReason;
    var countNumber = 1000-gsmText.length;
    $("#gsm-count-number").text(countNumber);
    $("#gsm-reason").on('blur keyup input', function(){
        var text = $("#gsm-reason").val();
        var count = 1000-text.length;
        if (count < 0) {
            var text = "已超过"+Math.abs(count)+"个字符";
            $("#gsm-count").text(text);
        }
        else {
            var text = "还可以输入"+count+"个字符";
            $("#gsm-count").text(text);
        }
    });
    
    //初始化进度条
    $('.progress .progress-bar').progressbar();  
    
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