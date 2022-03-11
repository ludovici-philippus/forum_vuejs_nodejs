export function naoVazio(campos) {
  let result = true;
  campos.forEach((campo) => {
    if (campo.length == 0)
      result = false;
  })
  return result;
}

