(function () {
    //判断是否设置了cookie
    if ($.cookie('username') != null) {
    	//alert('执行到这里了');
        window.location.href = "main.html";
    }   
    else {
    	//alert('不能跳转');
    }
})();