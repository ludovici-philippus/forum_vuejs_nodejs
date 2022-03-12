<template>
  <div class="login">
    <h2>Logar-se</h2>
    <form>
      <InputComponent
        nome="usuario"
        placeholder="Coloque seu nome de usuário..."
        label="Nome de usuário:"
        is_input
      />
      <InputComponent
        nome="senha"
        type="password"
        placeholder="Coloque sua senha..."
        label="Senha:"
        is_input
      />
      <ButtonComponent texto="Logar" :onClickDo="onClickDo" />
      <ButtonComponent :onClickDo="createAccount" texto="Ainda não tem uma conta?" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    onClickDo: Function,
    createAccount: Function,
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
