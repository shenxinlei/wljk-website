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

    // //VoLTE注册用户数
    // $("#number").change(function() {
    // 	var n1 = parseFloat($('#number').val());
    // 	console.log(n1);
    // 	if (!n1) {
    // 		console.log("不是合法的数字");
    // 		$("#numberbd").html("不是合法的数字").css("color","#ef5b9c");
    // 		return false;
    // 	}
    // 	console.log(typeof n1);
    // 	var n2 = $('#numberwd').html();
    // 	var bd = ((n1 - n2) / n2) * 100;
    // 	//console.log(bd);
    // 	var bdoutput = bd.toFixed(2) + '%';
    // 	if (Math.abs(bd) >= 30) {
    // 		$("#numberbd").html(bdoutput).css("color","red");
    // 	}
    // 	else {
    // 		$("#numberbd").html(bdoutput).css("color","black");
    // 	}
    // });

    // //VoLTE话务量
    // $("#traffic").change(function() {
    // 	var n1 = parseFloat($('#traffic').val());
    // 	console.log(n1);
    // 	if (!n1) {
    // 		console.log("不是合法的数字");
    // 		$("#trafficbd").html("不是合法的数字").css("color","#ef5b9c");
    // 		return false;
    // 	}
    // 	console.log(typeof n1);
    // 	var n2 = $('#trafficwd').html();
    // 	var bd = ((n1 - n2) / n2) * 100;
    // 	//console.log(bd);
    // 	var bdoutput = bd.toFixed(2) + '%';
    // 	if (Math.abs(bd) >= 30) {
    // 		$("#trafficbd").html(bdoutput).css("color","red");
    // 	}
    // 	else {
    // 		$("#trafficbd").html(bdoutput).css("color","black");
    // 	}
    // });

    // //	IMS初始注册成功率
    // $("#ims").change(function() {
    // 	var n1 = parseFloat($('#ims').val());
    // 	console.log(n1);
    // 	if (!n1) {
    // 		console.log("不是合法的数字");
    // 		$("#imsbd").html("不是合法的数字").css("color","#ef5b9c");
    // 		return false;
    // 	}
    // 	if (n1 > 100) {
    // 		console.log("大于100了，哥");
    // 		$("#imsbd").html("超过100%了").css("color","#ef5b9c");
    // 		return false;
    // 	}
    // 	console.log(typeof n1);
    // 	//console.log(bd);
    // 	var bdoutput = n1.toFixed(2) + '%';
    // 	if (n1 < 95) {
    // 		$("#imsbd").html(bdoutput).css("color","red");
    // 	}
    // 	else {
    // 		$("#imsbd").html(bdoutput).css("color","black");
    // 	}
    // });

    // //	eSRVCC切换成功率
    // $("#esrvcc").change(function() {
    // 	var n1 = parseFloat($('#esrvcc').val());
    // 	console.log(n1);
    // 	if (!n1) {
    // 		console.log("不是合法的数字");
    // 		$("#esrvccbd").html("不是合法的数字").css("color","#ef5b9c");
    // 		return false;
    // 	}
    // 	if (n1 > 100) {
    // 		console.log("大于100了，哥");
    // 		$("#esrvccbd").html("超过100%了").css("color","#ef5b9c");
    // 		return false;
    // 	}
    // 	console.log(typeof n1);
    // 	//console.log(bd);
    // 	var bdoutput = n1.toFixed(2) + '%';
    // 	if (n1 < 90) {
    // 		$("#esrvccbd").html(bdoutput).css("color","red");
    // 	}
    // 	else {
    // 		$("#esrvccbd").html(bdoutput).css("color","black");
    // 	}
    // });

    // 保存大值班按钮
    $('#saveVolte').on('click', function() {
        var judge = true;
        $("#volteTable input").each(function(){
            console.log($(this).val());
            //先判断是否所有值为非空
            if (!$(this).val()) {
                console.log($(this).val());
                alert("表中有空的格子没填");
                judge = false;
                return false;
            }
            //再判断是否是红色的非法数字，如果都不是红色的，说明就可以提交了
            //console.log($(this).css('color'));
            if ($(this).css('color') == "rgb(255, 0, 0)") {
                console.log($(this).css('color'));
                alert("表中有红色非法的数据，请重新填写正确的数据");
                judge = false;
                return false;
            }
        });

        if (!judge) {
            return false;
        }

        alert("保存成功");

        //最后每次保存成功以后，把保存按钮禁用
        $("#saveVolte").attr("disabled", true);
    });

    // //分析原因的按钮点击
    // $('#analyzeVolte').on('click', function() {
    // 	$("#list").show();
    // });	


    //每次input有变动时，保存大值班应该就重新激活
    $('input').change(function() {
    	
        //var n1 = $(this).val();
        //console.log(n1);
        var input = $(this);  
        var v = $.trim(input.val());  
        //alert("输入值：" + v);  
        var reg = new RegExp("^[0-9]+(.[0-9]{2})?$", "g");  
        if (!reg.test(v)) {  
            alert("请输入一个数字，如果是小数，必须有两位！");  
            input.css("color", "red");  
            $("#saveVolte").attr("disabled", true);
        }  
        else {
            input.css("color", "#3D9140");
            $("#saveVolte").attr("disabled", false);
        }

    });
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