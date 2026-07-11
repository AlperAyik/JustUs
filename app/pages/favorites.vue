<script setup>
const favorites = ref([]);

onMounted(() => {
  const navbarState = useState('navbarState')
  navbarState.value = "favorites"
})

onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log(favorites.value);
})
</script>

<template>
  <navbar></navbar>
<!--laat alle saved dates zien-->

  <div class="grid grid-cols-3 lg:grid-cols-4">
    <div v-for="favo in favorites" class="">
      <h1>{{favo.titel}}</h1>

    </div>
  </div>
</template>

<style scoped>

</style>