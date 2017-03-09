<?php 
/****
布尔教育 高端PHP培训
培  训: http://www.itbool.com
论  坛: http://www.zixue.it
****/
date_default_timezone_set('Asia/Shanghai');
sleep(1);


require 'config.php';

$_regtime = date('y-m-d h:i:s' ,time());


$query = "INSERT INTO login (username, password, realname, telephone, email, major, title, regtime) 
		VALUES ('{$_POST['reg_username']}', sha1('{$_POST['reg_password']}'), 
			'{$_POST['reg_realname']}', '{$_POST['reg_telephone']}', 
			'{$_POST['reg_email']}', '{$_POST['reg_major']}','{$_POST['reg_title']}','{$_regtime}')";
mysql_query($query) or die('新增失败！'.mysql_error());
echo mysql_affected_rows();
mysql_close();
?>