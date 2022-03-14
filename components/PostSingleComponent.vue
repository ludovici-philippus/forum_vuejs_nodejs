<template>
  <main>
    <PostContentComponent />
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
