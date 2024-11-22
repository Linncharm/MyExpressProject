const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// 初始化 Express 应用
const app = express();
const port = 3000;

// 使用 body-parser 解析 JSON 请求
app.use(bodyParser.json());

// 初始化 MySQL 数据库连接
const sequelize = new Sequelize('blog', 'root', 'linncharm', {
    host: '127.0.0.1',
    dialect: 'mysql',
});

// 定义博客模型
const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'blog_information', // 对应 MySQL 中的表名
    timestamps: true,   // 自动添加 createdAt 和 updatedAt
});

// 测试数据库连接
sequelize.authenticate()
    .then(() => {
        console.log('Database connected!');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// 定义 GET 路由，从 MySQL 数据库中获取数据
app.get('/api/v1/blog/get', async (req, res) => {
    try {
        // 查询所有博客数据
        const blogs = await Blog.findAll();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/api/v1/blog/get`);
});
