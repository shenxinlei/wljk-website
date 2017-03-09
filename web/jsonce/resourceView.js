function docReady() {
    /***
        本页中专有的一些js
    ***/
    //用于管理员信息发布的模态框调用
    $('#supervisorbutton').click(function (e){
        e.preventDefault();
        $("#supervisor").modal('show');
    });

    //让textarea不能拖放
    $('textarea').css('resize','none');

    //supervisor模块框的表单内容提交
    $('#submitToBlackboard').on('click', function() {
        $('#publish-blackboard').ajaxSubmit({
            type: 'post',
            url: 'misc/blackboard.php',
            data: $('#publish-blackboard').formSerialize(),
            success: function(responseText, statusText) {
                alert(responseText);
            }
        });
        $('#publish-blackboard').resetForm(); // 提交后重置表单
        return false; // 阻止表单自动提交事件 
    });
}
