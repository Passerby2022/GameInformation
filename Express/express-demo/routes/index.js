const express = require('express');
const router = express.Router();
const dbOperations = require('../model/db');
const crypto = require('crypto');
const path = require('path');
const { formidable } = require('formidable');

const generateRandomToken = (length = 10) => {
    return crypto.randomBytes(length).toString('hex');
}

//登录接口
router.get('/user', async (req, res) => {
    try {
        const username = req.query.username;
        const password = req.query.password;
        console.log(username);
        console.log(password);
        const results = await dbOperations.queryUserByUsername(username, password);
        console.log(results);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//注册接口
router.post('/register', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const phonenumber = req.body.phonenumber;
        const token = generateRandomToken();
        console.log(username);
        console.log(password);
        console.log(token);
        const results = await dbOperations.upsertUser(username, password, phonenumber, token);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取首页资讯数据接口
router.get('/getHomeInformation', async (req, res) => {
    try {
        const results = await dbOperations.getHomeInformation();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取用户头像数据接口
router.get('/getUserImage', async (req, res) => {
    try {
        const username = String(req.query.username);
        const results = await dbOperations.getUserImage(username);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取首页图片数据接口
router.get('/getHomeImage', async (req, res) => {
    try {
        const results = await dbOperations.getHomeImage();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取游戏电影动态
router.get('/getGameData', async (req, res) => {
    try {
        const results = await dbOperations.getGameData();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取推荐
router.get('/getRecommendData', async (req, res) => {
    try {
        const results = await dbOperations.getRecommendData();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取综合
router.get('/getComperensive', async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const results = await dbOperations.getComperensive(limit);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取视频数据
router.get('/getVideoData', async (req, res) => {
    try {
        const results = await dbOperations.getVideoData();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取视频分页数据
router.get('/getVideoPagingData', async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const offset = Number(req.query.offset);
        const results = await dbOperations.getVideoPagingData(limit, offset);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取精选数据
router.get('/getSelectedData', async (req, res) => {
    try {
        const results = await dbOperations.getSelectedData();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取博客推荐数据
router.get('/getPodcastData', async (req, res) => {
    try {
        const results = await dbOperations.getPodcastData();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取播客推荐数据
router.get('/getPodcastLimitData', async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const results = await dbOperations.getPodcastLimitData(limit);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取播客分页数据
router.get('/getPodcastPagingData', async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const offset = Number(req.query.offset);
        const results = await dbOperations.getPodcastPagingData(limit, offset);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取讨论的数据
router.get('/getGameNameData', async (req, res) => {
    try {
        const results = await dbOperations.getGameNameData();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取文章的数据
router.get('/getArticleData', async (req, res) => {
    try {
        const results = await dbOperations.getArticleData();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取文章分页的数据
router.get('/getArticlePagingData', async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const offset = Number(req.query.offset);
        const results = await dbOperations.getArticlePagingData(limit, offset);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取资讯分页的数据
router.get('/getPageInformation', async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const offset = Number(req.query.offset);
        const results = await dbOperations.getPageInformation(limit, offset);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取热门游戏列表的数据
router.get('/getGameTable', async (req, res) => {
    try {
        const results = await dbOperations.getGameTable();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取最新游戏列表的数据
router.get('/getNewGameData', async (req, res) => {
    try {
        const results = await dbOperations.getNewGameData();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取热门最新游戏列表的数据
router.get('/getHotNewGameData', async (req, res) => {
    try {
        const results = await dbOperations.getHotNewGameData();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/getVideoLimitData', async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const results = await dbOperations.getVideoLimitData(limit);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取分组数据
router.get('/getGroupData', async (req, res) => {
    try {
        const results = await dbOperations.getGroupData();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//获取分组筛选的数据
router.get('/getChooseGroupData', async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const results = await dbOperations.getChooseGroupData(limit);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//修改账号名称
router.post('/changeUsername', async (req, res) => {
    try {
        const newUsername = req.body.newUsername;
        const oldUsername = req.body.oldUsername;
        console.log(newUsername);
        console.log(oldUsername);
        const results = await dbOperations.changeUsername(newUsername, oldUsername);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//修改密码
router.post('/changePassword', async (req, res) => {
    try {
        const newPassword = req.body.newPassword;
        const oldUsername = req.body.oldUsername;
        console.log(newPassword);
        console.log(oldUsername);
        const results = await dbOperations.changePassword(newPassword, oldUsername);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//上传文章投稿的数据
router.post('/contributeArticle', async (req, res) => {
    try {
        const title = req.body.title;
        const article = req.body.article;
        const image_url = req.body.image_url;
        const header_url = req.body.header_url;
        const name = req.body.name;
        const time = req.body.time;
        const auditing = req.body.auditing;
        console.log(title);
        console.log(article);
        console.log(image_url);
        console.log(auditing);
        console.log(header_url);
        console.log(name);
        console.log(time);
        console.log(auditing);
        console.log(req.body);
        const results = await dbOperations.contributeArticle(title, article, image_url, header_url, name, time, auditing);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//上传资讯投稿的数据
router.post('/contributeInformation', async (req, res) => {
    try {
        const title = req.body.title;
        const time = req.body.time;
        const image_url = req.body.image_url;
        const article = req.body.article;
        const header_url = req.body.header_url;
        const name = req.body.name;
        const auditing = req.body.auditing;
        console.log(title);
        console.log(time);
        console.log(image_url);
        console.log(article);
        console.log(header_url);
        console.log(name);
        console.log(auditing);
        console.log(req.body);
        const results = await dbOperations.contributeInformation(title, time, image_url, article, header_url, name, auditing);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//上传投稿的播客视频数据
router.post('/contributePodcast', async (req, res) => {
    try {
        const image_url = req.body.image_url;
        const title = req.body.title;
        const video_url = req.body.video_url;
        const header_url = req.body.header_url;
        const name = req.body.name;
        const time = req.body.time;
        const good = req.body.good;
        const comment = req.body.comment;
        const auditing = req.body.auditing;
        console.log(image_url);
        console.log(title);
        console.log(video_url);
        console.log(header_url);
        console.log(name);
        console.log(time);
        console.log(good);
        console.log(comment);
        console.log(auditing);
        console.log(req.body);
        const results = await dbOperations.contributePodcast(image_url, title, video_url, header_url, name, time, good, comment, auditing);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//上传投稿的视频数据
router.post('/contributeVideo', async (req, res) => {
    try {
        const image_url = req.body.image_url;
        const title = req.body.title;
        const video_url = req.body.video_url;
        const header_url = req.body.header_url;
        const name = req.body.name;
        const time = req.body.time;
        const good = req.body.good;
        const comment = req.body.comment;
        const auditing = req.body.auditing;
        console.log(image_url);
        console.log(title);
        console.log(video_url);
        console.log(header_url);
        console.log(name);
        console.log(time);
        console.log(good);
        console.log(comment);
        console.log(auditing);
        console.log(req.body);
        const results = await dbOperations.contributeVideo(image_url, title, video_url, header_url, name, time, good, comment, auditing);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//上传分组的动态的数据
router.post('/groupPostUpdate', async (req, res) => {
    try {
        const title = req.body.title;
        const image_url = req.body.image_url;
        const flag = req.body.flag;
        const auditing = req.body.auditing;
        const header_url = req.body.header_url;
        const name = req.body.name;
        const time = req.body.time;
        console.log(title);
        console.log(image_url);
        console.log(flag);
        console.log(auditing);
        console.log(header_url);
        console.log(name);
        console.log(time);
        console.log(req.body);
        const results = await dbOperations.groupPostUpdate(title, image_url, flag, auditing, header_url, name, time);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//动态的图片上传地址
router.post('/file', (req, res, next) => {
    const incomingForm = formidable({
        uploadDir: path.resolve(__dirname, '../public/uploads'),
        keepExtensions: true,
    });

    incomingForm.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        //console.log('files.file',files.file[0]);
        // 假设只上传一个文件
        const uploadedFile = files.file[0];
        const imgString = `http://localhost:3000/uploads/${uploadedFile.newFilename}`;

        res.send(imgString);
    });
});

//文章投稿的图片上传地址
router.post('/article', (req, res, next) => {
    const incomingForm = formidable({
        uploadDir: path.resolve(__dirname, '../public/articles'),
        keepExtensions: true,
    });

    incomingForm.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        //console.log('files.file',files.file[0]);
        // 假设只上传一个文件
        const uploadedFile = files.file[0];
        const imgString = `http://localhost:3000/articles/${uploadedFile.newFilename}`;

        res.send(imgString);
    });
});

//资讯投稿的图片上传地址
router.post('/information', (req, res, next) => {
    const incomingForm = formidable({
        uploadDir: path.resolve(__dirname, '../public/informations'),
        keepExtensions: true,
    });

    incomingForm.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const uploadedFile = files.file[0];
        const imgString = `http://localhost:3000/informations/${uploadedFile.newFilename}`;

        res.send(imgString);
    });
});

//投稿的播客视频封面上传的地址
router.post('/podcastpic', (req, res, next) => {
    const incomingForm = formidable({
        uploadDir: path.resolve(__dirname, '../public/podcastpics'),
        keepExtensions: true,
    });

    incomingForm.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const uploadedFile = files.file[0];
        const imgString = `http://localhost:3000/podcastpics/${uploadedFile.newFilename}`;

        res.send(imgString);
    });
});

//投稿的播客视频上传的地址
router.post('/podcast', (req, res, next) => {
    const incomingForm = formidable({
        uploadDir: path.resolve(__dirname, '../public/podcasts'),
        keepExtensions: true,
    });

    incomingForm.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        const uploadedFile = files.file[0];
        const videoUrl = `http://localhost:3000/podcasts/${uploadedFile.newFilename}`;

        res.send({
            success: true,
            message: 'File uploaded successfully',
            videoUrl: videoUrl,
        });
    });
});

//投稿的视频封面上传的地址
router.post('/videopic', (req, res, next) => {
    const incomingForm = formidable({
        uploadDir: path.resolve(__dirname, '../public/videopics'),
        keepExtensions: true,
    });

    incomingForm.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const uploadedFile = files.file[0];
        const imgString = `http://localhost:3000/videopics/${uploadedFile.newFilename}`;

        res.send(imgString);
    });
});

//投稿的视频上传的地址
router.post('/videodata', (req, res, next) => {
    const incomingForm = formidable({
        uploadDir: path.resolve(__dirname, '../public/videodatas'),
        keepExtensions: true,
    });

    incomingForm.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        const uploadedFile = files.file[0];
        const videoUrl = `http://localhost:3000/videodatas/${uploadedFile.newFilename}`;

        res.send({
            success: true,
            message: 'File uploaded successfully',
            videoUrl: videoUrl,
        });
    });
});

module.exports = router;