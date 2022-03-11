<template>
  <button @click.prevent="onClickDo">{{ texto }}</button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    texto: String,
    onClickDo: Function
  }
}
</script>

<style scoped>
button {
  border: 0;
  padding: 6px 15px;
  color: white;
  background-color: var(--cor-4);
  cursor: pointer;
  transition: 0.5s;
}
button:hover {
  background-color: #226bae;
}
</style>
