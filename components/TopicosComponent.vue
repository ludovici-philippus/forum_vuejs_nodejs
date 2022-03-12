<template>
  <div class="container">
    <h2>Tópicos:</h2>
    <TopicoSingleComponent
      :key="topico.id"
      v-for="topico in $store.getters.getTopicos"
      :titulo="topico.nome"
      :slug="topico.slug"
    />
  </div>
</template>

<script>
export default {
  name: 'Topicos',
  methods: {
    getTopicos: async function () {
      const topicos_api = await this.$axios.$get(`${this.$store.getters.getApiPath}/get-topicos`).then(response => response);
      this.topicos = topicos_api;
      return topicos_api;
    }
  },
  async mounted() {
    this.$store.commit("setTopicos", await this.getTopicos());
  }
}
</script>

<style scoped>
.container {
  margin: 20px 0;
  flex-direction: column;
}
</style>
