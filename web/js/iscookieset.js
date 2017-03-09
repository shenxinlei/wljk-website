(function () {
    //判断是否设置了cookie
    if ($.cookie('username') == null) {
        window.location.href = "index.html";
    }   
})();