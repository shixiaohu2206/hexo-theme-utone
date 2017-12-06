/**
 * 公共js
 * author 632918195@qq.com
 * 2017/12/04
 */
;var UTONE = UTONE || {};

UTONE.comment = (function () {
    "use strict";

    /**
     * 初始化事件
     */
    function _initEvents() {

        //点击X，去除父元素li
        $(document).on('click', '.top-col-x', function () {
            if ($(this).hasClass('home')) {
                alert('首页不能删除哦');
            } else {
                location.href="/";
            }
        });
    }

    /**
     * 获取页面长度，填充左侧数字列
     */
    function _fillNumCol() {
        //获取右侧框架高度
        var _height = $('.right-col').height();
        //数字单列高度
        var _singleH = 21;
        //列数
        var _col = Math.ceil(_height / _singleH) + 10;
        //填充页面
        var _html = '';

        _html += '<ul>';
        for (var i = 1; i < _col; i++) {
            _html += '<li>'+ i +'</li>';
        }
        _html += '</ul>';
        $('#iframe-right .left-col').append(_html);
    }

    function _init() {

        //初始化事件
        _initEvents();

        //获取页面长度，填充左侧数字列
        _fillNumCol();
    }

    return {
        init : _init
    }
})();


