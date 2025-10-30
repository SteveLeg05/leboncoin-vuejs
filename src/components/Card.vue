<script setup>
const props = defineProps({
  avatar: String,
  username: String,
  picture: String,
  title: String,
  price: Number,
  date: String,
})
</script>
<template>
  <main>
    <section class="offerCard">
      <div>
        <img :src="avatar" alt="avatar du propriétaire" />
        <p>{{ username }}</p>
      </div>

      <img :src="picture" alt="image de l'article" />
      <h3>{{ title }}</h3>
      <p>{{ price }}</p>
      <p>{{ date }}</p>
    </section>
  </main>
</template>
<style script>
.offerCard {
  border: solid 2px green;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
}

.offerCard > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.offerCard > div img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.offerCard > div p {
  font-size: 18px;
  font-weight: bold;
}
</style>
