const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./db.js");

const app = express();
const SECRET = 'segredo';

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
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

app.get("/", (req, res) => {
  res.end("Estou aqui!");
})

app.get("/is_logged", (req, res) => {
  if (jwt.verify(req.body.token, SECRET)) {
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

    let token = jwt.sign({
      unid: row[0].id,
      nome: row[0].nome,
      logado: true
    },
      SECRET,
      {
        expiresIn: "24h"
      });
    res.jsonp({ logado: true, token: token });
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
    if (jwt.verify(req.body.token, SECRET).logado) {
      console.log("Deu certo!");
      const urlSlug = require('url-slug');
      const slug_topico = urlSlug(topico);
      const sql = await db.connect();

      const [topico_quantidade] = await sql.execute(
        'SELECT * FROM `tb_topicos` WHERE slug=?',
        [slug_topico]
      );

      if (topico_quantidade.length != 0)
        res.jsonp({ criado_topico: false });
      else {
        await sql.execute(
          'INSERT INTO `tb_topicos` VALUES (null, ?, ?)',
          [topico, slug_topico]
        );
        res.jsonp({ criado_topico: true });
      }
    }
  } catch (err) {
    res.jsonp({ criado_topico: false });
  }
});

app.get("/get-topicos", async (req, res) => {
  const sql = await db.connect();
  const [topicos] = await sql.execute(
    'SELECT * FROM `tb_topicos`'
  );
  res.jsonp(topicos)
});

app.post("/get-topico", async (req, res) => {
  const slug_topico = req.body.slug;
  const sql = await db.connect();
  const [topico] = await sql.execute(
    'SELECT * FROM `tb_topicos` WHERE slug=?',
    [slug_topico]
  );
  res.jsonp(topico);
});

app.post("/get-posts", async (req, res) => {
  const slug_topico = req.body.slug_topico;
  const sql = await db.connect();
  const [posts] = await sql.execute(
    'SELECT * FROM `tb_posts` WHERE slug_topico=?',
    [slug_topico]
  );
  res.jsonp(posts);
});

app.post("/get-post", async (req, res) => {
  const slug_topico = req.body.slug_topico;
  const slug_post = req.body.slug_post;

  const sql = await db.connect();

  let [post_info] = await sql.execute(
    'SELECT * FROM `tb_posts` WHERE slug_topico = ? AND slug = ?',
    [slug_topico, slug_post]
  );
  post_info = post_info[0];

  let [usuario] = await sql.execute(
    'SELECT nome FROM `tb_users` WHERE id = ?',
    [post_info.id_usuario]
  );
  usuario = usuario[0];

  post_info.usuario = usuario.nome;

  res.jsonp(post_info);
})

app.post("/criar-post", async (req, res) => {
  const urlSlug = require('url-slug');

  const nome = req.body.nome;
  const conteudo = req.body.conteudo;
  const dados = jwt.verify(req.body.token, SECRET);
  const id_usuario = dados.unid;
  const slug_topico = req.body.slug_topico;
  const slug = urlSlug(nome);

  if (id_usuario == undefined || id_usuario.length == 0) {
    res.jsonp({ post_criado: false });
  } else {
    const sql = await db.connect();
    const [post_exists] = await sql.execute(
      'SELECT * FROM `tb_posts` WHERE slug=?',
      [slug]
    );
    if (post_exists.length == 0) {
      await sql.execute(
        'INSERT INTO `tb_posts` VALUES (null, ?, ?, ?, ?, ?)',
        [nome, conteudo, id_usuario, slug_topico, slug]
      );
      res.jsonp({ post_criado: true });
    } else
      res.jsonp({ post_criado: false });
  }
});

app.post("/comentar", async (req, res) => {
  const comentario = req.body.comentario;
  const slug_topico = req.body.slug_topico;
  const token = req.body.token;

  const slug_post = req.body.slug_post;
  if (token != '' && token.length != 0) {
    const dados = jwt.verify(token, SECRET);
    const id = dados.unid;
    if (id != undefined && id.length != 0) {
      const nome = dados.nome;
      const sql = await db.connect();
      await sql.execute(
        'INSERT INTO `tb_comentarios` VALUES (null, ?, ?, ?, ?, ?, 0)',
        [id, nome, comentario, slug_topico, slug_post]
      );
      res.jsonp({ comentado: true })
    } else
      res.jsonp({ comentado: false });
  } else
    res.jsonp({ comentado: false });
});

app.post("/get-comentarios", async (req, res) => {
  const slug_topico = req.body.slug_topico;
  const slug_post = req.body.slug_post;
  const token = req.body.token;

  const sql = await db.connect();
  const [comentarios] = await sql.execute(
    'SELECT * FROM `tb_comentarios` WHERE slug_topico = ? AND slug_post = ?',
    [slug_topico, slug_post]
  );
  let id_user;
  if (token.length != 0)
    id_user = jwt.verify(token, SECRET).unid;
  else
    id_user = -1;

  comentarios.filter(comentario => {
    if (comentario.id_user == id_user) {
      comentario.mine = true;
      return comentario;
    } else {
      comentario.mine = false;
      return comentario;
    }
  });
  res.jsonp({ comentarios: comentarios });
});

app.post("/deletar", async (req, res) => {
  const ID = req.body.id;
  const TOKEN = req.body.token;
  const SLUG_POST = req.body.slug_post;
  const SLUG_TOPICO = req.body.slug_topico;

  try {
    const ID_USER = jwt.verify(TOKEN, SECRET).unid;
    const SQL = await db.connect();

    await SQL.execute(
      'DELETE FROM `tb_respostas` WHERE id_comentario=?',
      [ID]
    )
    await SQL.execute(
      'DELETE FROM `tb_comentarios` WHERE id=? AND id_user=? AND slug_topico=? AND slug_post=?',
      [ID, ID_USER, SLUG_TOPICO, SLUG_POST]
    )
    res.jsonp({ deletado: true });
  } catch (err) {
    res.jsonp({ deletado: false });
  }
});

app.post("/responder-comentario", async (req, res) => {
  const ID_COMENTARIO = req.body.id_comentario;
  const RESPOSTA = req.body.resposta;
  const TOKEN = req.body.token;

  try {
    const DADOS = jwt.verify(TOKEN, SECRET);
    const ID_USER = DADOS.unid;
    const NOME = DADOS.nome;

    const SQL = await db.connect();

    await SQL.execute(
      'UPDATE `tb_comentarios` SET respostas=respostas+1 WHERE id=?',
      [ID_COMENTARIO]
    );
    await SQL.execute(
      'INSERT INTO `tb_respostas` VALUES (null, ?, ?, ?, ?)',
      [ID_COMENTARIO, ID_USER, NOME, RESPOSTA]
    );
    res.jsonp({ respondido: true });
  } catch {
    res.jsonp({ respondido: false });
  }
});

app.post("/get-respostas", async (req, res) => {
  const ID_COMENTARIO = req.body.id_comentario;
  const TOKEN = req.body.token;
  let USER_ID = -1;
  if (TOKEN != '' || TOKEN.length != 0)
    USER_ID = jwt.verify(TOKEN, SECRET).unid;

  try {
    const SQL = await db.connect();
    const [RESPOSTAS] = await SQL.execute(
      'SELECT * FROM `tb_respostas` WHERE id_comentario=?',
      [ID_COMENTARIO]
    );

    if (USER_ID != -1) {
      RESPOSTAS.filter(resposta => {
        if (resposta.id_usuario == USER_ID) {
          resposta.mine = true;
          return resposta;
        }
        resposta.mine = false;
        return resposta;
      })
    }
    res.jsonp({ respostas: RESPOSTAS });
  } catch (err) {
    res.jsonp({ respostas: false });
  }
});

app.post("/deletar-resposta", async (req, res) => {
  const ID_COMENTARIO = req.body.id_comentario;
  const ID_RESPOSTA = req.body.id_resposta;
  const TOKEN = req.body.token;

  try {
    const USER_ID = jwt.verify(TOKEN, SECRET).unid;
    const SQL = await db.connect();
    await SQL.execute(
      'UPDATE `tb_comentarios` SET respostas=respostas-1 WHERE id=?',
      [ID_COMENTARIO]
    );
    await SQL.execute(
      'DELETE FROM `tb_respostas` WHERE id=? AND id_usuario=?',
      [ID_RESPOSTA, USER_ID]
    );
    res.jsonp({ deletado: true });
  } catch (err) {
    res.jsonp({ deletado: false });
  }
})

app.listen(5000, () => {
  console.log("Servidor iniciado na porta 5000!");
})
