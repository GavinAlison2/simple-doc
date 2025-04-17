# 配置

利用脚手架快速生成 基于RBAC权限管理的投票系统项目。
后端技术栈: Node.js + Express + JWT + TYPEORM + SQLite3 + TypeORM
前端技术栈: Vue.js + Element UI + Vuex + Vue Router + Axios



```sh
mkdir ts-vote-app
cd ts-vote-app
npm install express-generator-typescript

express-generator-typescript vote-app
cd vote-app
npm install
```

生成的项目大致结构如下:

```markdown
vote-app/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── index.ts
├── test/
├── .env
├── package.json
└── tsconfig.json
```