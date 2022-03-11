<template>
  <section>
    <div class="container">
      <h1>Posts de Pessoas que você segue:</h1>
      <PostComponent titulo="Teste" descricao="Testando..." slug="teste" slug_topico="testando" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'PostsSeguidos'
}
</script>

<style scoped>
.container {
  margin: 20px 0;
  flex-direction: column;
}
</style>
