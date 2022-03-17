<template>
  <div class="respostas_box">
    <p>
      <strong>{{ resposta.usuario }}</strong> respondeu:
    </p>
    <p>{{ resposta.resposta }}</p>
    <button @click.prevent="deletar" v-if="resposta.mine">Deletar</button>
  </div>
</template>

<script>
export default {
  name: 'RespostasBoxComponent',
  props: {
    resposta: Object,
    id_comentario: Number
  },
  methods: {
    deletar: async function (event) {
      const ID_RESPOSTA = this.$vnode.key;
      const ID_COMENTARIO = this.id_comentario;
      const TOKEN = this.$store.getters.getToken;
      const API_PATH = this.$store.getters.getApiPath;

      const DELETADO = await this.$axios.$post(`${API_PATH}/deletar-resposta`, {
        id_resposta: ID_RESPOSTA,
        id_comentario: ID_COMENTARIO,
        token: TOKEN
      }).then(response => response.deletado);
      if (DELETADO)
        event.target.parentElement.remove("");
      else
        alert("Erro ao deletar!");
    }
  }
}
</script>

<style scoped>
.respostas_box {
  background-color: white;
  padding: 4px 0;
  padding-left: 8px;
  margin-top: 15px;
}
button {
  background-color: transparent;
  border: 0;
  outline: 0;
  color: var(--cor-2);
  cursor: pointer;
}
</style>
