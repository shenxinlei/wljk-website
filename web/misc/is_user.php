<?php 

	require 'config.php';

	$query = mysql_query("select username from login where username='{$_POST['reg_username']}'") or die("SQL错误！");

	if (mysql_fetch_array($query, MYSQL_ASSOC)) {
		echo 1;
	}
	else {
		echo 2;
	}
	
	mysql_close();

?>