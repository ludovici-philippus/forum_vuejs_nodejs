<template>
  <header>
    <div class="container">
      <HeaderLogo />
      <HeaderNav />
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
header {
  padding: 20px;
  background-color: var(--cor-4);
  color: white;
}
.container {
  justify-content: space-between;
}
</style>
