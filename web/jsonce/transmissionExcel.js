function docReady() {
    //uploadify - multiple uploads
    $('#file_upload').uploadify({
        'swf': 'misc/uploadify.swf',
        'uploader': 'misc/uploadify.php',
        'buttonText':'选择上传的文件',
        'onUploadSuccess' : function(file,data,response) {
            var temp = $('#alreadyUpload').html();
            $('#alreadyUpload').html(temp +
        　　 "<br><a href='uploads/' target='_blank'>"+file.name +"</a>");
        },
    });

    //用于resourceCorrigendum.html的表单提交
    //此处业务逻辑沿用了resourceCorrigendum.html，请自己修改
    //如果不修改，效果就是点击按钮，会让隐藏的图表显示出来
    $('.zhibiao').hide();
    $('#resourceCorrigendum ul li').on('click', function() {
        $('#resourceCorrigendum').ajaxSubmit({
            type: 'post', // 提交方式 get/post
            url: 'misc/test.php', // 需要提交的 url
            data: {
                'title': 1,
                'content': 1
            },
            success: function(data) { // data 保存提交后返回的数据，一般为 json 数据
                $('.zhibiao').show();
            },
        });
        $('#resourceCorrigendum').resetForm(); // 提交后重置表单
        return false; // 阻止表单自动提交事件
    });
}


