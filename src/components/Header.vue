<script setup></script>
<template>
  <header>
    <section class="container">
      <section class="leboncoin-title">
        <h1><img src="../assets/img/logo.svg" alt="logo leboncoin" /></h1>

        <section class="mini-container">
          <div>
            <button class="deposit-button">
              <font-awesome-icon :icon="['fas', 'plus-square']" />Déposer une annonce
            </button>
          </div>
          <div>
            <button class="search-button" type="search" placeholder="">
              Rechercher sur leboncoin<font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </div>
        </section>

        <div class="connection">
          <h2>icone</h2>
          <button class="toConnect">Se connecter</button>
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
}
</style>
