<script setup>
const open = ref(false);
</script>

<template>
  <div class="flex justify-center items-center font-mono" >
    <ul class="flex flex-wrap items-center justify-center gap-4 bg-[#c9a96e] text-[#fffdf9] w-fit p-5 rounded-b-md">
      <li>Contact</li>
      <li>About us</li>
      <li><NuxtLink :to="`/favorites`">Favorites</NuxtLink></li>
      <li><button v-if="open"><NuxtLink :to="`/datetoevoegen`">Add date</NuxtLink></button></li>
      <li><NuxtLink :to="`/`">Home</NuxtLink></li>
    </ul>
  </div>
</template>

<style scoped>
li {
  cursor: pointer;
}
</style>