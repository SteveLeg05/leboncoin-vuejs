<script setup>
import { RouterView } from 'vue-router'
import { ref, provide, reactive } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const token = $cookies.get('token')
const username = $cookies.get('user')

const authState = reactive({
  token: token || '',
  user: username ? { username } : null,
})

const logout = () => {
  authState.token = ''
  authState.user = null
  $cookies.remove('token')
  $cookies.remove('user')
}

provide('auth', authState)
provide('logout', logout)
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>
