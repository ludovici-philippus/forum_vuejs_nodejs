<template>
  <main>
    <LazyCriarTopico v-if="this.$store.getters.isLogged" />
    <LazyPostsSeguidos v-if="this.$store.getters.isLogged" />
    <TopicosComponent />
  </main>
</template>

<script>
export default {
  name: 'MainComponent',
  methods: {
    logar: function () {
      this.$store.commit("toLogin", true);
    }
  }
}
</script>

<style scoped>
</style>
