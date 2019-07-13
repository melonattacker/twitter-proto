const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')({origin: true});
const app = express();
app.use(bodyParser.json());
app.use(cors);

require('dotenv').config();

const client = mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306
});

client.getConnection(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected!!!');
});

// ツイート一括取得
app.get('/post', (req, res) => {
    client.query('SELECT * from post;', (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

// ユーザーごとのツイートを取得
app.post('/post/user', (req, res) => {
    const created_by = req.body.created_by;
    client.query('SELECT * from post WHERE created_by = ?;', [created_by], (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

// ツイートを保存
app.post('/post/create', (req, res) => {
    const created_by = req.body.created_by;
    const text = req.body.text;
    const image_url = req.body.image_url;
    const time = new Date();
    client.query('INSERT INTO post SET ?', { created_by: created_by, text: text, image_url: image_url, time: time }, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

// ツイートを削除
app.delete('/post/delete', (req, res) => {
    const id = req.body.id;
    const created_by = req.body.created_by;
    client.query(`DELETE FROM post WHERE id = ?`, [id], (err, result) => {
        if (err) throw err;
        client.query('SELECT * from post WHERE created_by = ?', [created_by], (err, rows, fields) => {
            if (err) throw err;
            res.send(rows);
        });
    });
});

app.listen(process.env.PORT || 3001, () => console.log('Listening!!'))