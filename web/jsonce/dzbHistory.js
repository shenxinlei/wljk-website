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

    //时间段自定义选项
    $("#range").change(function(){ 
        var p1 = $(this).children('option:selected').val();//这就是selected的值 
        if (p1 == 7) {
            $(".form1-range").show();
        }
        else {
            $(".form1-range").hide();
        }
    }); 

    //在线查询按钮
    $("#inquire").on("click", function() {
        //ajax去后台查询，查询到了结果之后，传回到前端
        $("#form1").ajaxSubmit({
            type: "post",
            data: $(this).formSerialize(),
            success: function(responseText, statusText) {
                //
            }
        });
        //查询出结果以后就显示到前端
        $("#kpiOverall").show();
        
        return false;
    });

    //导出按钮
    $("#derive").on("click", function() {
        //直接去后端生成一个excel，根据用户选择的日期和KPI类型
        //我用Unix时间戳生成一个随机数字，保证excel文件名不重复
        var date = new Date();
        var s = date.getTime();
        //下面的href就是生成的excel存放的相对路径
        $("#form1").append("<br><a class='btn btn-alert' href='./tables/新监控大值班报表.xls'><i class='glyphicon glyphicon-folder-open icon-white'></i> 大值班KPI-" + s + ".xls</a>");
        
    });

    //日期选择期初始化
    $('.form_date').datetimepicker({
        format:'yyyy-mm-dd',
        language:  'zh-CN',
        weekStart: 0,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,//2代表月份
        minView: 2,//2代表月份
        forceParse: 0
    });
    
    //书签初始化函数
    $('#myTab a:first').tab('show');
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });


    //原因分析按钮 cmnet
    $("#btn-cmnet-20170301").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "无"
        });
    });
    $("#btn-cmnet-20170302").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "无"
        });
    });
    $("#btn-cmnet-20170303").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "无"
        });
    });
    $("#btn-cmnet-20170304").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "无"
        });
    });
    $("#btn-cmnet-20170305").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。<br>1、CMNET地市入流量为763.55TB，与上月周日参考值661.01 TB比较，增加102.54TB，增幅15.51%。较前一天增加44.21TB，增幅6.15%，较上周同期增加15.73TB，增幅2.10%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。"
        });
    });

    //原因分析按钮 volte
    $("#btn-volte-20170301").click(function (e) {
        $.alert({
            title: '原因分析',
            content: '上海网络运行正常，无影响业务的故障发生。<br>1、VoLTE注册用户数为107.95万户，与上月工作日参考值80.23万户比较，增加27.72万户，增幅34.55%。较前一天减少0.65万户，降幅0.60%，较上周同期增加14.97万户，增幅16.10%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>2、VoLTE话务量为100.26万erl，与上月工作日参考值72.34万erl比较，增加27.92万erl，增幅38.59%。较前一天减少19.13万erl，降幅16.02%，较上周同期增加4.15万erl，增幅4.32%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。'
        });
    });
    $("#btn-volte-20170302").click(function (e) {
        $.alert({
            title: '原因分析',
            content: '上海网络运行正常，无影响业务的故障发生。<br>1、VoLTE注册用户数为106.30万户，与上月工作日参考值80.23万户比较，增加26.07万户，增幅32.50%。较前一天减少1.65万户，降幅1.53%，较上周同期增加10.16万户，增幅10.57%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>2、VoLTE话务量为114.78万erl，与上月工作日参考值72.34万erl比较，增加42.44万erl，增幅58.66%。较前一天增加14.52万erl，增幅14.48%，较上周同期增加14.86万erl，增幅14.87%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。'
        });
    });
    $("#btn-volte-20170303").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。<br>1、VoLTE注册用户数为107.22万户，与上月工作日参考值80.23万户比较，增加26.99万户，增幅33.64%。较前一天增加0.92万户，增幅0.86%，较上周同期增加7.76万户，增幅7.80%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>2、VoLTE话务量为116.07万erl，与上月工作日参考值72.34万erl比较，增加43.73万erl，增幅60.44%。较前一天增加1.29万erl，增幅1.12%，较上周同期增加11.54万erl，增幅11.04%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。"
        });
    });
    console.log("v26");
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