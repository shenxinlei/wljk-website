function docReady() {
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

    //用于resourceCorrigendum.html的表单提交 资源勘误增加loading
    $('.zhibiao').hide();
    $('#resourceCorrigendum button').on('click', function() {
        $('#resourceCorrigendum').ajaxSubmit({
            type: 'post', // 提交方式 get/post
            url: 'misc/resourceCorrigendum.php', // 需要提交的 url
            data: {
                'title': 123,
                'content': 456
            },
            beforeSubmit: function() {
                $('#resourceCorrigendum button').html("<img src='img/ajax-loaders/ajax-loader-7.gif'>");
            },
            success: function(data) { // data 保存提交后返回的数据，一般为 json 数据
                $('#resourceCorrigendum button').html("重新计算");
                $('.zhibiao').show();
            },
        });
        $('#resourceCorrigendum').resetForm(); // 提交后重置表单
        return false; // 阻止表单自动提交事件
    });
}