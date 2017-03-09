<?php 
/****
布尔教育 高端PHP培训
培  训: http://www.itbool.com
论  坛: http://www.zixue.it
****/
sleep(1);


require 'config.php';

$_pass = sha1($_POST['login_pass']);
$query = mysql_query("select username, password from login where username='{$_POST["login_user"]}' and 
password='{$_pass}'") or die ("SQL 错误!");

if (mysql_fetch_array($query, MYSQL_ASSOC)) {
	echo 1;
}
else {
	echo 0;
}

mysql_close();

?>