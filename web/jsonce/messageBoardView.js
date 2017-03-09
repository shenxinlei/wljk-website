function docReady() {
	//点击回到留言板
	$('#back').on('click',function(){
		History.go(-1);
	});
	
	//用于修改此条留言的标题和正文
    $('#supervisorbutton').click(function (e){
        e.preventDefault();
        $("#supervisor").modal('show');
    });

    //提交到后台数据库
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