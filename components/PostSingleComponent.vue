<template>
  <main>
    <PostContentComponent
      v-if="id != -1"
      :nome="nome"
      :usuario="usuario"
      :conteudo="conteudo"
      :mine="mine"
      :id="id"
    />
    <ComentariosComponent :id_post="id" v-if="id != -1" />
  </main>
</template>

<script>
export default {
  name: 'PostSingleComponent',

  data() {
    return {
      nome: "Carregando...",
      usuario: "Carregando...",
      conteudo: "Carregando...",
      mine: false,
      id: -1
    }
  },
  methods: {
    get_post: async function () {
      console.log("oi mundo");
      const post_info = await this.$axios.$post(`${this.$store.getters.getApiPath}/get-post`, {
        slug_topico: this.$route.params.slug_topico,
        slug_post: this.$route.params.slug_post,
        token: this.$store.getters.getToken
      }).then(response => response);
      this.nome = post_info.nome;
      this.usuario = post_info.usuario;
      this.conteudo = post_info.conteudo;
      this.mine = post_info.mine;
      this.id = post_info.id;
      console.log("Oi");
      console.log(this.nome);
    }
  },
  mounted() {
    this.get_post();
  },

}
</script>
