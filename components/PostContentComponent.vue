<template>
  <article>
    <div class="container">
      <h2>{{ nome }}</h2>
      <p>Escrito por: {{ usuario }}</p>
      <hr />
      <p>{{ conteudo }}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'PostContentComponent',
  data() {
    return {
      nome: "Carregando...",
      usuario: "Carregando...",
      conteudo: "Carregando..."
    }
  },
  methods: {
    get_post: async function () {
      const post_info = await this.$axios.$post(`${this.$store.getters.getApiPath}/get-post`, {
        slug_topico: this.$route.params.slug_topico,
        slug_post: this.$route.params.slug_post
      }).then(response => response);
      this.nome = post_info.nome;
      this.usuario = post_info.usuario;
      this.conteudo = post_info.conteudo;
    }
  },
  mounted() {
    this.get_post();
  }
}
</script>

<style scoped>
article {
  margin: 20px 0;
}
hr {
  margin-top: 8px;
  margin-bottom: 20px;
}
.container {
  flex-direction: column;
}
</style>
