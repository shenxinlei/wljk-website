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

    // 保存短信按钮
    $('.send').on('click', function () {
        $.confirm({
            title: '请确认是否提交该短信至数据库',
            content: '每条短信都将被记录到数据库，一旦提交，将无法修改',
            confirm: function () {
                $.alert({
                    icon: 'glyphicon glyphicon-heart',
                    content: false,
                    title: '提交成功',
                    theme: 'black',
                });
            },
            cancel: function () {
                $.alert({
                    content: false,
                    title: '提交已取消',
                    theme: 'black',
                });
            },
            confirmButton: '是的，继续提交',
            cancelButton: '容我三思',
            confirmButtonClass: 'btn-info',
            cancelButtonClass: 'btn-danger',
            animation: 'zoom',
            closeAnimation: 'scale',
            theme: 'black',
        });
        return false;//阻止默认提交
    });

    //获取该短信并重新编辑功能
    $('.reEditButton').click(function (e){
        e.preventDefault();
        //var contents = "678910"；
        var contents = $(this).parent().parent().children().eq(5).text();
        $("#contents").val(contents);
        //console.log("12345");
        $("#reEdit").modal('show');
    });

    //日期查询按照天粒度来取
    // $('.formDate').datetimepicker({
    //     format:'yyyy-mm-dd',
    //     language: 'zh-CN',
    //     weekStart: 0,
    //     autoclose: 1,
    //     startView: 2,
    //     todayBtn:  1,
    //     todayHighlight: 1,
    //     forceParse: 1,
    //     showMeridian: 0,
    //     minView: "month",//设置只显示到月份
    //     initialDate:new Date(),
    // });

    //星星评分
    $('.raty').raty({ 
        number: 5,
        score: 4.5,
        half: true,
        halfShow: true, 
        click: function(score, evt) {
            var string = "";
            switch (score) {
                case "5": string = "5.0分"; break;
                case "4": string = "4.0分"; break;
                case "3": string = "3.0分"; break;
                case "2": string = "2.0分"; break;
                case "1": string = "1.0分"; break;
                default: string = score + "分";
            }           
            $("#score-modal-number").text(string);
        }
    });

    //如何获取星星上面的分数
    // $('#submitToSender').click(function(e) {
    //     e.preventDefault();
    //     console.log("12345");
    //     var temp = $('#score-modal').raty('score'); 
    //     console.log(temp);
    // });

    $('#submitToSender').on('click', function () {
        $.confirm({
            title: '请确认是否审核完成',
            content: '请确保短信已经修改无误，并确认您打的分数公平公正',
            confirm: function () {
                $.alert({
                    icon: 'glyphicon glyphicon-heart',
                    content: false,
                    title: '审核成功',
                    theme: 'black',
                });
            },
            cancel: function () {
                $.alert({
                    content: false,
                    title: '已取消',
                    theme: 'black',
                });
            },
            confirmButton: '是的，继续',
            cancelButton: '容我三思',
            confirmButtonClass: 'btn-info',
            cancelButtonClass: 'btn-danger',
            animation: 'zoom',
            closeAnimation: 'scale',
            theme: 'black',
        });
        return false;//阻止默认提交
    });

    $('.noChanges').on('click', function (e) {
        e.preventDefault();
        $.confirm({
            title: '请确认是否审核完成',
            content: '直接提交代表该短信无需修改，并且默认为五星评价',
            confirm: function () {
                $.alert({
                    icon: 'glyphicon glyphicon-heart',
                    content: false,
                    title: '审核成功',
                    theme: 'black',
                });
            },
            cancel: function () {
                $.alert({
                    content: false,
                    title: '已取消',
                    theme: 'black',
                });
            },
            confirmButton: '是的，继续',
            cancelButton: '容我三思',
            confirmButtonClass: 'btn-info',
            cancelButtonClass: 'btn-danger',
            animation: 'zoom',
            closeAnimation: 'scale',
            theme: 'black',
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