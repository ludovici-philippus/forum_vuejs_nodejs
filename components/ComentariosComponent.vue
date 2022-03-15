<template>
  <section>
    <div class="container">
      <h2>Comentários</h2>
      <CriarComentario v-if="this.$store.getters.isLogged" />
      <ComentarioSingleComponent
        :key="comentario.id"
        v-for="comentario in comentarios"
        :usuario="comentario.usuario"
        :comentario="comentario.mine"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'ComentariosComponent',
  data() {
    return {
      comentarios: []
    }
  },
  methods: {
    get_comentarios: async function () {
      const comentarios = await this.$axios.$post(`${this.$store.getters.getApiPath}/get-comentarios`, {
        slug_topico: this.$route.params.slug_topico,
        slug_post: this.$route.params.slug_post,
        token: this.$store.getters.getToken
      }).then(response => response.comentarios);
      this.comentarios = comentarios;
    }
  },
  created() {
    this.get_comentarios();
  }
}
</script>

<style scoped>
.container {
  flex-direction: column;
}
</style>
