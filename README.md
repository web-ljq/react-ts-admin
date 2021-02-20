# 文件说明

- `components`：公共组件
- `config`：配置文件
- `pages`：页面

  - /account/index.jsx：用户列表

  - /article/index.jsx：文章列表

  - /classify/index.jsx：分类卡片

  - /leave_message/index.jsx：留言列表

# css 类名层级

1 `.admin__wrapper`
2 `.admin__wrapper .route__view_container`
3 所有通过路由显示的页面都显示在《2》的元素下

    - `.admin__wrapper .route__view_container .container`

4 头部元素

     - `.admin__wrapper .route__view_container .header__nav`

5 页脚元素

     - `.admin__wrapper .route__view_container .footer`

## route

- `admin__home`：控制台 显示一些数据，和一些网站上的改变等
- `article__list`：显示文章列表，分页，以及添加文章，修改文章，删除
- `article__form`：编辑文章的页面
- `classify__card`：分类管理，有添加，修改，删除
- `user__manage`：编辑个人信息

# css 颜色

- header： #063146
