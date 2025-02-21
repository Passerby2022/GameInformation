const mysql = require('mysql');
const config = require('../config/default');

// 使用连接池创建数据库连接
const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.DB,
});

pool.on('acquire', connection => {
    console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', connection => {
    console.log('Connection %d connected as id %s', connection.threadId, connection.id);
});

pool.on('enqueue', () => {
    console.log('Waiting for available connection slot');
});

pool.on('release', connection => {
    console.log('Connection %d released', connection.threadId);
});

pool.on('error', err => {
    console.error('Database connection pool error: ' + err.stack);
    throw err; // 或者根据您的错误处理策略进行处理
});

// 查询函数
const dbOperations = {
    //登录
    queryUserByUsername: (username, password) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM usertable WHERE username = ? AND password = ?`, [username, password], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },
    //注册
    //查询是否已有账号
    queryAccount: (username) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM usertable WHERE username = ?`, [username], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },
    //注册插入账号
    insertUser: (username, password, phonenumber, token) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                const query = `INSERT INTO usertable (username, password, phonenumber, token) VALUES (?, ?, ?, ?)`;
                connection.query(query, [username, password, phonenumber, token], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results.insertId);
                });
            });
        });
    },
    //整合
    upsertUser: (username, password, phonenumber, token) => {
        return dbOperations.queryAccount(username)
            .then(results => {
                if (results.length > 0) {
                    throw new Error('Username already exists');
                } else {
                    return dbOperations.insertUser(username, password, phonenumber, token);
                }
            });
    },
    //获取首页资讯数据
    getHomeInformation: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.information WHERE auditing = 'true';`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取首页图片数据
    getHomeImage: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.homeimage;`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取用户头像
    getUserImage: (username) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT image_url FROM usertable WHERE username = ?`, [username], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取游戏电影动态
    getGameData: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.gamedata;`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取推荐数据
    getRecommendData: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.recommend;`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取综合
    getComperensive: (limit) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.comprehensive LIMIT ?;`, [limit], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取视频数据
    getVideoData: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.videodata WHERE auditing = 'true';`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取视频分页数据
    getVideoPagingData: (limit, offset) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.videodata WHERE auditing = 'true' LIMIT ? OFFSET ?;`, [limit, offset], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取精选数据
    getSelectedData: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM videodata WHERE auditing = 'true' ORDER BY good DESC LIMIT 5;`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取播客数据
    getPodcastData: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.podcastdata WHERE auditing = 'true';`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取播客推荐数据
    getPodcastLimitData: (limit) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.podcastdata WHERE auditing = 'true' LIMIT ?;`, [limit], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取播客分页数据
    getPodcastPagingData: (limit, offset) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.podcastdata WHERE auditing = 'true' LIMIT ? OFFSET ?;`, [limit, offset], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取讨论的数据
    getGameNameData: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.gamenamedata;`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取文章的数据
    getArticleData: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.articledata WHERE auditing = 'true';`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取文章的分页数据
    getArticlePagingData: (limit, offset) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.articledata LIMIT ? OFFSET ?;`, [limit, offset], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取资讯的分页数据
    getPageInformation: (limit, offset) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.information WHERE auditing = 'true' LIMIT ? OFFSET ?;`, [limit, offset], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取游戏列表的数据
    getGameTable: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.gametable;`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取最新游戏列表的数据
    getNewGameData: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.newgametable;`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取热门最新游戏列表的数据
    getHotNewGameData: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.hotnewgametable;`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取热门最新游戏列表的数据
    getVideoLimitData: (limit) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.videodata LIMIT ?;`, [limit], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取分组数据
    getGroupData: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.groupinformationdata WHERE auditing = 'true';`, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //获取分组筛选的数据
    getChooseGroupData: (limit) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM gameinformation.groupinformationdata WHERE flag = ?;`, [limit], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //修改账号名称
    changeUsername: (newUsername, oldUsername) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                const query = `UPDATE usertable SET username = ? WHERE username = ?;`;
                connection.query(query, [newUsername, oldUsername], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    //resolve(results.insertId);
                    resolve(results);
                });
            });
        });
    },

    //修改密码
    changePassword: (newPassword, oldUsername) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                const query = `UPDATE usertable SET password = ? WHERE username = ?;`;
                connection.query(query, [newPassword, oldUsername], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    //resolve(results.insertId);
                    resolve(results);
                });
            });
        });
    },

    //文章投稿
    contributeArticle: (title, article, image_url, header_url, name, time, auditing) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                const query = `INSERT INTO articledata (title, article, image_url, header_url, name, time, auditing) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                connection.query(query, [title, article, image_url, header_url, name, time, auditing], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    //resolve(results.insertId);
                    resolve('1111');
                });
            });
        });
    },

    //资讯投稿
    contributeInformation: (title, time, image_url, article, header_url, name, auditing) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                const query = `INSERT INTO information (title, time, image_url, article, header_url, name, auditing) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                connection.query(query, [title, time, image_url, article, header_url, name, auditing], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    //resolve(results.insertId);
                    resolve(results);
                });
            });
        });
    },

    //播客投稿
    contributePodcast: (image_url, title, video_url, header_url, name, time, good, comment, auditing) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                const query = `INSERT INTO podcastdata (image_url, title, video_url, header_url, name, time, good, comment, auditing) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                connection.query(query, [image_url, title, video_url, header_url, name, time, good, comment, auditing], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //视频投稿
    contributeVideo: (image_url, title, video_url, header_url, name, time, good, comment, auditing) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                const query = `INSERT INTO videodata (image_url, title, video_url, header_url, name, time, good, comment, auditing) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                connection.query(query, [image_url, title, video_url, header_url, name, time, good, comment, auditing], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },

    //分组中上传的动态
    groupPostUpdate: (title, image_url, flag, auditing, header_url, name, time) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                const query = `INSERT INTO groupinformationdata (title, image_url, flag, auditing, header_url, name, time) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                connection.query(query, [title, image_url, flag, auditing, header_url, name, time], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    },
}

module.exports = dbOperations