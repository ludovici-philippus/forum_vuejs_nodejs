<template>
  <div class="form-group">
    <label :for="nome">{{ label }}</label>
    <input :type="type" :name="nome" :id="nome" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    is_input: {
      type: Boolean,
      default: true,
    },
    nome: String,
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: "text"
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
  height: 44px;
  border: 1px solid #ccc;
  padding-left: 4px;
  margin-top: 4px;
  margin-bottom: 8px;
}
</style>
