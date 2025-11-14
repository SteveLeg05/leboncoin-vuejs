<script setup>
import { ref, inject, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const clearError = () => {
  errorMessage.value = ''
}
const auth = inject('auth')
const router = useRouter()

const errorMessage = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  if (!username.value || !email.value || !password.value) {
    errorMessage.value = 'Veuillez remplir tous les champs'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.post(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register',
      {
        username: username.value,
        email: email.value,
        password: password.value,
      },
    )

    auth.token = response.data.jwt
    auth.user = response.data.user

    await nextTick()
    router.push({ name: 'home' })

    console.log('Signup success:', response)
  } catch (error) {
    // Gestion plus sûre des erreurs
    if (error.response && error.response.data?.error?.message) {
      errorMessage.value = error.response.data.error.message
    } else if (error.request) {
      errorMessage.value = 'Impossible de contacter le serveur, réessayez plus tard'
    } else {
      errorMessage.value = 'Une erreur inattendue est survenue'
    }

    console.log('Signup error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <main>
    <section class="container">
      <div class="formulaire">
        <h2>Bonjour !</h2>
        <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</p>

        <form @submit.prevent="handleSubmit">
          <label for="username">Nom *</label>
          <input
            v-model="username"
            type="text"
            name="username"
            id="username"
            @input="clearError"
            placeholder=""
          />

          <label for="email">Email *</label>
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            @input="clearError"
            placeholder=""
          />

          <label for="password">Mot de passe *</label>
          <div class="password-wrapper">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              id="password"
              @input="clearError"
              placeholder=""
            />
            <button @click="showPassword = !showPassword" class="eye-icon">
              <font-awesome-icon :icon="showPassword ? ['fas', 'eye'] : ['fas', 'eye-slash']" />
            </button>
          </div>
          <button>{{ isLoading ? 'Inscription en cours...' : "S'inscrire ->" }}</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
  margin: 10px 0px;
  font-size: 16px;
  font-weight: bold;
  color: white;
}
a {
  color: black;
}

.error-message {
  /* border: solid 2px red; */
  text-align: center;
  font-style: 16px;
  color: orangered;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  width: 100%;
  padding-right: 2.5rem; /* espace pour l’icône */
  box-sizing: border-box;
}

.password-wrapper .eye-icon {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #666;
}
</style>
