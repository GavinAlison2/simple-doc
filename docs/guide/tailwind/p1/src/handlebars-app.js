const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

// 读取模板文件
const templateSource = fs.readFileSync(path.join(__dirname, '003-hover.html'), 'utf8');
const template = Handlebars.compile(templateSource);

// 定义数据
const people = [
    {
        imageUrl: "https://example.com/image1.jpg",
        name: "John Doe",
        email: "john@example.com"
    },
    {
        imageUrl: "https://example.com/image2.jpg",
        name: "Jane Smith",
        email: "jane@example.com"
    }
];

// 渲染模板
const html = template(people);
console.log(html);