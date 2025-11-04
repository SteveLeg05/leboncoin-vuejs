<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { useCycleList } from '@vueuse/core'

const offer = ref(null)

const props = defineProps({
  id: { required: true },
})

// Requête pour récupérer l'offre
onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate=pictures,owner.avatar`,
    )
    offer.value = data.data
  } catch (error) {
    console.log('catch >>>', error)
  }
})

const newDate = computed(() => {
  if (!offer.value || !offer.value.attributes?.createdAt) return ''
  return new Date(offer.value.attributes.createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
})

const localPrice = computed(() => {
  if (!offer.value || !offer.value.attributes) return ''
  return offer.value.attributes.price.toLocaleString('fr-FR')
})

const cycleList = computed(() => {
  if (offer.value.attributes.pictures.data) {
    const { state, next, prev } = useCycleList(offer.value.attributes.pictures.data)

    return { state, next, prev }
  } else {
    return {}
  }
})
</script>
<template>
  <main>
    <section class="container offerInfo">
      <section class="offerDetails">
        <div v-if="offer && offer.attributes">
          <div class="carrousel">
            <font-awesome-icon
              icon="fa-solid fa-chevron-left"
              @click="cycleList.prev()"
              v-if="offer.attributes.pictures.data?.length > 1"
            />
            <img :src="cycleList.state.value.attributes.url" alt="photo de l'offre" />
            <font-awesome-icon
              icon="fa-solid fa-chevron-right"
              @click="cycleList.next()"
              v-if="offer.attributes.pictures.data?.length > 1"
            />
          </div>
          <div class="details">
            <p class="title">{{ offer.attributes.title }}</p>
            <p class="price">{{ localPrice }} €</p>
            <p class="createdAt">{{ newDate }}</p>
            <div class="description">
              <p>Description :</p>
              <p>{{ offer.attributes.description }}</p>
            </div>

            <p class="localisation">
              <font-awesome-icon :icon="['fas', 'map-marker-alt']" /> Agon-Coutainville (50230)
            </p>
          </div>
        </div>
        <div v-else>Chargement de l'offre...</div>
      </section>
      <section class="userInfo">
        <section class="userDetails">
          <div v-if="offer && offer.attributes">
            <div class="user">
              <img
                :src="offer.attributes.owner?.data?.attributes?.avatar?.data?.attributes?.url"
                alt="avatar de l'utilisateur"
              />
              <p>{{ offer.attributes.owner.data.attributes.username }}</p>
            </div>
            <p><font-awesome-icon :icon="['fas', 'check-double']" />Pièce d'identité vérifiée</p>
            <p>
              <font-awesome-icon :icon="['far', 'clock-four']" /> Répond généralement en 1 heure
            </p>
            <div class="userButton"><button>Acheter</button><button>Message</button></div>
          </div>

          <div v-else>Chargement des informations utilisateur...</div>
        </section>
      </section>
    </section>
  </main>
</template>
<style scoped>
main {
  padding-top: 120px;
}

.offerInfo {
  /* border: solid 2px blue; */
  display: flex;
  gap: 50px;
  margin-top: 30px;
}

.offerDetails {
  /* border: solid 2px green; */
  width: 80%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.offerDetails img {
  width: 600px;
  height: 450px;
  object-fit: cover;
  object-position: center;
  margin: 0 100px;
}

.carrousel {
  display: flex;
  align-items: center;
}

.carrousel svg {
  font-size: 20px;
  cursor: pointer;
}

.details {
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 400px;
  padding: 30px 0;
}

.title {
  font-size: 28px;
  font-weight: bold;
}
.price {
  font-size: 22px;
  font-weight: bold;
}
.createdAt {
  font-size: 16px;
  color: gray;
}
.description {
  border-top: solid 1px rgb(212, 211, 211);
  border-bottom: solid 1px rgb(212, 211, 211);
  min-height: 120px;
  padding: 15px 0;
  width: 100%;
}
.description p:first-child {
  font-size: 18px;
  font-weight: bold;
}
.description p:last-child {
  font-size: 16px;
  margin-top: 10px;
}
.localisation {
  font-size: 18px;
  font-weight: bold;
}
.localisation svg {
  /* border: solid 2px purple; */
  font-size: 18px;
}
.userInfo {
  /* border: solid 2px orange; */
  width: 60%;
  height: 100vh;
}
.userDetails {
  border: solid 1px lightgray;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  height: 500px;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
.userDetails div > p {
  /* border: solid 2px blue; */
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}
.user {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.user img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.user p {
  font-size: 24px !important;
  font-weight: bold;
}
.userButton {
  border-top: solid 1px rgb(211, 211, 211);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 60%;
  margin-top: 100px;
}
.userButton button {
  height: 50px;
  width: 300px;
  border-radius: 10px;
  font-size: 15px;
  color: white;
  border: none;
}
.userButton button:first-child {
  background-color: #ff5b0e;
}
.userButton button:last-child {
  background-color: rgb(8, 0, 80);
}
</style>
