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

    //原因分析按钮 GSM
    $("#btn-gsm-20170301").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。<br>1、2017/03/01上海移动彩信业务总量（MO+AO）为452.18万条，与上月工作日参考值330.05万条比较，增加122.13万条，增幅37.00%。较前一天增加171.37万条，增幅61.03%，较上周同期增加0.82万条，增幅0.18%。其中MO总业务量增长了1.33万条，增长了14.83%；AO总业务量增长了116.53万条，增长了35.81%，其中809428的值为319.06万条，增加134.37%。<br>2、全天话务量为323.22万ERL，与上月工作日参考值265.48万ERL比较，增加57.74万ERL，增幅21.75%。较前一天减少14.59万ERL，降幅4.32%，较上周同期增加15.94万ERL，增幅5.19%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>3、早忙时话务量为24.32万ERL，与上月工作日参考值20.53万ERL比较，增加3.79万ERL，增幅18.46%。较前一天减少0.81万ERL，降幅3.22%，较上周同期增加0.74万ERL，增幅3.14%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>4、晚忙时话务量为23.83万ERL，与上月工作日参考值18.62万ERL比较，增加5.21万ERL，增幅27.98%。较前一天减少1.26万ERL，降幅5.02%，较上周同期增加1.76万ERL，增幅7.97%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>5、2G分组域流量为12.81TB，与上月工作日参考值11.01TB比较，增加1.80TB，增幅16.35%。较前一天减少0.27TB，降幅2.06%，较上周同期减少0.20TB，降幅1.54%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。"
        });
    });
    $("#btn-gsm-20170302").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。话务量及2G分组域流量指标异常主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>1、2017/03/02上海移动彩信业务总量（MO+AO）为261.47万条，与上月工作日参考值330.05万条比较，减少68.58万条，降幅20.78%。较前一天减少190.71万条，降幅42.18%，较上周同期减少6.25万条，降幅2.33%。其中MO总业务量增长了0.82万条，增长了9.16%；AO总业务量减少了73.68万条，减少了22.64%，其中809428的值为114.55万条，减少15.85%，北京无限讯奇信息技术有限公司的值为78.73万条，减少49.74%，卓望手机报的值为59.75万条，减少56.80%。<br>2、全天话务量为320.04万ERL，与上月工作日参考值265.48万ERL比较，增加54.56万ERL，增幅20.55%。较前一天减少3.18万ERL，降幅0.98%，较上周同期增加12.75万ERL，增幅4.15%。<br>3、早忙时话务量为23.92万ERL，与上月工作日参考值20.53万ERL比较，增加3.39万ERL，增幅16.51%。较前一天减少0.40万ERL，降幅1.64%，较上周同期增加0.64万ERL，增幅2.75%。<br>4、晚忙时话务量为23.84万ERL，与上月工作日参考值18.62万ERL比较，增加5.22万ERL，增幅28.03%。较前一天增加0.01万ERL，增幅0.04%，较上周同期增加0.97万ERL，增幅4.24%。<br>5、2G分组域流量为12.54TB，与上月工作日参考值11.01TB比较，增加1.53TB，增幅13.90%。较前一天减少0.27TB，降幅2.11%，较上周同期减少0.54TB，降幅4.13%。"
        });
    });
    $("#btn-gsm-20170303").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。话务量及2G分组域流量指标异常主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>1、2017/03/03上海移动彩信业务总量（MO+AO）为494.03万条，与上月工作日参考值330.05万条比较，增加163.98万条，增幅49.68%。较前一天增加232.56万条，增幅88.94%，较上周同期增加5.84万条，增幅1.20%。其中AO总业务量增长了158.74万条，增长了48.78%，其中801084的值为184.62万条，增加167.35%，木马人的值为4.75万条，增加240.05%，虹软协创的值为0.54万条，增加244.41%。<br>2、全天话务量为327.12万ERL，与上月工作日参考值265.48万ERL比较，增加61.64万ERL，增幅23.22%。较前一天增加7.08万ERL，增幅2.21%，较上周同期增加5.29万ERL，增幅1.64%。主要是由于全天系统试呼总次数195152598次，比上月工作日均值153710876次，增幅26.96%。<br>3、早忙时话务量为24.33万ERL，与上月工作日参考值20.53万ERL比较，增加3.80万ERL，增幅18.51%。较前一天增加0.41万ERL，增幅1.71%，较上周同期增加0.35万ERL，增幅1.46%。主要是由于早忙时系统试呼总次数16128635次，比上月工作日均值13208270次，增幅22.11%。<br>4、晚忙时话务量为24.09万ERL，与上月工作日参考值18.62万ERL比较，增加5.47万ERL，增幅29.38%。较前一天增加0.25万ERL，增幅1.05%，较上周同期增加1.28万ERL，增幅5.61%。主要是由于晚忙时系统试呼总次数11512460次，比上月工作日均值8557701次，增幅34.53%。<br>5、2G分组域流量为12.75TB，与上月工作日参考值11.01TB比较，增加1.74TB，增幅15.80%。较前一天增加0.21TB，增幅1.67%，较上周同期减少0.70TB，降幅5.20%。"
        });
    });
    $("#btn-gsm-20170304").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。话务量及2G分组域流量指标异常主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>1、全天话务量为269.41万ERL，与上月周六参考值240.39万ERL比较，增加29.02万ERL，增幅12.07%。较前一天减少57.71万ERL，降幅17.64%，较上周同期增加1.92万ERL，增幅0.72%。主要是由于全天VLR用户总数20861848人，比上月周六均值19305385人，增幅8.06%；系统试呼总次数159622551次，比上月周六均值142766184次，增幅11.81%。<br>2、早忙时话务量为19.79万ERL，与上月周六参考值17.48万ERL比较，增加2.31万ERL，增幅13.22%。较前一天减少4.54万ERL，降幅18.66%，较上周同期增加0.13万ERL，增幅0.66%。主要是由于早忙时VLR用户总数20790259人，比上月周六均值19230880人，增幅8.11%；系统试呼总次数13133456次，比上月周六均值11816074次，增幅11.15%。<br>3、晚忙时话务量为21.31万ERL，与上月周六参考值18.23万ERL比较，增加3.08万ERL，增幅16.90%。较前一天减少2.78万ERL，降幅11.54%，较上周同期增加0.62万ERL，增幅3.00%。主要是由于晚忙时VLR用户总数20898304人，比上月周六均值19388812人，增幅7.79%；系统试呼总次数9759730次，比上月周六均值8492501次，增幅14.92%。<br>4、2G分组域流量为11.79TB，与上月周六参考值10.90TB比较，增加0.89TB，增幅8.17%。较前一天减少0.96TB，降幅7.53%，较上周同期减少0.30TB，降幅2.48%。"
        });
    });
    $("#btn-gsm-20170305").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。<br>1、2017/03/05上海移动短信业务总量（MO+AO）为1.00亿条，与上月周日参考值0.89亿条比较，增加0.11亿条，增幅12.36%。较前一天增加0.02亿条，增幅2.04%，较上周同期减少0.03亿条，降幅2.91%。其中MO总业务量增长了1万条，增长了0.14%、AO总业务量增长了997万条，增长了12.71%。行业网关增长了661.58万条，增长23.00%，10086网关增长了78.30万条，增长3.00%，梦网网关增长了250.68万条，增长19.00%，彩信2网关增长了3.77万条，增长1.00%，彩信1网关增长了2.99万条，增长1.00%，电信网关增长了7.50万条，增长8.00%，联通网关增长了3.30万条，增长4.00%，DCS网关减少了10.85万条，减少90.00%。<br>2、全天话务量为252.63万ERL，与上月周日参考值210.42万ERL比较，增加42.21万ERL，增幅20.06%。较前一天减少16.78万ERL，降幅6.23%，较上周同期减少3.96万ERL，降幅1.54%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>3、早忙时话务量为17.78万ERL，与上月周日参考值14.93万ERL比较，增加2.85万ERL，增幅19.09%。较前一天减少2.01万ERL，降幅10.16%，较上周同期减少0.66万ERL，降幅3.58%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>4、晚忙时话务量为20.99万ERL，与上月周日参考值16.51万ERL比较，增加4.48万ERL，增幅27.14%。较前一天减少0.32万ERL，降幅1.50%，较上周同期减少0.01万ERL，降幅0.05%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。"
        });
    });

    //原因分析按钮 TD
    $("#btn-td-20170301").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "无"
        });
    });
    $("#btn-td-20170302").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "无"
        });
    });
    $("#btn-td-20170303").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。<br>1、VLR中TD-SCDMA网络位置区下存储的用户数为108.21万户，与上月工作日参考值96.84 万户比较，增加11.37万户，增幅11.74%。较前一天增加7.39万户，增幅7.33%，较上周同期增加19.85万户，增幅22.46%。TD用户数基数较小，易受业务推广影响产生较大波动，网络侧无异常，属正常波动。"
        });
    });
    $("#btn-td-20170304").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "无"
        });
    });
    $("#btn-td-20170305").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "无"
        });
    });

    //原因分析按钮 LTE
    $("#btn-lte-20170301").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。<br>1、MME用户数为1232.28万户，与上月工作日参考值1052.13万户比较，增加180.1505万户，增幅17.12%。较前一天增加0.3346万户，增幅0.03%，较上周同期增加23.4066万户，增幅1.94%。用户数增长，属4G业务推广所致的正常现象。"
        });
    });
    $("#btn-lte-20170302").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "无"
        });
    });
    $("#btn-lte-20170303").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。<br>1、吞吐量为524.74TB，与上月工作日参考值411.21TB比较，增加113.53015TB，增幅27.61%。较前一天增加26.705046TB，增幅5.36%，较上周同期增加9.3552471TB，增幅1.82%。主要是用户行为引起，网络侧无故障。"
        });
    });
    $("#btn-lte-20170304").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "无"
        });
    });
    $("#btn-lte-20170305").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "无"
        });
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
    $("#btn-volte-20170304").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。以下指标波动主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>1、VoLTE注册用户数为110.89万户，与上月周六参考值78.38万户比较，增加32.51万户，增幅41.48%。较前一天增加3.67万户，增幅3.42%，较上周同期增加8.50万户，增幅8.30%。<br>2、VoLTE话务量为83.05万erl，与上月周六参考值54.71万erl比较，增加28.34万erl，增幅51.81%。较前一天减少33.01万erl，降幅28.44%，较上周同期增加7.13万erl，增幅9.39%。"
        });
    });
    $("#btn-volte-20170305").click(function (e) {
        $.alert({
            title: '原因分析',
            content: "上海网络运行正常，无影响业务的故障发生。<br>1、VoLTE注册用户数为114.24万户，与上月周日参考值77.08万户比较，增加37.16万户，增幅48.22%。较前一天增加3.35万户，增幅3.02%，较上周同期增加8.74万户，增幅8.29%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。<br>2、VoLTE话务量为73.10万erl，与上月周日参考值47.82万erl比较，增加25.28万erl，增幅52.86%。较前一天减少9.96万erl，降幅11.99%，较上周同期减少0.31万erl，降幅0.42%。主要是由于上月春节大量用户返乡，参考值偏低，本月用户回归正常导致业务量超标。"
        });
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