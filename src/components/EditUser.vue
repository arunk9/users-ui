<script setup>
import UserForm from './UserForm.vue';

defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>

<template>
  <user-form :userId="id"></user-form>
</template>

<style scoped>
</style>
