<template>
  <article>
    <div class="container">
      <h2>{{ nome }}</h2>
      <p>Escrito por: {{ usuario }}</p>
      <div class="buttons" v-if="this.$store.getters.isLogged">
        <ButtonComponent v-if="!seguindo" id="seguir" texto="Seguir" :onClickDo="seguir" />
        <ButtonComponent
          v-else
          id="deixar_seguir"
          texto="Deixar de Seguir"
          :onClickDo="parar_seguir"
        />
        <ButtonComponent v-if="mine" id="deletar" texto="Deletar" :onClickDo="deletar" />
      </div>
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
      seguindo: false,
    }
  },
  props: {
    nome: String,
    usuario: String,
    conteudo: String,
    mine: Boolean,
    id: Number,
  },
  methods: {
    deletar: async function () {
      const API_PATH = this.$store.getters.getApiPath;
      const ID = this.id;
      const TOKEN = this.$store.getters.getToken;
      const DELETADO = await this.$axios.$post(`${API_PATH}/deletar-post`, {
        id: ID,
        token: TOKEN
      }).then(response => response.deletado);
      if (DELETADO) {
        this.$router.push({ path: "/" });
        alert("Post deletado com sucesso!");
      } else
        alert("Erro ao deletar post!");
    },
    seguir: async function () {
      const API_PATH = this.$store.getters.getApiPath;
      const ID = this.id;
      const TOKEN = this.$store.getters.getToken;
      const SEGUIDO = await this.$axios.$post(`${API_PATH}/seguir`, {
        id_post: ID,
        token: TOKEN
      }).then(response => response.seguiu);

      if (SEGUIDO)
        this.seguindo = true;
      else
        alert("Erro ao seguir post!");
    },
    parar_seguir: async function () {
      const API_PATH = this.$store.getters.getApiPath;
      const ID = this.id;
      const TOKEN = this.$store.getters.getToken;
      const PAROU = await this.$axios.$post(`${API_PATH}/parar-seguir`, {
        id_post: ID,
        token: TOKEN
      }).then(response => response.parou);

      if (PAROU)
        this.seguindo = false;
      else
        alert("Erro ao parar de seguir post!");

    },
    esta_seguindo: async function () {
      const API_PATH = this.$store.getters.getApiPath;
      const ID = this.id;
      const TOKEN = this.$store.getters.getToken;
      const SEGUINDO = await this.$axios.$post(`${API_PATH}/seguindo`, {
        id_post: ID,
        token: TOKEN
      }).then(response => response.seguindo);
      if (SEGUINDO)
        this.seguindo = true;
    }
  },
  mounted() {
    if (this.$store.getters.isLogged)
      this.esta_seguindo();
  },
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

#seguir {
  max-width: 100px;
}

#deletar {
  background-color: var(--cor-2);
  max-width: 100px;
}
</style>
