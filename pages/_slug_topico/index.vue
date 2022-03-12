<template>
  <div>
    <HeaderComponent />
    <main>
      <div class="container">
        <CriarPost />
        <h2>{{ titulo }}</h2>
        <PostComponent
          :key="post.id"
          v-for="post in this.$store.getters.getPosts"
          :titulo="post.nome"
          :descricao="post.conteudo.substr(0, 100)"
          :slug="post.slug"
          :slug_topico="post.slug_topico"
        />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'topico',
  data() {
    return {
      titulo: "",
    }
  },
  methods: {
    getTopicoName: async function () {
      const topico_name = await this.$axios.$post(`${this.$store.getters.getApiPath}/get-topico`, {
        slug: this.$route.params.slug_topico
      }).then(response => response[0].nome);
      this.titulo = topico_name;
    },
    getPosts: async function () {
      const posts = await this.$axios.$post(`${this.$store.getters.getApiPath}/get-posts`, {
        slug_topico: this.$route.params.slug_topico
      }).then(response => response);
      return posts;
    }
  },
  async mounted() {
    this.getTopicoName();
    this.$store.commit("setPosts", await this.getPosts());
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}
.container {
  flex-direction: column;
}
</style>
