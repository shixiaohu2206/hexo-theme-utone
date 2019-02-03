/**
 * 搜索弹出框
 */
var siteSearch = (function() {
  let _blogData = {} // 远端拉取的博客数据
  let _imgDom = document.getElementById('search-img')
  let _containerDom = document.getElementById('container')
  let _searchPopDom = document.getElementById('search-pop')
  let _searchInputDom = document.getElementById('search-input')
  let _searchCloseDom = document.getElementById('search-close')
  let _searchBodyDom = document.getElementById('search-body')
  let _searchUlDom = _searchBodyDom.querySelector('ul')

  function showPop() {
    _searchPopDom.style.display = 'block'
    // 背景虚化
    _containerDom.classList.add('filter')
  }
  function hidePop() {
    _searchPopDom.style.display = 'none'
    // 清楚背景虚化
    _containerDom.classList.remove('filter')
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
      <div class="search-tag">{TAG}</div>
      <div class="search-date">{DATE}</div>
      </a>
    </li>`

  // 监听input change事件，并发送POST请求，获取结果
  function inputChange() {
    _searchInputDom.addEventListener('input', function(e) {
      let _val = e.target.value
      // 尝试获取数据
      tryPost().then(posts => {
        console.log(posts)
        if (posts.length) {
          let _tag = '',
            _li = ''
          for (let i = 0; i < posts.length; i++) {
            if (posts[i].tags.length) {
              for (let j = 0; j < posts[i].tags.length; j++) {
                _tag += `<a href="${posts[i].tags[j].permalink}">#${
                  posts[i].tags[j].name
                }</> &nbsp&nbsp`
              }
            }

            _li += _temp
              .replace('{HREF}', posts[i].permalink)
              .replace('{TITLE}', posts[i].title)
              .replace('{TAG}', _tag)
              .replace('{DATE}', posts[i].date)
          }
          _searchUlDom.innerHTML = _li
        }
      })
    })
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
