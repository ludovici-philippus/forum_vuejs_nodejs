<template>
  <main>
    <div class="container">
      <LazyContaLogin
        v-if="!criar_conta"
        :onClickDo="logar"
        :createAccount="() => { criar_conta = true }"
      />
      <LazyContaCriar v-if="criar_conta" :onClickDo="criar" :login="() => { criar_conta = false }" />
    </div>
  </main>
</template>

<script>
import { naoVazio } from "../../utils/validar.js";
import { logar } from "../../utils/conta.js";
import { criar } from "../../utils/conta.js";
export default {
  name: 'FormComponent',
  data() {
    return {
      criar_conta: false,
    }
  },
  methods: {
    logar: async function () {
      const SHA256 = require("crypto-js/sha256");
      const usuario = document.querySelector("input#usuario").value;
      const senha = SHA256(document.querySelector("input#senha").value).toString();
      if (naoVazio([usuario, senha])) {
        const logado_token = await logar(this.$axios, this.$store.getters.getApiPath, usuario, senha)
          .then(response => response);
        console.log(logado_token);
        if (logado_token.logado == true) {
          alert("Logado com sucesso!");
          this.$store.commit("toLogin", true);
          this.$store.commit("setToken", logado_token.token);
          console.log(this.$store.getters.getToken);
        }
        else
          alert("Nome de Usuário ou senha incorretos!")
      }
      else if (naoVazio([usuario, senha]) == false)
        alert("Campos Vazios não são permitidos!");
    },
    criar: async function () {
      const SHA256 = require("crypto-js/sha256");
      const usuario = document.querySelector("input#usuario").value;
      const senha = SHA256(document.querySelector("input#senha").value).toString();
      const email = document.querySelector("input#email").value;

      if (naoVazio([email, usuario, senha])) {
        if (await criar(this.$axios, this.$store.getters.getApiPath, email, usuario, senha))
          alert("Conta criada com sucesso!");
        else
          alert("Falha ao criar conta!");
      } else
        alert("Campos Vazios não são permitidos!");
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 20px;
  flex-direction: column;
}
</style>
