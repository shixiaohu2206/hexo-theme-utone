# HEXO-THEME-UTONE

> [Utone](https://github.com/shixiaohu2206/hexo-theme-utone)是一个在 Hexo 博客上开发的主题.
> [Demo](https://shixiaohu2206.github.io/index.html) （myself blog）

### 介绍

这是一款及其简单素雅的 Hexo 主题（懒）

### 初衷

写博客的初衷就是为了记录学习的过程与生活的点滴。文字的突出展示，与简单风格是我完成这个主题的初衷。

### 安装

```bash
git clone https://github.com/shixiaohu2206/hexo-theme-utone.git themes/utone
```

修改 Hexo 的根目录下的 `_config.yml` 中的 `theme` 为 `utone`

### 配置

```yml
# 菜单导航
menu:
  home: /
  archives: /archives
  about: /about
rss: /atom.xml

#logo
logo: /images/logo.png

# favicon
favicon: /images/favicon.ico
```

### ABOUT 页面

about 页面，没有单独写一个 layout，使用 markdown 文件来进行展示

```bash
hexo new page about
```

### 兼容性

使用了 Flex 布局，不支持 IE8

### TODO

> 许多需要完善，列出以下 Todo List

1. 响应式
2. 博客文章评论
3. 文章浏览次数统计
4. 相片册页面
5. RSS 订阅
6. 赞赏功能
7. 文章搜索功能
