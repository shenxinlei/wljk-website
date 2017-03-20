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
        volte kpi
    ***/
    //volte 查询按钮
    $("#volte-inquire").on("click", function() {
        $("#volte-table").show();
        $("#volte-save").show();
        //ajax去后台查询，查询到了结果之后，传回到前端
        $("#volte-form").ajaxSubmit({
            type: "post",
            data: $(this).formSerialize(),
            success: function(responseText, statusText) {
                //
            }
        });
        return false;
    });
    // volte 保存大值班按钮
    $("#volte-save").on("click", function() {
        var judge = true;
        $("#volte-table input").each(function(){
            //先判断是否所有值为非空，如果有格子空着是不能保存的
            if (!$(this).val()) {
                $.alert({
                    title: '表中有空的格子没填',
                    content: ''
                });
                judge = false;
                return false;
            }
            //再判断是否是红色的非法数字，如果都不是红色的，说明就可以提交了
            if ($(this).css("color") == "rgb(255, 0, 0)") {
                $.alert({
                    title: '表中有红色非法的数据，请重新填写正确的数据',
                    content: ''
                });
                judge = false;
                return false;
            }
        });
        if (!judge) {
            return false;
        }
        //到了这一步就可以ajax提交数据到数据库了，这里用alert代替了
        $.alert({
            title: '保存成功',
            content: ''
        });
        //最后每次保存成功以后，把保存按钮禁用
        $("#volte-save").attr("disabled", true);
    });
    //volte中 每次input有变动时，保存大值班应该就重新激活
    $('#volte-table input').change(function() {
        var input = $(this);  
        var temp = $.trim(input.val());
        var value = parseFloat(temp);
        if (!value) {  
            $.alert({
                title: '请输入一个数字',
                content: ''
            });
            input.css("color", "red");  
            $("#volte-save").attr("disabled", true);
        }  
        else {
            //转化为2位数字
            input.val(value.toFixed(2));
            input.css("color", "#3D9140");
            $("#volte-save").attr("disabled", false);
        }
    });

    /***
        CMNET KPI
    ***/
    //cmnet 查询按钮
    $("#cmnet-inquire").on("click", function() {
        $("#cmnet-table").show();
        $("#cmnet-save").show();
        //ajax去后台查询，查询到了结果之后，传回到前端
        $("#cmnet-form").ajaxSubmit({
            type: "post",
            data: $(this).formSerialize(),
            success: function(responseText, statusText) {
                //
            }
        });
        return false;
    });
    // cmnet 保存大值班按钮
    $("#cmnet-save").on("click", function() {
        var judge = true;
        $("#cmnet-table input").each(function(){
            //先判断是否所有值为非空，如果有格子空着是不能保存的
            if (!$(this).val()) {
                $.alert({
                    title: '表中有空的格子没填',
                    content: ''
                });
                judge = false;
                return false;
            }
            //再判断是否是红色的非法数字，如果都不是红色的，说明就可以提交了
            if ($(this).css("color") == "rgb(255, 0, 0)") {
                $.alert({
                    title: '表中有红色非法的数据，请重新填写正确的数据',
                    content: ''
                });
                judge = false;
                return false;
            }
        });
        if (!judge) {
            return false;
        }
        //到了这一步就可以ajax提交数据到数据库了，这里用alert代替了
        $.alert({
            title: '保存成功',
            content: ''
        });
        //最后每次保存成功以后，把保存按钮禁用
        $("#cmnet-save").attr("disabled", true);
    });
    //cmnet中 每次input有变动时，保存大值班应该就重新激活
    $('#cmnet-table input').change(function() {
        var input = $(this);  
        var temp = $.trim(input.val());
        var value = parseFloat(temp);
        if (!value) {  
            $.alert({
                title: '请输入一个数字',
                content: ''
            });
            input.css("color", "red");  
            $("#cmnet-save").attr("disabled", true);
        }  
        else {
            //转化为2位数字
            input.val(value.toFixed(2));
            input.css("color", "#3D9140");
            $("#cmnet-save").attr("disabled", false);
        }
    });

    /***
        lte KPI
    ***/
    //lte 查询按钮
    $("#lte-inquire").on("click", function() {
        $("#lte-table").show();
        $("#lte-save").show();
        //ajax去后台查询，查询到了结果之后，传回到前端
        $("#lte-form").ajaxSubmit({
            type: "post",
            data: $(this).formSerialize(),
            success: function(responseText, statusText) {
                //
            }
        });
        return false;
    });
    // lte 保存大值班按钮
    $("#lte-save").on("click", function() {
        var judge = true;
        $("#lte-table input").each(function(){
            //先判断是否所有值为非空，如果有格子空着是不能保存的
            if (!$(this).val()) {
                $.alert({
                    title: '表中有空的格子没填',
                    content: ''
                });
                judge = false;
                return false;
            }
            //再判断是否是红色的非法数字，如果都不是红色的，说明就可以提交了
            if ($(this).css("color") == "rgb(255, 0, 0)") {
                $.alert({
                    title: '表中有红色非法的数据，请重新填写正确的数据',
                    content: ''
                });
                judge = false;
                return false;
            }
        });
        if (!judge) {
            return false;
        }
        //到了这一步就可以ajax提交数据到数据库了，这里用alert代替了
        $.alert({
            title: '保存成功',
            content: ''
        });
        //最后每次保存成功以后，把保存按钮禁用
        $("#lte-save").attr("disabled", true);
    });
    //lte中 每次input有变动时，保存大值班应该就重新激活
    $('#lte-table input').change(function() {
        var input = $(this);  
        var temp = $.trim(input.val());
        var value = parseFloat(temp);
        if (!value) {  
            $.alert({
                title: '请输入一个数字',
                content: ''
            });
            input.css("color", "red");  
            $("#lte-save").attr("disabled", true);
        }  
        else {
            //转化为2位数字
            input.val(value.toFixed(2));
            input.css("color", "#3D9140");
            $("#lte-save").attr("disabled", false);
        }
    });

    /***
        TD KPI
    ***/
    //td 查询按钮
    $("#td-inquire").on("click", function() {
        $("#td-table").show();
        $("#td-save").show();
        //ajax去后台查询，查询到了结果之后，传回到前端
        $("#td-form").ajaxSubmit({
            type: "post",
            data: $(this).formSerialize(),
            success: function(responseText, statusText) {
                //
            }
        });
        return false;
    });
    // td 保存大值班按钮
    $("#td-save").on("click", function() {
        var judge = true;
        $("#td-table input").each(function(){
            //先判断是否所有值为非空，如果有格子空着是不能保存的
            if (!$(this).val()) {
                $.alert({
                    title: '表中有空的格子没填',
                    content: ''
                });
                judge = false;
                return false;
            }
            //再判断是否是红色的非法数字，如果都不是红色的，说明就可以提交了
            if ($(this).css("color") == "rgb(255, 0, 0)") {
                $.alert({
                    title: '表中有红色非法的数据，请重新填写正确的数据',
                    content: ''
                });
                judge = false;
                return false;
            }
        });
        if (!judge) {
            return false;
        }
        //到了这一步就可以ajax提交数据到数据库了，这里用alert代替了
        $.alert({
            title: '保存成功',
            content: ''
        });
        //最后每次保存成功以后，把保存按钮禁用
        $("#td-save").attr("disabled", true);
    });
    //td中 每次input有变动时，保存大值班应该就重新激活
    $('#td-table input').change(function() {
        var input = $(this);  
        var temp = $.trim(input.val());
        var value = parseFloat(temp);
        if (!value) {  
            $.alert({
                title: '请输入一个数字',
                content: ''
            });
            input.css("color", "red");  
            $("#td-save").attr("disabled", true);
        }  
        else {
            //转化为2位数字
            input.val(value.toFixed(2));
            input.css("color", "#3D9140");
            $("#td-save").attr("disabled", false);
        }
    });

    /***
        短彩信KPI
    ***/
    //gsm1 查询按钮
    $("#gsm1-inquire").on("click", function() {
        $("#gsm1-table").show();
        $("#gsm1-save").show();
        //ajax去后台查询，查询到了结果之后，传回到前端
        $("#gsm1-form").ajaxSubmit({
            type: "post",
            data: $(this).formSerialize(),
            success: function(responseText, statusText) {
                //
            }
        });
        return false;
    });
    // gsm1 保存大值班按钮
    $("#gsm1-save").on("click", function() {
        var judge = true;
        $("#gsm1-table input").each(function(){
            //先判断是否所有值为非空，如果有格子空着是不能保存的
            if (!$(this).val()) {
                $.alert({
                    title: '表中有空的格子没填',
                    content: ''
                });
                judge = false;
                return false;
            }
            //再判断是否是红色的非法数字，如果都不是红色的，说明就可以提交了
            if ($(this).css("color") == "rgb(255, 0, 0)") {
                $.alert({
                    title: '表中有红色非法的数据，请重新填写正确的数据',
                    content: ''
                });
                judge = false;
                return false;
            }
        });
        if (!judge) {
            return false;
        }
        //到了这一步就可以ajax提交数据到数据库了，这里用alert代替了
        $.alert({
            title: '保存成功',
            content: ''
        });
        //最后每次保存成功以后，把保存按钮禁用
        $("#gsm1-save").attr("disabled", true);
    });
    //gsm1中 每次input有变动时，保存大值班应该就重新激活
    $('#gsm1-table input').change(function() {
        var input = $(this);  
        var temp = $.trim(input.val());
        var value = parseFloat(temp);
        if (!value) {  
            $.alert({
                title: '请输入一个数字',
                content: ''
            });
            input.css("color", "red");  
            $("#gsm1-save").attr("disabled", true);
        }  
        else {
            //转化为2位数字
            input.val(value.toFixed(2));
            input.css("color", "#3D9140");
            $("#gsm1-save").attr("disabled", false);
        }
    });

    /***
        GSM KPI
    ***/
    //gsm2 查询按钮
    $("#gsm2-inquire").on("click", function() {
        $("#gsm2-table").show();
        $("#gsm2-save").show();
        //ajax去后台查询，查询到了结果之后，传回到前端
        $("#gsm2-form").ajaxSubmit({
            type: "post",
            data: $(this).formSerialize(),
            success: function(responseText, statusText) {
                //
            }
        });
        return false;
    });
    // gsm2 保存大值班按钮
    $("#gsm2-save").on("click", function() {
        var judge = true;
        $("#gsm2-table input").each(function(){
            //先判断是否所有值为非空，如果有格子空着是不能保存的
            if (!$(this).val()) {
                $.alert({
                    title: '表中有空的格子没填',
                    content: ''
                });
                judge = false;
                return false;
            }
            //再判断是否是红色的非法数字，如果都不是红色的，说明就可以提交了
            if ($(this).css("color") == "rgb(255, 0, 0)") {
                $.alert({
                    title: '表中有红色非法的数据，请重新填写正确的数据',
                    content: ''
                });
                judge = false;
                return false;
            }
        });
        if (!judge) {
            return false;
        }
        //到了这一步就可以ajax提交数据到数据库了，这里用alert代替了
        $.alert({
            title: '保存成功',
            content: ''
        });
        //最后每次保存成功以后，把保存按钮禁用
        $("#gsm2-save").attr("disabled", true);
    });
    //gsm2中 每次input有变动时，保存大值班应该就重新激活
    $('#gsm2-table input').change(function() {
        var input = $(this);  
        var temp = $.trim(input.val());
        var value = parseFloat(temp);
        if (!value) {  
            $.alert({
                title: '请输入一个数字',
                content: ''
            });
            input.css("color", "red");  
            $("#gsm2-save").attr("disabled", true);
        }  
        else {
            //转化为2位数字
            input.val(value.toFixed(2));
            input.css("color", "#3D9140");
            $("#gsm2-save").attr("disabled", false);
        }
    });

    /***
        GSM 话务量分析
    ***/
    //gsm3 查询按钮
    $("#gsm3-inquire").on("click", function() {
        $("#gsm3-table").show();
        $("#gsm3-save").show();
        //ajax去后台查询，查询到了结果之后，传回到前端
        $("#gsm3-form").ajaxSubmit({
            type: "post",
            data: $(this).formSerialize(),
            success: function(responseText, statusText) {
                //
            }
        });
        return false;
    });
    // gsm3 保存大值班按钮
    $("#gsm3-save").on("click", function() {
        var judge = true;
        $("#gsm3-table input").each(function(){
            //先判断是否所有值为非空，如果有格子空着是不能保存的
            if (!$(this).val()) {
                $.alert({
                    title: '表中有空的格子没填',
                    content: ''
                });
                judge = false;
                return false;
            }
            //再判断是否是红色的非法数字，如果都不是红色的，说明就可以提交了
            if ($(this).css("color") == "rgb(255, 0, 0)") {
                $.alert({
                    title: '表中有红色非法的数据，请重新填写正确的数据',
                    content: ''
                });
                judge = false;
                return false;
            }
        });
        if (!judge) {
            return false;
        }
        //到了这一步就可以ajax提交数据到数据库了，这里用alert代替了
        $.alert({
            title: '保存成功',
            content: ''
        });
        //最后每次保存成功以后，把保存按钮禁用
        $("#gsm3-save").attr("disabled", true);
    });
    //gsm3中 每次input有变动时，保存大值班应该就重新激活
    $('#gsm3-table input').change(function() {
        var input = $(this);  
        var temp = $.trim(input.val());
        var value = parseInt(temp);
        if (!value) {  
            $.alert({
                title: '请输入一个数字',
                content: ''
            });
            input.css("color", "red");  
            $("#gsm3-save").attr("disabled", true);
        }  
        else {
            input.val(value);
            input.css("color", "#3D9140");
            $("#gsm3-save").attr("disabled", false);
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