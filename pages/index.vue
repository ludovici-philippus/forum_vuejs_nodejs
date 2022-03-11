<template>
  <div>
    <HeaderComponent />
    <MainComponent />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {
    isLogged: async function () {
      const isLoggedApi = await this.$axios.$get(`${this.$store.getters.getApiPath}/is_logged`)
        .then(response => response.logado);
      this.$store.commit("toLogin", isLoggedApi);
    }
  },
  mounted() {
    this.isLogged();
  },
}
</script>

<style>
@charset 'UTF-8';
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&family=Staatliches&display=swap");

:root {
  --cor-1: #7cffc4;
  --cor-2: #f25757;
  --cor-3: #ffcb77;
  --cor-4: #227c9d;
  --cor-5: #678d58;
  --fonte-padrao: "Roboto", sans-serif;
  --fonte-destaques: "Staatliches", cursive;
}

html,
body {
  height: 100%;
  background-color: rgb(225, 225, 225);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--fonte-padrao);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--fonte-destaques);
}

.container {
  max-width: 900px;
  margin: auto;
  padding: 0 2%;
  display: flex;
}
</style>
