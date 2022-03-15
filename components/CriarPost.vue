<template>
  <section>
    <div class="container">
      <form>
        <InputComponent
          nome="post"
          label="Nome do Post:"
          placeholder="Insira o nome do post..."
          is_input
        />
        <InputComponent nome="conteudo" label placeholder="Insira o conteúdo do post..." />
        <ButtonComponent texto="Criar Post!" :onClickDo="createPost" />
      </form>
    </div>
  </section>
</template>

<script>
import { naoVazio } from "../utils/validar.js";
export default {
  name: 'CriarPost',
  methods: {
    createPost: async function () {
      const nome_post = document.querySelector("input#post").value;
      const conteudo_post = document.querySelector("textarea#conteudo").value;

      if (naoVazio([nome_post, conteudo_post])) {
        if (await this.$axios.$post(`${this.$store.getters.getApiPath}/criar-post`, {
          nome: nome_post,
          conteudo: conteudo_post,
          slug_topico: this.$route.params.slug_topico,
          token: this.$store.getters.getToken

        })) {
          alert("Post criado com sucesso!");
          const posts = await this.$axios.$post(`${this.$store.getters.getApiPath}/get-posts`, {
            slug_topico: this.$route.params.slug_topico
          });
          this.$store.commit("setPosts", await posts);
        } else
          alert("Post já existe nesse tópico!");
      } else
        alert("Campos Vazios não são permitidos!");

    }
  }
}
</script>

<style scoped>
form {
  width: 100%;
  margin: 10px 0;
}
</style>
