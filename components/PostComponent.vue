<template>
  <NuxtLink :to="'/' + slug_topico + '/' + slug">
    <div>
      <h3>{{ titulo }}</h3>
      <p>{{ descricao }}</p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'PostsComponent',
  props: {
    titulo: String,
    descricao: String,
    slug: String,
    slug_topico: String,
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
