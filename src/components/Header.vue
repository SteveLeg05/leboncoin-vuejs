<script setup>
import { inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const auth = inject('auth')
const logout = inject('logout')
const search = ref('')
const route = useRoute()
const router = useRouter()

const handleSubmit = () => {
  console.log(search.value, route.query)

  const queries = { ...route.query }

  if (search.value) {
    queries.title = search.value
  } else {
    delete queries.title
  }

  // pagination

  queries.page = 1

  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <header>
    <section class="container">
      <section class="leboncoin-title">
        <RouterLink to="/"
          ><h1><img src="../assets/img/logo.svg" alt="logo leboncoin" /></h1
        ></RouterLink>

        <section class="mini-container">
          <div>
            <button class="deposit-button">
              <font-awesome-icon :icon="['fas', 'plus-square']" />Déposer une annonce
            </button>
          </div>
          <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Rechercher sur leboncoin" v-model="search" />
            <button>
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </form>
        </section>

        <div class="connection">
          <RouterLink v-if="!auth.user" :to="{ name: 'login' }"
            ><button class="toConnect">
              <font-awesome-icon :icon="['far', 'user']" />Se connecter
            </button>
          </RouterLink>

          <div v-else>
            <div>
              <font-awesome-icon :icon="['far', 'user']" />
              <p>Bonjour {{ auth.user?.username }}</p>
            </div>

            <button @click="logout" class="logout-button">
              <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
            </button>
          </div>
        </div>
      </section>

      <section class="articleFamily">
        <p>Immobilier</p>
        <span>.</span>
        <p>Véhicules</p>
        <span>.</span>
        <p>Location de vacances</p>
        <span>.</span>
        <p>Emploi</p>
        <span>.</span>
        <p>Mode</p>
        <span>.</span>
        <p>Maison & Jardin</p>
        <span>.</span>
        <p>Famille</p>
        <span>.</span>
        <p>Electronique</p>
        <span>.</span>
        <p>Loisirs</p>
        <span>.</span>
        <p>Autres</p>
      </section>
    </section>
  </header>
</template>
<style scoped>
header {
  box-shadow: 1px 1px 1px 1px rgb(187, 187, 187);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white; /* important pour qu’il ne soit pas transparent */
  z-index: 1000; /* au-dessus du reste */
  box-shadow: 1px 1px 1px 1px rgb(187, 187, 187);

  /* border: solid 2px red; */
}

.leboncoin-title {
  /* border: solid 2px blue; */
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

h1 > img {
  /* border: solid 2px black; */
  height: 40px;
  width: 180px;
}
.articleFamily {
  /* border: solid 2px red; */
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
}

.connection {
  /* border: solid 2px red; */
  height: 40px;
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 15px;
}
.connection svg {
  font-size: 18px;
}

a {
  text-decoration: none;
}

.logout-button {
  height: 30px;
  width: 30px;
  border: none;
  background-color: white;
}

.connection > div {
  display: flex;
  align-items: center;
  gap: 20px;
}

.connection > div div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.mini-container > form {
  /* background-color: white; */
  /* border: solid 2px green; */
  border-radius: 10px;
  /* padding: 5px; */
  display: flex;
}

.mini-container > form input {
  height: 45px;
  width: 100%;
  max-width: 250px;
  /* border: solid 2px red; */
  font-size: 16px;
  border: none;
}

.mini-container > form button {
  border: none;
  background-color: white;
  cursor: pointer;
}
.mini-container > form svg {
  height: 25px;
  width: 25px;
  padding: 5px;
  background-color: #ff5b0e;
  border: none;
  border-radius: 10px;
}
</style>
