<template>
  <div>
    <p>
      <strong>{{ usuario }}</strong> comentou:
    </p>
    <p>{{ comentario }}</p>
    <p :v-if="meu === true">É meu</p>
  </div>
</template>

<script>
export default {
  name: 'ComentarioSingleComponent',
  props: {
    usuario: String,
    comentario: String,
    meu: Boolean,
  }
}
</script>

<style scoped>
div {
  background-color: white;
  padding: 15px;
}
p:nth-of-type(1) {
  margin-bottom: 8px;
}
</style>
