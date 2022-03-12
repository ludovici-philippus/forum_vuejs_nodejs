<template>
  <div class="form-group">
    <label v-if="is_input" :for="nome">{{ label }}</label>
    <input v-if="is_input" :type="type" :name="nome" :id="nome" :placeholder="placeholder" />
    <textarea v-else :name="nome" :id="nome" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    is_input: Boolean,
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
textarea {
  width: 100%;
  height: 144px;
  border: 1px solid #ccc;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 8px;
  resize: vertical;
}
</style>
