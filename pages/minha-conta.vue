<template>
  <div>
    <HeaderComponent />
    <LazyContaFormComponent v-if="!this.$store.getters.isLogged" />
    <h1>Minha Conta</h1>
  </div>
</template>

<script>
export default {
  name: 'minha-conta'
}
</script>

<style scoped>
</style>
