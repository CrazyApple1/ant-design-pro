# PKAQ Design => Ant Design Pro

## 交流QQ群： 83864896

---

TIP: 代码里针对namespace和model文件名进行了忽略大小写的处理

>问题
- 不支model花式命名：当期版本model的文件名必须与所指定的namespace一致，因为router.js中是通过读取文件名来判断已经注册的model
  中是否存在该model的，又由于存在namespace的唯一性约束，所以当两者不一致时无法通过此种方式判断对应文件名的model是否已经注册导致异常


## Usage
```bash
$ git clone 
$ yarn install
$ yarn start         # visit http://localhost:8000
```

## Compatibility
Modern browsers and IE11.

## Contributing

