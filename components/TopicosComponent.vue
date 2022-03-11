<template>
  <div class="container">
    <h2>Tópicos:</h2>
    <TopicoSingleComponent titulo="Teste" slug="teste"/>
  </div>
</template>

<script>
export default {
  name: 'Topicos',
  methods: {
    getTopicos: async function(){
      return;
    }
  }
}
</script>

<style scoped>
.container {
  margin: 20px 0;
  flex-direction: column;
}
</style>
