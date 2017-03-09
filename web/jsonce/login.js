$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();

	//登陆按钮
	$('#load').on('click', function() {
		if ($('#login_user').val().length == 0) {
			$('#usernamenotempty').noty({
		        text:'用户名不能为空',
		        layout:'top',
		        type:'error',
		        dismissQueue:true,
		        timeout: 1200,   	
		    });
		    return false;
		};
		if ($('#login_pass').val().length == 0) {
			$('#passwordnotempty').noty({
		        text:'密码不能为空',
		        layout:'top',
		        type:'error',
		        dismissQueue:true,
		        timeout: 1200,   	
		    });
		    return false;
    	};
        $('#login').ajaxSubmit({
	        type: 'post', 
	        url: 'misc/login.php', 
	        data: $('#login').formSerialize(),
	        beforeSubmit: function (formData, jqForm, options) {
	            var html = '<img src="img/ajax-loaders/ajax-loader-4.gif" title="img/ajax-loaders/ajax-loader-1.gif">';
				$('#load').html(html);
				$('#load').attr('disabled',true);
			},
	        success: function(responseText, statusText) { 
            	if (responseText == 1) {
	            	//设置cookie,为main.html作准备
	            	if ($('#remember').is(':checked')) {
	            		$.cookie('username',$('#login_user').val(),{expires: 7});
	            	}
	            	else {
	            		$.cookie('username',$('#login_user').val());
	            	}
	            	window.location.href = "main.html";
	            }
	            else {
	            	$('#load').attr('disabled',false);
	            	$('#load').html('登陆');
	            	noty({
		        		text:'登陆失败,原因为:用户名或者密码错误',
		        		layout:'top',
		        		type:'error',
		        		dismissQueue:false,
		        		timeout: 1500,	
		    		});
		    		$.noty.clearQueue();
	            }
	        },
        });
		$('#login #login_pass').clearFields();//提交后清除密码字段
	    return false; // 阻止表单自动提交事件	
    });
	//注册按钮
	$('#reg').on('click',function(e) {
		e.preventDefault();
		$('#myModal').modal('show');
	});
	//注册按钮模块框中的提交
	$('#register').on('click',function(e) {
		var flag = true;
	
		if (!check_user()) {
			$('#reg_user_error').show();
			flag = false;
		}
		
		if (!check_pass()) {
			$('#reg_pwd_error').show();
			flag = false;
		}
		
		if (!check_notpass()) {
			$('#reg_confirm_error').show();
			flag = false;
		}

		if (!check_realname()) {
			$('#reg_realname_error').show();
			flag = false;
		}

		if (!check_tel()) {
			$('#reg_tel_error').show();
			flag = false;
		}

		if (!check_email()) {
			$('#reg_email_error').show();
			flag = false;
		}
		
		if (!check_major()) {
			$('#reg_major_error').show();
			flag = false;
		}

		if (!check_title()) {
			$('#reg_title_error').show();
			flag = false;
		}

		if (flag) {
				$('#reg_form').ajaxSubmit({
					type: 'post', 
			        url: 'misc/register.php', 
			        data: $('#reg_form').formSerialize(),
			        success: function(responseText, statusText) { 
			            if (responseText == 1) {
			            	noty({
						        text:'注册成功，请登录',
						        layout:'top',
						        type:'success',
						        dismissQueue:false,
						        timeout: 1500,   
						        maxVisible:1,
						        force:true,	
						    });
						    $.noty.clearQueue();
			            	$('#myModal').modal('hide');
			            }
			            else {
			            	noty({
						        text:'注册失败，请尝试重新注册',
						        layout:'top',
						        type:'error',
						        dismissQueue:false,
						        timeout: 1500, 
						        maxVisible:1,
						    });
			            	$.noty.clearQueue();
			            }
					},
				});
				$('#reg_form').resetForm();
				//还要把打钩的都去掉
				$('#reg_user_succ').hide();
				$('#reg_pwd_succ').hide();
				$('#reg_confirm_succ').hide();
				$('#reg_realname_succ').hide();
				$('#reg_tel_succ').hide();
				$('#reg_email_succ').hide();
				$('#reg_major_succ').hide();
				$('#reg_title_succ').hide();
				return false;
		}
		else {
			e.preventDefault();
		}
	});

	//表单中用户名这一栏
	$('#reg_username').focus(function(){
		$('#reg_user_info').hide();
		$('#reg_user_succ').hide();
		$('#reg_user_error').hide();
	}).blur(function() {
		if ($.trim($(this).val()) == '') {
			$('#reg_user_info').hide();
			$('#reg_user_succ').hide();
			$('#reg_user_error').hide();
		}
		else if (!check_user()) {
			$('#reg_user_info').show();
			$('#reg_user_error').show();
			$('#reg_user_succ').hide();
		}
		else {
			$('#reg_user_info').hide();
			$('#reg_user_error').hide();
			$('#reg_user_succ').show();
		}
	});

	function check_user() {
		var flag = true;
		if (!/^[\w]{4,15}$/.test($.trim($('#reg_username').val()))) {
			$('#reg_user_info').html('用户名长度必须大于3位小于15位');
			return false;
		}
		else {
			$.ajax({
				type: 'post', 
		        url: 'misc/is_user.php', 
		        data: $('#reg_form').formSerialize(),
		        success: function(responseText, statusText) {
		        	if (responseText == 1) {
		        		$('#reg_user_info').html('用户名已存在');
		        		flag = false;
		        	}
		        	else {
		        		flag = true;
		        	}
		        },
		        async: false
			});
		}
		return flag;
	}

	//表单中密码这一栏
	$('#reg_password').focus(function(){
		$('.info_pass').show();
		$('#reg_pwd_succ').hide();
		$('#reg_pwd_error').hide();
	}).blur(function() {
		if ($.trim($(this).val()) == '') {
			$('.info_pass').hide();
			$('#reg_pwd_succ').hide();
			$('#reg_pwd_error').hide();
		}
		else if (check_pass()) {
			$('.info_pass').hide();
			$('#reg_pwd_succ').show();
			$('#reg_pwd_error').hide();
		}
		else {
			$('.info_pass').hide();
			$('#reg_pwd_succ').hide();
			$('#reg_pwd_error').show();
		}
	});
	
	//密码强度验证
	$('#reg_password').keyup(function () {
		check_pass();
	});
	
	//密码验证函数
	function check_pass() {
		//var value = $.trim($('#reg_password').val());
		var value = $('#reg_password').val();
		var value_length = value.length;
		var code_length = 0;
		//第一个必须条件的验证6-20位之间
		if (value_length >= 6 && value_length <= 20) {
			$('.info_pass .q1').html('●').css('color', 'green');
		} else {
			$('.info_pass .q1').html('○').css('color', '#666');
		}
		//第二个必须条件的验证，字母或数字或非空字符，任意一个即可
		if (value_length > 0 && !/\s/.test(value)) {
			$('.info_pass .q2').html('●').css('color', 'green');
		} else {
			$('.info_pass .q2').html('○').css('color', '#666');
		}
		//第三个必须条件的验证，大写字母，小写字母，数字，非空字符 任意两种混拼即可
		if (/[\d]/.test(value)) {
			code_length++;
		}
		if (/[a-z]/.test(value)) {
			code_length++;
		}
		if (/[A-Z]/.test(value)) {
			code_length++;
		}
		if (/[^\w]/.test(value)) {
			code_length++;
		}
		if (code_length >= 2) {
			$('.info_pass .q3').html('●').css('color', 'green');
		} else {
			$('.info_pass .q3').html('○').css('color', '#666');
		}
		//安全级别
		if (value_length >= 12 && code_length >= 3) {
			$('.info_pass .s1').css('color', 'green');
			$('.info_pass .s2').css('color', 'green');
			$('.info_pass .s3').css('color', 'green');
			$('.info_pass .s4').html('高').css('color', 'green');
		} else if (value_length >= 8 && code_length >= 2) {
			$('.info_pass .s1').css('color', '#f60');
			$('.info_pass .s2').css('color', '#f60');
			$('.info_pass .s3').css('color', '#ccc');
			$('.info_pass .s4').html('中').css('color', '#f60');
		} else if (value_length >= 1) {
			$('.info_pass .s1').css('color', 'maroon');
			$('.info_pass .s2').css('color', '#ccc');
			$('.info_pass .s3').css('color', '#ccc');
			$('.info_pass .s4').html('低').css('color', 'maroon');
		} else {
			$('.info_pass .s1').css('color', '#ccc');
			$('.info_pass .s2').css('color', '#ccc');
			$('.info_pass .s3').css('color', '#ccc');
			$('.info_pass .s4').html(' ');
		}	
		//函数返回值判定
		if (value_length >= 6 && value_length <= 20 
				&& !/\s/.test(value) && code_length >= 2) {
			return true;
		} else {
			return false;
		}
	}

	//表单中密码确认这一栏
	$('#reg_confirmpassword').focus(function () {
		$('#reg_confirm_info').hide();
		$('#reg_confirm_succ').hide();
		$('#reg_confirm_error').hide();
	}).blur(function () {
		if ($.trim($(this).val()) == '') {
			$('#reg_confirm_info').hide();
			$('#reg_confirm_succ').hide();
			$('#reg_confirm_error').hide();
		} else if (check_notpass()){
			$('#reg_confirm_info').hide();
			$('#reg_confirm_succ').show();
			$('#reg_confirm_error').hide();
		} else {
			$('#reg_confirm_info').show();
			$('#reg_confirm_succ').hide();
			$('#reg_confirm_error').show();
		}
	});
	
	function check_notpass() {
		if ($('#reg_password').val() === $('#reg_confirmpassword').val()) {
			return true;
		}
		else {
			$('#reg_confirm_info').html('两次密码不一致，请重新输入');
			return false;
		}
	}

	//表单中真名这一栏
	$('#reg_realname').focus(function(){
		$('#reg_realname_info').hide();
		$('#reg_realname_succ').hide();
		$('#reg_realname_error').hide();
	}).blur(function() {
		if ($.trim($(this).val()) == '') {
			$('#reg_realname_info').hide();
			$('#reg_realname_succ').hide();
			$('#reg_realname_error').hide();
		}
		else if (check_realname()) {
			$('#reg_realname_info').hide();
			$('#reg_realname_error').hide();
			$('#reg_realname_succ').show();
		}
		else {
			$('#reg_realname_info').show();
			$('#reg_realname_error').show();
			$('#reg_realname_succ').hide();
		}
	});

	function check_realname() {
		var flag = true;
		$.ajax({
			type: 'post', 
		    url: 'misc/is_memberofwljk.php', 
		    data: $('#reg_form').formSerialize(),
		    success: function(responseText, statusText) {
		        if (responseText == 2) {
		        	$('#reg_realname_info').html('非网络监控部成员无法注册');
		        	flag = false;
		        }
		        else if (responseText == 1) {
		        	$('#reg_realname_info').html('每人只能注册一个账号');
		        	flag = false;
		        }
		        else {
		        	flag = true;
		        }
		    },
		    async: false
		});
		return flag;
	}

	//表单中电话这一栏
	$('#reg_telephone').focus(function () {
		$('#reg_tel_info').hide();
		$('#reg_tel_succ').hide();
		$('#reg_tel_error').hide();
	}).blur(function () {
		if ($.trim($(this).val()) == '') {
			$('#reg_tel_info').hide();
			$('#reg_tel_succ').hide();
			$('#reg_tel_error').hide();
		} else if (check_tel()){
			$('#reg_tel_info').hide();
			$('#reg_tel_succ').show();
			$('#reg_tel_error').hide();
		} else {
			$('#reg_tel_info').show();
			$('#reg_tel_succ').hide();
			$('#reg_tel_error').show();
		}
	});

	function check_tel() {
		var value = $.trim($('#reg_telephone').val());
		if (/^[1][358][0-9]{9}$/.test(value)) {
			return true;
		}
		else {
			$('#reg_tel_info').html('不合法的电话号码');
			return false;
		}
	}

	//表单中电子邮件这一栏
	$('#reg_email').focus(function () {
		$('#reg_email_info').hide();
		$('#reg_email_succ').hide();
		$('#reg_email_error').hide();
	}).blur(function () {
		if ($.trim($(this).val()) == '') {
			$('#reg_email_info').hide();
			$('#reg_email_succ').hide();
			$('#reg_email_error').hide();
		} else if (check_email()) {
			$('#reg_email_info').hide();
			$('#reg_email_succ').show();
			$('#reg_email_error').hide();
		} else {
			$('#reg_email_info').show();
			$('#reg_email_succ').hide();
			$('#reg_email_error').show();
		}
	});
	
	function check_email() {
		if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,12}){1,3}$/.test($.trim($('#reg_email').val()))) 
			return true;
		else {
			$('#reg_email_info').html("不合法的邮件");
			return false;
		}
	}
	
	//表单中专业这一栏
	$('#reg_major').change(function() {
		if (check_major()) {
			$('#reg_major_info').hide();
			$('#reg_major_succ').show();
			$('#reg_major_error').hide();
		}
		else {
			$('#reg_major_info').show();
			$('#reg_major_succ').hide();
			$('#reg_major_error').show();
		}
	});

	function check_major() {
		if ($('#reg_major').val() != 0) {
			return true;
		}
		else {
			$('#reg_major_info').html('请选择一项');
			return false;
		}
	}

	//表单中工作岗位这一栏
	$('#reg_title').change(function() {
		if (check_title()) {
			$('#reg_title_info').hide();
			$('#reg_title_succ').show();
			$('#reg_title_error').hide();
		}
		else {
			$('#reg_title_info').show();
			$('#reg_title_succ').hide();
			$('#reg_title_error').show();
		}
	});

	function check_title() {
		if ($('#reg_title').val() != 0) {
			return true;
		}
		else {
			$('#reg_title_info').html('请选择一项');
			return false;
		}
	} 
});