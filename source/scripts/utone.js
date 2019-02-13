'use strict'

let scroll = (function() {
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
    let _topDom = document.getElementById('top')

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
        _topDom.style.bottom = '2rem'
      } else {
        _needTopDom.classList.remove('fixed')
        _topDom.style.bottom = ''
      }
    }
  }

  /**
   * 返回顶部
   **/
  function _scrollToTop() {
    let _topDom = document.getElementById('top')
    let _containerDom = document.getElementById('container')

    _topDom.addEventListener('click', function() {
      _containerDom.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function init() {
    _scrollFixed()
    _scrollToTop()
  }

  return { init: init }
})()

/**
 * 搜索弹出框
 */
let siteSearch = (function() {
  let _blogData = {} // 远端拉取的博客数据
  let _htmlDom = document.querySelector('html')
  let _imgDom = document.getElementById('search-img')
  let _containerDom = document.getElementById('container')
  let _searchMaskDom = document.getElementById('search-mask')
  let _searchPopDom = document.getElementById('search-pop')
  let _searchInputDom = document.getElementById('search-input')
  let _searchCloseDom = document.getElementById('search-close')
  let _searchBodyDom = document.getElementById('search-body')
  let _searchUlDom = _searchBodyDom.querySelector('ul')

  function showPop() {
    // 展示
    _searchPopDom.classList.add('fadein')
    // _searchPopDom.style.display = 'block'
    _searchMaskDom.style.display = 'block'
    // 背景虚化
    _containerDom.classList.add('filter')
    // 页面禁止滚动
    _htmlDom.classList.add('overflow_hidden')
  }
  function hidePop() {
    // 隐藏
    _searchPopDom.classList.remove('fadein')
    _searchMaskDom.style.display = 'none'
    // 清楚背景虚化
    _containerDom.classList.remove('filter')
    // 页面允许滚动
    _htmlDom.classList.remove('overflow_hidden')
    // 清除本次搜索记录
    _searchUlDom.innerHTML = ''
    _searchInputDom.value = ''
  }

  // 阻止冒泡
  function stopPropagation(e) {
    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true)
  }

  // 点击搜索按钮
  function clickSearchImg() {
    _imgDom.addEventListener('click', function(e) {
      showPop()
      stopPropagation(e)
    })
  }

  //点击弹出框close按钮
  function clickSearchClose() {
    _searchCloseDom.addEventListener('click', function() {
      hidePop()
    })
    _searchPopDom.addEventListener('click', function(e) {
      stopPropagation(e)
    })
  }

  // 点击弹框以外，关闭弹窗
  function clickOtherClose() {
    document.addEventListener('click', function() {
      hidePop()
    })
  }

  // post请求
  function tryPost() {
    if (!Object.keys(_blogData).length) {
      return fetch('/content.json', {
        method: 'GET'
      })
        .then(function(response) {
          return response.json()
        })
        .then(function(json) {
          _blogData = json
          return _blogData
        })
        .catch(function(error) {
          console.log('fetch failed', error)
        })
    } else {
      return new Promise(function(resolve, reject) {
        resolve(_blogData)
      })
    }
  }

  let _temp = `<li>
        <a href="{HREF}">
        <div class="search-title">{TITLE}</div>
        <div class="search-date">{DATE}</div>
        <div class="search-tag">{TAG}</div>
        </a>
      </li>`

  /**
   * 匹配
   */
  function matcher(post, key) {
    // 关键字 => 正则，空格隔开的看作多个关键字
    // a b c => /a|b|c/gmi
    // g 全局匹配，m 多行匹配，i 不区分大小写
    var regExp = new RegExp(key.replace(/[ ]/g, '|'), 'gmi')

    // 匹配优先级：title > tags > text
    return (
      regExp.test(post.title) ||
      post.tags.some(function(tag) {
        return regExp.test(tag.name)
      }) ||
      regExp.test(post.text)
    )
  }

  /**
   * 消抖
   * 当调用函数n秒后，才会执行该动作，若在这n秒内又调用该函数则将取消前一次并重新计算执行时间
   * @param {*} fn
   * @param {*} delay
   */
  function debounce(fn, delay) {
    let _this = this,
      timer = null

    return function(e) {
      if (timer) {
        clearTimeout(timer)
        timer = setTimeout(function() {
          fn.call(_this, e.target.value)
        }, delay)
      } else {
        timer = setTimeout(function() {
          fn.call(_this, e.target.value)
        }, delay)
      }
    }
  }

  // 尝试获取数据
  function tryInnerHTML(key) {
    if (key) {
      // 尝试获取数据
      tryPost().then(posts => {
        if (posts.length) {
          let result
          result = posts.filter(post => {
            return matcher(post, key)
          })

          if (result.length) {
            let _li = ''
            for (let i = 0; i < result.length; i++) {
              let _tag = ''
              if (result[i].tags.length) {
                for (let j = 0; j < result[i].tags.length; j++) {
                  _tag += `<a href="${result[i].tags[j].permalink}">#${
                    result[i].tags[j].name
                  }</a> &nbsp&nbsp`
                }
              }

              _li += _temp
                .replace('{HREF}', result[i].permalink)
                .replace('{TITLE}', result[i].title)
                .replace('{TAG}', _tag)
                .replace('{DATE}', result[i].date)
            }
            _searchUlDom.innerHTML = _li
          } else {
            _searchUlDom.innerHTML = `<li><a href="#">无结果</a></li>`
          }
        }
      })
    } else {
      _searchUlDom.innerHTML = ''
    }
  }

  // 监听input 事件，并发送POST请求，获取结果
  function inputChange() {
    _searchInputDom.addEventListener('input', debounce(tryInnerHTML, 1000))
  }

  // 绑定点击事件
  function bindClick() {
    clickSearchImg()
    clickSearchClose()
    clickOtherClose()
    inputChange()
  }

  function init() {
    bindClick()
  }

  return { init: init }
})()
