<?php 


	require 'config.php';

	$query = mysql_query("select name from regnames where name='{$_POST['reg_realname']}'") or die("SQL错误！");

	if (mysql_fetch_array($query, MYSQL_ASSOC)) {
		$query2 = mysql_query("select hasaccount from regnames where name='{$_POST['reg_realname']}'") or die("SQL错误！");
		$row = mysql_fetch_array($query2);
		//print_r($row) ;
		if ($row['hasaccount'] == 1) {
			echo 1;//找到了数据，但已经注册过了
		}
		else {
			echo 3;//可以注册的值
		}
	}
	else {
		echo 2;//找不到数据
	}
	
	mysql_close();





?>