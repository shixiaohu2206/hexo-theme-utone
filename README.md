# HEXO-THEME-UTONE

 [Utone](https://github.com/shixiaohu2206/hexo-theme-utone)一个在Hexo博客上开发的主题.

### 安装

``` bash
$ git@github.com:shixiaohu2206/hexo-theme-utone.git themes/utone
```
修改 Hexo 的 `_config.yml` 中的 `theme` 为 `utone`。



### 升级

``` bash
cd themes/landscape
git pull
```

## 配置

``` yml
#UTONE 主题配置

# ========== 资料栏 ========== #
# 头像路径
avatar:
# 博主名字，不填写该字段则默认采用Hexo配置文件中的author字段
author: 时晓虎
# 博客签名
signature:
# 社交账号
social:
  email:
  github:
  weibo:
  zhihu:
  facebook:
  twitter:
  instagram:
  stack-overflow:
  linkedin:
  blog:
  others:
  rss: /atom.xml
# 友链
friends:
  friendA:
  friendB:
  friendC:
# about页面
about:
  enable: true
  image:
# ========== 资料栏 ========== #

# ========== 菜单栏 ========== #
menu:
  Home: /
  Archives: /archives
  About: /About
  Github: https://github.com/ahonn
# ========== 菜单栏 ========== #


# ========== 站点 ========== #
# 网站的title，每篇文章后面也会加上此字段利于SEO
SEO_title:
# 显示在网站banner上的主标题
main_title:
# 显示在网站banner上的副标题
subtitle:
# 主页banner的背景图片
header_image:
# 文章页的默认背景图片
post_header_image:
# 404页的背景图片
_404_image:
# ========== 站点 ========== #

# ========== 评论插件 ========== #
# 目前支持直接添加LiveRe，Disqus，Gitment和畅言，填写插件对应的字段即可启用。
# 如果想添加其他评论插件，在custom.ejs中添加即可。
comment:
  # livere 官网：https://livere.com/
  livere_uid:
  # disqus 官网：https://disqus.com/
  disqus_shortname:
  # 畅言 官网：http://changyan.kuaizhan.com/
  changyan_appid:
  changyan_conf:
  # gitment 官网：https://github.com/imsun/gitment
  gitment_owner:
  gitment_repo:
  gitment_client_id:
  gitment_client_secret:
# ========== 评论插件 ========== #


# ========== 统计 ========== #
# 是否开启不蒜子统计
busuanzi: false
# 百度统计(填写siteID)
baidu_analytics:
# Google统计(填写siteID)
google_analytics:
# CNZZ统计
CNZZ_analytics:
# ========== 统计 ========== #


# ========== 其他 ========== #
# favicon
favicon:
# 首页的文章摘要字数(默认300)
truncate_length: 200
# enable toc
toc: true
#代码高亮css(highlight.js)
highlight_theme: zenburn
# ========== 其他 ========== #
```

- **menu** - Navigation menu
- **rss** - RSS link
- **excerpt_link** - "Read More" link at the bottom of excerpted articles. `false` to hide the link.
- **fancybox** - Enable [Fancybox]
- **sidebar** - Sidebar style. You can choose `left`, `right`, `bottom` or `false`.
- **widgets** - Widgets displaying in sidebar
- **google_analytics** - Google Analytics ID
- **favicon** - Favicon path
- **twitter** - Twiiter ID
- **google_plus** - Google+ ID

## Features

### Fancybox

Landscape uses [Fancybox] to showcase your photos. You can use Markdown syntax or fancybox tag plugin to add your photos.

```
![img caption](img url)

{% fancybox img_url [img_thumbnail] [img_caption] %}
```

### Sidebar

You can put your sidebar in left side, right side or bottom of your site by editing `sidebar` setting.

Landscape provides 5 built-in widgets:

- category
- tag
- tagcloud
- archives
- recent_posts

All of them are enabled by default. You can edit them in `widget` setting.

## Development

### Requirements

- [Grunt] 0.4+
- Hexo 2.4+

### Grunt tasks

- **default** - Download [Fancybox] and [Font Awesome].
- **fontawesome** - Only download [Font Awesome].
- **fancybox** - Only download [Fancybox].
- **clean** - Clean temporarily files and downloaded files.

[Hexo]: http://zespia.tw/hexo/
[Fancybox]: http://fancyapps.com/fancybox/
[Font Awesome]: http://fontawesome.io/
[Grunt]: http://gruntjs.com/
