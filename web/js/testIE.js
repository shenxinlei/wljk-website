(function () {
    var ua = navigator.userAgent.toLowerCase(); //获取浏览器信息字符串
    if((/msie ([\d.]+)/).test(ua) || (/rv:11.0/).test(ua)) {
        window.location.href='404.html';
    }
})();