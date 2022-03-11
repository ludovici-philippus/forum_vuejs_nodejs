const connect = async () => {
  if (global.conexao && global.conexao.state != 'disconnected')
    return global.conexao

  const mysql = require('mysql2/promise')
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'forum_projeto',
  })
  console.log('Conectou ao banco')
  global.conexao = connection
  return connection
}

module.exports = { connect }
