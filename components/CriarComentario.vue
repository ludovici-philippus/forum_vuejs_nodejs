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
  props: {
    id_post: Number,
  },
  methods: {
    comentar: async function () {
      const COMENTARIO = document.querySelector("textarea#comentario").value;
      const ID = this.id_post;
      if (naoVazio([COMENTARIO])) {
        const comentou = await this.$axios.$post(`${this.$store.getters.getApiPath}/comentar`, {
          comentario: COMENTARIO,
          token: this.$store.getters.getToken,
          id: ID
        }).then(response => response.comentado);

        if (comentou) {
          this.$emit('get_comentarios');
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
