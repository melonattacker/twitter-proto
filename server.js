const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')({origin: true});
const app = express();
app.use(bodyParser.json());
app.use(cors);

const client = mysql.createPool({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b6f26e95edb042',
    password: '04f7ce59',
    database: 'heroku_06f4641160041ce',
    port: 3306
});

client.getConnection(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected!!!');
});

// 画像一括取得
app.get('/post', (req, res) => {
    client.query('SELECT * from post;', (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

// ユーザーごとの画像を取得
app.post('/post/user', (req, res) => {
    const created_by = req.body.created_by;
    client.query('SELECT * from post WHERE created_by = ?;', [created_by], (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

// 画像のパスを保存
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

// 画像のパスを削除
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