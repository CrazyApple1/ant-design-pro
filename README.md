# PKAQ Design => Ant Design Pro

### 交流QQ群： 83864896

---

**TODO**

- [ ] 采用tab方式打开新增页面
- [ ] 导航tab
- [ ] 封装treegrid,支持异步加载
- [ ] 拖拽排序
- [ ] 采用axios
- [ ] react-intl业务文案国际化
- [ ] 主题美化...
- [x] ~~主题切换~~
- [x] ~~PinICON~~
- [x] ~~远程加载菜单~~
- [x] ~~真·面包屑~~

TIP: 代码里针对namespace和model文件名进行了忽略大小写的处理

>问题
- 不支model花式命名：当期版本model的文件名必须与所指定的namespace一致，因为router.js中是通过读取文件名来判断已经注册的model
  中是否存在该model的，又由于存在namespace的唯一性约束，所以当两者不一致时无法通过此种方式判断对应文件名的model是否已经注册导致异常
**TODO**
---
- [ ] 仓库管理
- [ ] 入库单
- [ ] 出库单
- [ ] 调拨单
- [ ] 库存台帐
- [ ] 库存盘点

- [ ] 门店管理
- [ ] 销售单
- [ ] 店员管理
- [ ] 会员管理（指静脉）

--- 系统监控
- [x] ~~SQL监控~~
- [x] ~~hystrix~~
- [x] ~~swagger~~
- [ ] 业务日志
- [ ] 登录日志

--- 系统管理
- [ ] 子系统管理
- [ ] 系统接口
- [ ] 菜单管理
- [ ] 用户管理
- [ ] 组织（部门）管理
- [ ] 角色（权限）管理 6表权限RBAC 精确到按钮
- [ ] 字典管理

## Usage
```bash
$ git clone 
$ yarn install
$ yarn start         # visit http://localhost:8000
```

## Compatibility
Modern browsers and IE11.

## Contributing
Any Contribution of following ways will be welcome:
- Use Ant Design Pro in your daily work.
- Submit [issue](http://github.com/ant-design/ant-design-pro/issues) to report bug or ask questions.
- Propose [pull request](http://github.com/ant-design/ant-design-pro/pulls) to improve our code.
