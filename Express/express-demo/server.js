const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
const userRoutes = require('./routes');
const config = require('./config/default');

//视频的静态文件
app.use('/videos', express.static(path.join(__dirname, 'public/videos')));

//图片的静态文件
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//播客视频的静态文件
app.use('/podcastvideos', express.static(path.join(__dirname, 'public/podcastvideos')));

//播客图片的静态文件
app.use('/podcastimages', express.static(path.join(__dirname, 'public/podcastimages')));

// 配置动态上传后的静态文件目录
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// 配置文章投稿上传后的静态文件目录
app.use('/articles', express.static(path.join(__dirname, 'public/articles')));

// 配置资讯投稿上传后的静态文件目录
app.use('/informations', express.static(path.join(__dirname, 'public/informations')));

// 配置投稿的播客视频封面上传后的静态文件目录
app.use('/podcastpics', express.static(path.join(__dirname, 'public/podcastpics')));

// 配置播客视频上传后的静态文件目录
app.use('/podcasts', express.static(path.join(__dirname, 'public/podcasts')));

// 配置投稿的视频封面上传后的静态文件目录
app.use('/videopics', express.static(path.join(__dirname, 'public/videopics')));

// 配置视频上传后的静态文件目录
app.use('/videodatas', express.static(path.join(__dirname, 'public/videodatas')));

//解析json
app.use(express.json());

// 解析 x-www-form-urlencoded 请求体
app.use(express.urlencoded({ extended: true }));

//跨域
app.use(cors());

app.use(userRoutes);
 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});