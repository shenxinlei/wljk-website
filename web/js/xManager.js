$(document).ready(function () {
    //第一步，先把名字显示出来
    $('#who').html($.cookie('username'));
    
    //点击退出登录，注销cookie
    $('#quit').click(function(){
        $.cookie('username', null); 
    });

    //themes, change CSS with JS
    //default theme(CSS) is cerulean, change it if needed
    var defaultTheme = 'cerulean';
    var currentTheme = $.cookie('currentTheme') == null ? defaultTheme : $.cookie('currentTheme');
    var msie = navigator.userAgent.match(/msie/i);
    $.browser = {};
    $.browser.msie = {};
    switchTheme(currentTheme);

    $('.navbar-toggle').click(function (e) {
        e.preventDefault();
        $('.nav-sm').html($('.navbar-collapse').html());
        $('.sidebar-nav').toggleClass('active');
        $(this).toggleClass('active');
    });

    var $sidebarNav = $('.sidebar-nav');

    // Hide responsive navbar on clicking outside
    $(document).mouseup(function (e) {
        if (!$sidebarNav.is(e.target) // if the target of the click isn't the container...
            && $sidebarNav.has(e.target).length === 0
            && !$('.navbar-toggle').is(e.target)
            && $('.navbar-toggle').has(e.target).length === 0
            && $sidebarNav.hasClass('active')
            )// ... nor a descendant of the container
        {
            e.stopPropagation();
            $('.navbar-toggle').click();
        }
    });


    $('#themes a').click(function (e) {
        e.preventDefault();
        currentTheme = $(this).attr('data-value');
        $.cookie('currentTheme', currentTheme, {expires: 365});
        switchTheme(currentTheme);
    });


    function switchTheme(themeName) {
        if (themeName == 'classic') {
            $('#bs-css').attr('href', 'bower_components/bootstrap/dist/css/bootstrap.min.css');
        } else {
            $('#bs-css').attr('href', 'css/bootstrap-' + themeName + '.min.css');
        }

        $('#themes i').removeClass('glyphicon glyphicon-ok whitespace').addClass('whitespace');
        $('#themes a[data-value=' + themeName + ']').find('i').removeClass('whitespace').addClass('glyphicon glyphicon-ok');
    }

    //ajax menu checkbox
    $('#is-ajax').click(function (e) {
        $.cookie('is-ajax', $(this).prop('checked'), {expires: 365});
    });
    $('#is-ajax').prop('checked', $.cookie('is-ajax') === 'true' ? true : false);

    //disbaling some functions for Internet Explorer
    if (msie) {
        $('#is-ajax').prop('checked', false);
        $('#for-is-ajax').hide();
        $('#toggle-fullscreen').hide();
        $('.login-box').find('.input-large').removeClass('span10');
    }

    //highlight current / active link
    $('ul.main-menu li a').each(function () {
        if ($($(this))[0].href == String(window.location))
            $(this).parent().addClass('active');
    });

    //establish history variables
    var
        History = window.History, // Note: We are using a capital H instead of a lower h
        State = History.getState(),
        $log = $('#log');

    //bind to State Change
    History.Adapter.bind(window, 'statechange', function () { // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        $.ajax({
            url: State.url,
            success: function (msg) {
                $('#content').html($(msg).find('#content').html());
                $('#loading').remove();
                $('#content').fadeIn();
                var newTitle = $(msg).filter('title').text();
                $('title').text(newTitle);
                docReady();
            }
        });
    });

    //ajaxify menus
    $('a.ajax-link').click(function (e) {
        if (msie) e.which = 1;
        if (e.which != 1 || !$('#is-ajax').prop('checked') || $(this).parent().hasClass('active')) return;
        e.preventDefault();
        $('.sidebar-nav').removeClass('active');
        $('.navbar-toggle').removeClass('active');
        $('#loading').remove();
        $('#content').fadeOut().parent().append('<div id="loading" class="center">Loading...<div class="center"></div></div>');
        var $clink = $(this);
        History.pushState(null, null, $clink.attr('href'));
        $('ul.main-menu li.active').removeClass('active');
        $clink.parent('li').addClass('active');
    });

    $('.accordion > a').click(function (e) {
        e.preventDefault();
        var $ul = $(this).siblings('ul');
        var $li = $(this).parent();
        if ($ul.is(':visible')) $li.removeClass('active');
        else                    $li.addClass('active');
        $ul.slideToggle();
    });

    $('.accordion li.active:first').parents('ul').slideDown();


    //other things to do on document ready, separated for ajax calls
    docReady();
});


function docReady() {
    //prevent # links from moving to top
    $('a[href="#"][data-top!=true]').click(function (e) {
        e.preventDefault();
    });

    //notifications
    $('.noty').click(function (e) {
        e.preventDefault();
        var options = $.parseJSON($(this).attr('data-noty-options'));
        noty(options);
    });

    //chosen - improves select
    $('[data-rel="chosen"],[rel="chosen"]').chosen();

    //tabs
    $('#myTab a:first').tab('show');
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#myTab2 a:first').tab('show');
    $('#myTab2 a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#myTab3 a:first').tab('show');
    $('#myTab3 a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#myTab4 a:first').tab('show');
    $('#myTab4 a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#myTab5 a:first').tab('show');
    $('#myTab5 a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#myTab6 a:first').tab('show');
    $('#myTab6 a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#myTab7 a:first').tab('show');
    $('#myTab7 a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#myTab8 a:first').tab('show');
    $('#myTab8 a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#myTab9 a:first').tab('show');
    $('#myTab9 a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });


    //tooltip
    $('[data-toggle="tooltip"]').tooltip();

    //auto grow textarea
    $('textarea.autogrow').autogrow();

    //popover
    $('[data-toggle="popover"]').popover();

    //iOS / iPhone style toggle switch
    $('.iphone-toggle').iphoneStyle();

    //star rating
    $('.raty').raty({
        score: 4 //default stars
    });

    //uploadify - multiple uploads
    $('#file_upload').uploadify({
        'swf': 'misc/uploadify.swf',
        'uploader': 'misc/uploadify.php',
        'buttonText':'选择上传的文件',
        'onUploadSuccess' : function(file,data,response) {
            var temp = $('#alreadyUpload').html();
            $('#alreadyUpload').html(temp + "<br>" + 'id: ' + file.id
        　　+ ' - 索引: ' + file.index + "<br>"
        　　+ ' - 文件名: ' + file.name + "<br>"
        　　+ ' - 文件大小: ' + file.size + "<br>"
        　　+ ' - 类型: ' + file.type + "<br>"
        　　+ ' - 创建日期: ' + file.creationdate + "<br>"
        　　+ ' - 修改日期: ' + file.modificationdate + "<br>"
        　　+ ' - 文件状态: ' + file.filestatus + "<br>"
        　　+ ' - 服务器端消息: ' + data + "<br>"
        　　+ ' - 是否上传成功: ' + response + "<br><br><a>"+file.name +"</a>");
        },
    });

    //gallery controls container animation
    $('ul.gallery li').hover(function () {
        //$('img', this).fadeToggle(1000);
        $(this).find('.gallery-controls').remove();
        $(this).append('<div class="well gallery-controls">' +
            '<p><a href="#" class="gallery-edit btn"><i class="glyphicon glyphicon-edit"></i></a> <a href="#" class="gallery-delete btn"><i class="glyphicon glyphicon-remove"></i></a></p>' +
            '</div>');
        $(this).find('.gallery-controls').stop().animate({'margin-top': '-1'}, 400);
    }, function () {
        //$('img', this).fadeToggle(1000);
        $(this).find('.gallery-controls').stop().animate({'margin-top': '-30'}, 200, function () {
            $(this).remove();
        });
    });


    //gallery image controls example
    //gallery delete
    $('.thumbnails').on('click', '.gallery-delete', function (e) {
        e.preventDefault();
        //get image id
        //alert($(this).parents('.thumbnail').attr('id'));
        $(this).parents('.thumbnail').fadeOut();
    });
    //gallery edit
    $('#image-1').on('click', '.gallery-edit', function (e) {
        e.preventDefault();
        $('#myModal').modal('show');
        yepnope({
            test : Modernizr.csstransforms,
            yep: ['lib/turn.min.js'],
            nope: ['lib/turn.html4.min.js'],
            both: ['lib/scissor.min.js', 'css/double-page.css'],
            complete: loadApp
        });
    });
    //解决了当离开阅读文件时，无法出现页面滚动条
    $('.modal').on('hide.bs.modal', function () {       
        $('body').css("overflow-y","scroll");
    });

    //tour
    if ($('.tour').length && typeof(tour) == 'undefined') {
        var tour = new Tour();
        tour.addStep({
            element: "#content", /* html element next to which the step popover should be shown */
            placement: "top",
            title: "Custom Tour", /* title of the popover */
            content: "You can create tour like this. Click Next." /* content of the popover */
        });
        tour.addStep({
            element: ".theme-container",
            placement: "left",
            title: "Themes",
            content: "You change your theme from here."
        });
        tour.addStep({
            element: "ul.main-menu a:first",
            title: "Dashboard",
            content: "This is your dashboard from here you will find highlights."
        });
        tour.addStep({
            element: "#for-is-ajax",
            title: "Ajax",
            content: "You can change if pages load with Ajax or not."
        });
        tour.addStep({
            element: ".top-nav a:first",
            placement: "bottom",
            title: "Visit Site",
            content: "Visit your front end from here."
        });

        tour.restart();
    }

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
    $('.btn-close').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().parent().fadeOut();
    });
    $('.btn-minimize').click(function (e) {
        e.preventDefault();
        var $target = $(this).parent().parent().next('.box-content');
        if ($target.is(':visible')) $('i', $(this)).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        else                       $('i', $(this)).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        $target.slideToggle();
    });
    
    //设定首页的轮播器
    $('#myCarousel').carousel({
            //自动2秒播放
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

    //用于main.html的管理员信息发布
    $('#supervisorbutton').click(function (e){
        e.preventDefault();
        $("#supervisor").modal('show');
    });

    //用于otherSystem的新增列表
    $('#plusURL').click(function (e) {
        e.preventDefault();
        $('#myModal').modal('show');
    });

    //用于resourceCorrigendum.html
    $('#downloads a').click(function (e) {
        //e.preventDefault();
        //alert("123");
    });

    //用于resourceCorrigendum.html的表单提交
    $('.zhibiao').hide();
    $('#resourceCorrigendum button').on('click', function() {
        $('#resourceCorrigendum').on('submit', function() {
            $(this).ajaxSubmit({
                type: 'post', // 提交方式 get/post
                url: 'misc/test1.php', // 需要提交的 url
                data: {
                    'title': 1,
                    'content': 1
                },
                success: function(data) { // data 保存提交后返回的数据，一般为 json 数据
                    //alert('提交成功！');
                    $('.zhibiao').show();
                    //$('#alreadyUpload').html("第一次计算");
                },
            });
            $(this).resetForm(); // 提交后重置表单
            return false; // 阻止表单自动提交事件
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
}
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
//加载阅览室必须的函数loadApp
function loadApp() {
    // Create the flipbook
    $('.flipbook').turn({
            // Width
            width:952,          
            // Height
            height:590,
            // Elevation
            elevation: 100,         
            // Enable gradients
            gradients: true,            
            // Auto center this flipbook
            autoCenter: true        
    });
}


