<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import axios from 'axios'
import Card from '@/components/Card.vue'
import Filters from '@/components/Filters.vue'
import Pagination from '@/components/Pagination.vue'

const props = defineProps(['sort', 'pricemin', 'pricemax', 'title', 'page'])
console.log('props>>>', props)

const offersArray = ref([])
const numOfPages = ref(1)

// chargement initial
onMounted(() => {
  watchEffect(async () => {
    try {
      let priceFilters = ''

      if (props.pricemax) {
        priceFilters += `&filters[price][$lte]=${props.pricemax}`
      }

      if (props.pricemin) {
        priceFilters += `&filters [price] [$gte]=${props.pricemin}`
      }
      const { data } = await axios.get(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar${priceFilters}&sort=${props.sort}&filters[title][$containsi]=${props.title}&pagination[page]=${props.page}&pagination{pageSize}=10`,
      )

      console.log('data>>>', data)

      offersArray.value = data.data
      numOfPages.value = data.meta.pagination.pageCount
    } catch (error) {
      console.log(error)
    }
  })
})
</script>

<template>
  <main class="container">
    <Filters :sort="sort" :pricemin="pricemin" :pricemax="pricemax" :title="title" :page="page" />

    <h2>Des millions de petites annonces et autant d'occasions de se faire plaisir</h2>
    <div class="bandeau">
      <img src="../assets/img/onde-corail.svg" alt="onde corail" />
      <div>
        <h3>C'est le moment de vendre</h3>
        <button class="deposit-button">
          <font-awesome-icon :icon="['fas', 'plus-square']" />Déposer une annonce
        </button>
      </div>

      <img src="../assets/img/feuille-bleue.svg" alt="feuille bleue" />
    </div>

    <section class="cards">
      <p v-if="!offersArray.length">Chargement des annonces...</p>
      <RouterLink :to="'/offer/' + offer.id" v-for="offer in offersArray" :key="offer.id">
        <Card
          :avatar="offer.attributes?.owner?.data?.attributes?.avatar?.data?.attributes?.url || ''"
          :username="offer.attributes?.owner?.data?.attributes?.username || 'Utilisateur inconnu'"
          :picture="offer.attributes.pictures?.data?.[0]?.attributes?.url || ''"
          :title="offer.attributes.title"
          :price="offer.attributes.price"
          :date="offer.attributes.createdAt"
      /></RouterLink>
    </section>

    <Pagination
      :sort="sort"
      :pricemin="pricemin"
      :pricemax="pricemax"
      :title="title"
      :page="page"
      :numOfPages="numOfPages"
    />
  </main>
</template>

<style scoped>
main.container {
  padding-top: 120px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}
.search-article {
  /* border: solid 2px red; */
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}

/* ---------- BANDEAU ---------- */
.bandeau {
  border-radius: 20px;
  width: 100%;
  height: 140px; /* laisse un peu plus de place pour les images */
  display: flex;
  align-items: stretch;
  gap: 0;
  background-color: rgb(255, 234, 226);
  overflow: hidden;
  padding: 0;
}

.bandeau > img {
  flex: 0 0 28%; /* images latérales prennent ~28% chacune */
  max-width: 28%;
  height: 100%; /* hauteur souhaitée (ajustable) */
  object-fit: cover; /* garde le ratio et remplit la zone */
  border-radius: 12px;
}

.bandeau > div {
  flex: 1 1 auto; /* occupe l'espace restant */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

h2 {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 30px 0;
}

.bandeau h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

/* ---------- CARDS ---------- */
.cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 30px 0;
  padding: 0;
}

.cards a {
  text-decoration: none;
  color: inherit;
  display: block;
  flex: 0 0 240px; /* 5 cartes par ligne avec gap */
  margin: 0;
}

/* ==========================================================
   RESPONSIVE
   ========================================================== */

/* ------- Tablettes (<= 992px) ------- */
@media (max-width: 992px) {
  h2 {
    font-size: 24px;
  }

  .bandeau > img {
    flex: 0 0 24%;
    max-width: 24%;
    height: 84px;
  }
  .bandeau {
    min-height: 100px;
    padding: 10px;
  }
}

/* ------- Smartphones (<= 768px) ------- */
@media (max-width: 768px) {
  .bandeau {
    flex-direction: column;
    text-align: center;
    gap: 12px;
    padding: 0;
  }
  .bandeau > img {
    flex: 0 0 auto;
    max-width: 60%; /* images plus grandes (visuellement centrées) */
    height: auto;
    width: auto;
  }
  .bandeau > div {
    width: 100%;
    flex-direction: column;
    gap: 8px;
  }

  h2 {
    font-size: 20px;
    padding: 0 10px;
  }
}

/* ------- Petits smartphones (<= 480px) ------- */
@media (max-width: 480px) {
  h2 {
    font-size: 18px;
  }

  .cards {
    gap: 15px;
  }

  .bandeau > img {
    width: 40px;
  }
}

/* 4 cards par ligne si l’écran < 1300px */
@media (max-width: 1300px) {
  .cards a {
    flex: 0 0 200px;
  }
}

/* 3 cards par ligne si l’écran < 1000px */
@media (max-width: 1000px) {
  .cards a {
    flex: 0 0 30%; /* ou environ 30% du container */
  }
}

/* 2 cards par ligne si l’écran < 700px */
@media (max-width: 700px) {
  .cards a {
    flex: 0 0 45%;
  }
}

/* 1 card par ligne si l’écran < 500px */
@media (max-width: 500px) {
  .cards {
    justify-content: center; /* garde centré sur mobile */
  }

  .cards a {
    flex: 0 0 auto; /* ne prend que la largeur de son contenu ou max-width */
    width: 90%; /* prend 90% du container */
    max-width: 300px; /* limite la largeur pour les écrans larges */
  }
}
</style>
