export async function logar(axios, api_path, usuario, senha) {
  const logado = await axios.$post(api_path + '/logar', {
    usuario: usuario,
    senha: senha
  });
  return logado;
}

export async function criar(axios, api_path, email, usuario, senha) {
  const criado = await axios.$post(api_path + '/cadastrar', {
    email: email,
    usuario: usuario,
    senha: senha
  });
  return criado.criado;
}
