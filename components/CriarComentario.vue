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
      const COMENTARIO = document.querySelector("textarea#comentario").value;
      const SLUG_TOPICO = this.$route.params.slug_topico;
      const SLUG_POST = this.$route.params.slug_post;
      if (naoVazio([COMENTARIO])) {
        const comentou = await this.$axios.$post(`${this.$store.getters.getApiPath}/comentar`, {
          comentario: COMENTARIO,
          slug_topico: SLUG_TOPICO,
          slug_post: SLUG_POST,
          token: this.$store.getters.getToken
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
