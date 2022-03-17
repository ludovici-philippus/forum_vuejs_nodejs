<template>
  <section>
    <div class="container">
      <h2>Comentários</h2>
      <CriarComentario
        v-on:get_comentarios="get_comentarios"
        v-if="this.$store.getters.isLogged"
        :id_post="id_post"
      />
      <ComentarioSingleComponent
        :key="comentario.id"
        v-for="comentario in comentarios"
        :usuario="comentario.usuario"
        :comentario="comentario.comentario"
        :respostas_quantidade="comentario.respostas"
        :meu="comentario.mine"
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
  props: {
    id_post: Number,
  },
  methods: {
    get_comentarios: async function () {
      const comentarios = await this.$axios.$post(`${this.$store.getters.getApiPath}/get-comentarios`, {
        id: this.id_post,
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
