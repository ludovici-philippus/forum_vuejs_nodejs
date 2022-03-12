<template>
  <div class="criar-conta">
    <h2>Criar Conta</h2>
    <form>
      <InputComponent
        type="email"
        nome="email"
        placeholder="Coloque seu e-mail..."
        label="E-mail:"
        is_input
      />
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
      <ButtonComponent texto="Criar Conta" :onClickDo="onClickDo" />
      <ButtonComponent :onClickDo="login" texto="Já tem uma conta?" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'Criar',
  props: {
    onClickDo: Function,
    login: Function,
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
