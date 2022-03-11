<template>
  <div class="container">
    <NuxtLink :to="'/' + slug">
      <h3>{{ titulo }}</h3>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'TopicoSingleComponent',
  props: {
    titulo: String,
    slug: String,
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #333;
}
div {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
