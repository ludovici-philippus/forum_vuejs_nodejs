<template>
  <form>
    <InputComponent nome="comentario" placeholder="Insira o seu comentário..." />
    <ButtonComponent texto="Comentar" :onClickDo="comentar" />
  </form>
</template>

<script>
import { naoVazio } from "../utils/validar.js";
export default {
  name: 'CriarComentario',
  methods: {
    comentar: async function () {
      const comentario = document.querySelector("textarea#comentario").value;
      if (naoVazio([comentario])) {
        const comentou = await this.$axios.$post(`${this.$store.getters.getApiPath}/comentar`, {
          comentario: comentario,
          token: this.$store.getters.getToken
        }).then(response => response.comentado);

        if (comentou) {
          alert("Comentado com sucesso!");
        } else {
          alert("Falha ao comentar!");
        }
      } else
        alert("Campos vazios não são permitidos!");
    }
  }
}
</script>

<style scoped>
</style>
