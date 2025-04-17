npm i --save-dev @types/express @types/cors ts-node typescript
npm i -D typescript ts-node tslib @types/node  sqlite3 jsonwebtoken bcryptjs
npm i --save-dev @types/jsonwebtoken

npm uninstall express

npm install --global --production windows-build-tools@4.0.0

npm uninstall -g node-gyp
npm install -g node-gyp

npm config set audit false
npm install --no-audit
npm install --no-audit  --verbose

npm install bcrypt --build-from-source
npm install bcryptjs --verbose

npm install node-gyp -g --verbose

npm install --legacy-peer-deps --verbose

## [源码调试之npm install ](https://juejin.cn/post/7074934981625118750)


git bash
tree -I node_modules .

npm uninstall typeorm
npm install typeorm

npm run start


注意tsconfig.json的配置项

```json
{
    "compilerOptions": {
        "target": "es6",  // 改成 es6
        "module":"commonjs", // 改成 commonjs
        "esModuleInterop": true, 
        // "sourceMap": true, // 生成相应的.map文件
        "outDir": "./dist",
        "baseUrl": "./",
        "incremental": true,
        "moduleResolution": "node", // 解析模块路径
        "experimentalDecorators": true, // 装饰器
        "emitDecoratorMetadata": true, //   装饰器元数据
        "skipLibCheck": true,
        "forceConsistent CasingInFileNames": true,
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "strictPropertyInitialization": false,// 严格属性初始化
        "noImplicitThis": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "types": ["node"],
        "lib": ["es6", "dom"]
    },

}
```

需要的package.json的配置项

```json
{
    "scripts": {
        "start": "ts-node src/index.ts",
        "dev": "nodemon --watch 'src/**/*.ts' --ignore 'src/**/*.spec.ts' --exec 'ts-node' src/index.ts"
    },
    "dependencies": {
        "express": "^4.17.1", // web框架
        "cors": "^2.8.5", // 跨域
        "typeorm": "^0.2.34", // ORM
        "sqlite3": "^5.0.2", // 数据库
        "reflect-metadata": "^0.1.13" // 装饰器元数据
    },
    "devDependencies": {
        "@types/express": "^4.17.13", // 类型定义express
        "@types/cors": "^2.8.10", // 跨域
        "ts-node": "^10.4.0", // 运行ts
        "typescript": "^4.5.4", // 编译器ts
        "@types/node": "^16.11.3", // 类型定义
        "nodemon": "^2.0.15", // 监控文件变化并重启服务
        "@types/jsonwebtoken": "^8.5.5"
        }
    }
}
```

还需要在应用程序的入口文件中导入 `import "reflect-metadata";` 才能使装饰器正常工作。


## [TypeScript 入门教程](https://juejin.cn/post/6844903992550678535)
