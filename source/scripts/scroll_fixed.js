var scroll_fixed = (function() {
  {
    /**
     * 滚动固定左侧栏
     **/
    function _scrollFixed() {
      /**
       * 原生offsetTop取值为相对于父元素， jquery的offset().top是取的距离屏幕顶部的距离
       * 所以这里取父元素的offestTop
       **/
      let _parentDom = document.getElementById('main-left')
      let _offectTop = _parentDom.offsetTop

      let _needTopDom = document.getElementById('introduce')

      window.onscroll = function() {
        /**
         * 获取滚动距离document的高度
         *
         * 声明了<!DOCTYPE html>，使用document.documentElement.scrollTop
         * 没有声明，使用document.body.scrollTop
         *
         **/
        let _scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop

        // 32为距离顶部的流出的距离相当于2rem
        if (_scrollTop > _offectTop - 32) {
          _needTopDom.classList.add('fixed')
        } else {
          _needTopDom.classList.remove('fixed')
        }
      }
    }
  }
  function init() {
    _scrollFixed()
  }

  return { init: init }
})()
