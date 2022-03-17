<template>
  <div class="comentario_single">
    <p>
      <strong>{{ usuario }}</strong> comentou:
    </p>
    <p>{{ comentario }}</p>

    <button
      @click.prevent="get_respostas"
      v-if="!mostrar_respostas && respostas_quantidade > 0"
    >Ver todas as {{ respostas_quantidade }} respostas</button>

    <button
      @click.prevent="() => { mostrar_respostas = false }"
      v-if="mostrar_respostas"
    >Ocultar respostas</button>

    <button
      @click.prevent="() => { responder_box = true }"
      v-if="this.$store.getters.isLogged"
    >Responder</button>

    <button id="deletar" @click.prevent="deletar" v-if="meu">Deletar</button>

    <div class="responder_box" v-if="responder_box">
      <LazyInputComponent nome="resposta" placeholder="Insira a sua resposta..." />
      <button @click.prevent="responder">Responder</button>
      <button @click.prevent="() => { responder_box = false }">Cancelar</button>
    </div>

    <LazyRespostasBoxComponent
      v-if="mostrar_respostas"
      :key="resposta.id"
      v-for="resposta in respostas"
      :resposta="resposta"
      :id_comentario="$vnode.key"
    />
  </div>
</template>

<script>
import InputComponent from "./InputComponent.vue";
export default {
  name: "ComentarioSingleComponent",
  data() {
    return {
      responder_box: false,
      mostrar_respostas: false,
      respostas: []
    };
  },
  props: {
    usuario: String,
    comentario: String,
    meu: Boolean,
    respostas_quantidade: Number
  },
  methods: {
    responder: async function () {
      const RESPOSTA = document.querySelector("textarea#resposta").value;
      const TOKEN = this.$store.getters.getToken;
      const ID_COMENTARIO = this.$vnode.key;
      const API_PATH = this.$store.getters.getApiPath;
      await this.$axios.$post(`${API_PATH}/responder-comentario`, {
        id_comentario: ID_COMENTARIO,
        resposta: RESPOSTA,
        token: TOKEN
      }).then(response => response);
      this.responder_box = false;
    },
    deletar: async function (event) {
      const TOKEN = this.$store.getters.getToken;
      const ID_COMENTARIO = this.$vnode.key;
      const API_PATH = this.$store.getters.getApiPath;
      const DELETADO = await this.$axios.$post(`${API_PATH}/deletar`, {
        id: ID_COMENTARIO,
        token: TOKEN
      }).
        then(response => response.deletado);
      if (DELETADO)
        event.target.parentElement.remove();
      else
        alert("Falha ao deletar!");
    },
    get_respostas: async function () {
      this.mostrar_respostas = true
      const API_PATH = this.$store.getters.getApiPath;
      const TOKEN = this.$store.getters.getToken;
      const ID_COMENTARIO = this.$vnode.key;
      const RESPOSTAS = await this.$axios.$post(`${API_PATH}/get-respostas`, {
        id_comentario: ID_COMENTARIO,
        token: TOKEN
      }).then(response => response.respostas);
      if (RESPOSTAS != false)
        this.respostas = RESPOSTAS;
      else
        alert("Erro ao carregar respostas");
    }
  },
  components: { InputComponent }
}
</script>

<style scoped>
button {
  border: 0;
  outline: 0;
  margin-top: 10px;
  margin-right: 6px;
  background-color: transparent;
  cursor: pointer;
}

button:nth-of-type(1),
button:nth-of-type(2) {
  color: var(--cor-4);
}

button#deletar {
  color: var(--cor-2);
}

.responder_box {
  margin: 0;
  padding: 0;
}

.responder_box button {
  background-color: var(--cor-4);
  color: white;
  margin: 0;
  margin-left: 15px;
  padding: 5px 15px;
}

.responder_box button:nth-of-type(2) {
  background-color: var(--cor-2);
}

.comentario_single {
  background-color: white;
  padding: 15px;
  margin-top: 20px;
}
p:nth-of-type(1) {
  margin-bottom: 8px;
}
</style>
