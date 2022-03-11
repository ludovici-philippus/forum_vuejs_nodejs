const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const db = require("./db.js");

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(
  session({
    secret: '29190fjqweh0whq90',
    saveUninitialized: false,
    resave: false,
  })
)

/*Definindo Headers necessários para o funcionamento da API em localhost*/
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
/*==FIM==*/

var sess = { usuario: false, unid: -1 }

app.get("/", (req, res) => {
  res.end("Estou aqui!");
})

app.get("/is_logged", (req, res) => {
  if (sess.unid != -1) {
    res.jsonp({ logado: true });
  } else {
    res.jsonp({ logado: false });
  }
})

app.post("/logar", async (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  const sql = await db.connect();
  const [row] = await sql.execute(
    'SELECT * FROM `tb_users` WHERE nome = ? AND senha = ?',
    [usuario, senha]
  );
  if (row.length == 1) {
    sess.unid = row[0].id;
    sess.nome = row[0].nome;
    sess.usuario = true;
    console.log(sess);
    res.jsonp({ logado: true });
  } else {
    res.jsonp({ logado: false });
  }
});

app.post("/cadastrar", async (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  const email = req.body.email;

  try {
    const sql = await db.connect();
    await sql.execute(
      'INSERT INTO `tb_users` VALUES (null, ?, ?, ?)',
      [email, usuario, senha]
    );
    res.jsonp({ criado: true });
  } catch (err) {
    res.json({ criado: false, msg: err });
  }
});

app.post("/criar-topico", async (req, res) => {
  const topico = req.body.topico;
  try {
    if (sess.unid != -1) {
      const urlSlug = require('url-slug');
      const slug_topico = urlSlug(topico);
      const sql = await db.connect();
      await sql.execute(
        'INSERT INTO `tb_topicos` VALUES (null, ?, ?)',
        [topico, slug_topico]
      );
      res.jsonp({ criado_topico: true });
    }
  } catch (err) {
    res.jsonp({ criado_topico: false });
  }
})

app.listen(5000, () => {
  console.log("Servidor iniciado na porta 5000!");
})
