const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')({origin: true});
const app = express();
app.use(bodyParser.json());
app.use(cors);

const client = mysql.createConnection({
    host: 'localhost',
    user: 'node',
    password: 'HashSignBack1484?_!',
    port : 3306,
    database: 'save_image'
});

client.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + client.threadId);
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
    client.query('INSERT INTO post SET ?', { created_by: created_by, text: text, image_url: image_url }, (err, result) => {
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

app.listen(3001, () => console.log('Listening on port 3001!'))