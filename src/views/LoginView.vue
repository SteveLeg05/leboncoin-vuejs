<script setup></script>
<template>
  <main>
    <section class="container">
      <div class="formulaire">
        <h2>Bonjour !</h2>
        <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</p>

        <form action="submit">
          <div>
            <label for="email">Email *</label>
            <input type="email" name="email" id="email" placeholder="" />
          </div>
          <div>
            <label for="password">Mot de passe *</label>
            <input type="password" name="password" id="password" placeholder="" />
          </div>

          <button>Se connecter -></button>
        </form>
        <div class="subscribe">
          <p>
            Envie de nous rejoindre ?
            <RouterLink :to="{ name: 'signup' }"><span> Créer un compte</span></RouterLink>
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
  gap: 35px;
}

form > div {
  /* border: solid 2px red; */
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

.subscribe {
  /* border: solid 2px red; */
  text-align: center;
}
.subscribe span {
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
  margin: 30px 0px;
  font-size: 16px;
  font-weight: bold;
  color: white;
}

a {
  color: black;
}
</style>
