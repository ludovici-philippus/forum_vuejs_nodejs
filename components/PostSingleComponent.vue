<template>
  <main>
    <PostContentComponent />
    <ComentariosComponent />
  </main>
</template>

<script>
export default {
  name: 'PostSingleComponent',
  props: {
    nome: String,
    usuario: String,
    conteudo: String
  }
}
</script>
