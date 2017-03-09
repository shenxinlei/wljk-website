function docReady() {
    //设定首页的轮播器
    $('#myCarousel').carousel({
        interval : 2000,
    });
    $('#myCarousel').on('slide.bs.carousel', function () {
        var marginOfmyCarcousel = ($('#myCarousel').parent().parent().height()-$('#myCarousel').height()) / 2 + 'px';
        $('#myCarousel').css("margin-top", marginOfmyCarcousel);
    });

    //设定首页的日历
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: '2016-03-25',
        events: [
            {
                title: '监控班会',
                start: '2016-03-01'
            },
            {
                title: '两会保障',
                start: '2016-03-05',
                end: '2016-03-16'
            },
            {
                title: '短道速滑保障',
                start: '2016-03-18',
                end: '2016-03-21'
            },
            {
                title: '传输培训',
                start: '2016-03-22T10:30:00',
                end: '2016-03-22T12:30:00'
            },
            {
                title: '数据培训',
                start: '2016-03-28T13:30:00',
                end: '2016-03-28T15:30:00'
            },
            {
                title: '网管中心亲子活动',
                start: '2016-03-31T10:00:00',
                end: '2016-03-31T15:00:00'
            },
            {
                title: '清明保障',
                start: '2016-04-02',
                end: '2016-04-05'
            },
        ]
    });

    /*
        用于main.html的管理员信息发布
    */
    $('#supervisorbutton').click(function (e){
        e.preventDefault();
        $("#supervisor").modal('show');
    });
    //让textarea不能拖放
    $('textarea').css('resize','none');
    //日期选择器
    $('.form_datetime').datetimepicker({
        format:'yyyy-mm-dd hh:ii',
        language: 'zh-CN',
        weekStart: 0,
        autoclose: 1,
        startView: 2,
        todayBtn:  1,
        todayHighlight: 1,
        forceParse: 1,
        showMeridian: 0,
        minuteStep:5,
        initialDate:new Date(),
    });
    //supervisor模块框的表单内容提交
    $('#submitToBlackboard').on('click', function() {
        $('#publish-blackboard').ajaxSubmit({
            type: 'post',
            url: 'misc/blackboard.php',
            data: $('#publish-blackboard').formSerialize(),
            success: function(responseText, statusText) {
                alert(responseText);
            },
        });
        $('#publish-blackboard').resetForm(); // 提交后重置表单
        return false; // 阻止表单自动提交事件 
    });

    //首页常用链接按钮
    $('#btn1').click(function(e) {
        e.preventDefault();
        window.open('http://10.221.213.164/wnmsweb/');
    });
    $('#btn2').click(function(e) {
        e.preventDefault();
        window.open('http://10.1.98.210/cmcceoms/roles/login.jsp');
    });
    $('#btn3').click(function(e) {
        e.preventDefault();
        window.open('http://10.221.12.175/eoms35/');
    });
    $('#btn4').click(function(e) {
        e.preventDefault();
        window.open('http://10.221.154.141:20111/irm/login.html');
    });
    $('#btn5').click(function(e) {
        e.preventDefault();
        window.open('http://10.221.32.110:20090/login.jsp');
    });
    $('#btn6').click(function(e) {
        e.preventDefault();
        window.open('http://10.221.12.157/wps/portal');
    });
    $('#btn7').click(function(e) {
        e.preventDefault();
        window.open('http://oa.sh.cmcc/wps/portal');
    });
}