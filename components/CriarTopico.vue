<template>
  <section>
    <div class="container">
      <form>
        <InputComponent
          nome="topico"
          placeholder="Dê um nome ao seu tópico"
          label="Tópico:"
          is_input
        />
        <ButtonComponent texto="Criar!" :onClickDo="criarTopico" />
      </form>
    </div>
  </section>
</template>

<script>
import { naoVazio } from "../utils/validar.js";
export default {
  name: 'CriarTopico',
  methods: {
    criarTopico: async function () {
      const topico = document.querySelector("input#topico").value;
      if (naoVazio([topico])) {
        const criado = await this.$axios.$post(`${this.$store.getters.getApiPath}/criar-topico`, {
          topico: topico
        }).then(response => response.criado_topico);
        if (criado) {
          alert("Tópico criado com sucesso!");
          const topicos_api = await this.$axios.$get(`${this.$store.getters.getApiPath}/get-topicos`).then(response => response);
          this.$store.commit("setTopicos", await topicos_api);
        } else
          alert("Tópico já existe!");
      }
      else {
        alert("Campos Vazios não são permitido!");
      }
    }
  }
}
</script>

<style scoped>
section {
  margin: 10px 0;
}
form {
  width: 100%;
}
</style>
