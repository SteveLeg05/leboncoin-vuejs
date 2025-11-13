<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

const handleSubmit = () => {
  console.log('submit ==>', {
    name: name.value,
    email: email.value,
    password: password.value,
  })
}
</script>
<template>
  <main>
    <section class="container">
      <div class="formulaire">
        <h2>Bonjour !</h2>
        <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</p>

        <form @submit.prevent="handleSubmit" action="submit">
          <label for="name">Nom *</label>
          <input v-model="name" type="text" name="name" id="name" placeholder="" />
          <label for="email">Email *</label>
          <input v-model="email" type="email" name="email" id="email" placeholder="" />
          <label for="password">Mot de passe *</label>
          <input v-model="password" type="password" name="password" id="password" placeholder="" />
          <button>S'inscrire -></button>
        </form>
        <div class="connect">
          <p>
            Vous avez déjà un compte ?
            <RouterLink :to="{ name: 'login' }"><span> Connectez-vous</span></RouterLink>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
section.container {
  /* border: solid 2px red; */
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.formulaire {
  /* border: solid 2px green; */
  box-shadow: 0px 0px 2px 2px rgb(212, 209, 209);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  width: 40%;
  height: 75%;
  gap: 20px;
  padding: 20px;
  margin-top: 80px;
}

form {
  /* border: solid 2px green; */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h2 {
  font-size: 25px;
  font-weight: bold;
  margin: 15px 0px;
}

p {
  font-size: 17px;
  margin-bottom: 15px;
}

.connect {
  /* border: solid 2px red; */
  text-align: center;
}
.connect span {
  font-weight: bold;
  text-decoration: underline;
}
input {
  height: 40px;
  font-size: 16px;
  border-radius: 15px;
  border: solid 1px gray;
}

button {
  height: 40px;
  border: none;
  border-radius: 15px;
  background-color: orangered;
  margin: 15px 0px;
  font-size: 16px;
  font-weight: bold;
  color: white;
}
a {
  color: black;
}
</style>
