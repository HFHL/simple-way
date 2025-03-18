# Simple Way AI 官网 - React 版本

这是使用 React 重新构建的 Simple Way AI 公司官方网站，网站展示了公司的业务、团队成员以及项目案例。

## 技术栈

- React 18
- React Router v6
- Styled Components
- Framer Motion

## 项目结构

```
/src
  /api - API服务
    chatApi.js - 聊天API服务
  /assets - 静态资源
    /images - 图片资源
  /components - 组件
    /chat - 聊天相关组件
      ChatWidget.js - 聊天气泡组件
    /home - 首页相关组件
      Hero.js - 首页顶部Hero区域
      About.js - 关于我们部分
      Capabilities.js - 能力展示部分
      Portfolio.js - 项目案例部分
      Contact.js - 联系我们部分
    /layout - 布局组件
      Layout.js - 页面布局组件
      Navbar.js - 导航栏组件
      Footer.js - 页脚组件
  /context - React上下文
  /hooks - 自定义hooks
  /pages - 页面组件
    HomePage.js - 首页
    TeamPage.js - 团队页面
  App.js - 主应用组件
  index.js - 入口文件
```

## 功能特点

1. **响应式设计**：适配不同设备尺寸
2. **动画效果**：使用Framer Motion实现丰富的动画效果
3. **聊天功能**：集成AI聊天助手，提供在线咨询
4. **组件化结构**：清晰的组件结构，便于维护和扩展
5. **平滑滚动**：实现页内锚点平滑滚动

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

### 构建生产版本

```bash
npm run build
```

## 注意事项

1. 聊天API使用了GPT-4模型，需要确保API密钥有效
2. 图片资源路径使用相对路径，方便部署
3. 团队成员信息直接在TeamPage.js中维护，如有更新请直接修改该文件

## 扩展建议

1. 添加博客/文章模块
2. 集成CMS系统便于内容管理
3. 增加多语言支持
4. 添加项目详情页面 