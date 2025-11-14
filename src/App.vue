<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { reactive, provide } from 'vue'

const authState = reactive({
  user: null,
  token: null,
})

provide('auth', authState)
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
