<script setup>
const navbarState = useState('navbarState', () => 'home')

const linkBorder1 = computed(() => {
  if (navbarState.value === 'contact') {
    return 'border-b-2 border-solid border-black'
  }
})
const linkBorder2 = computed(() => {
  if (navbarState.value === 'about') {
    return 'border-b-2 border-solid border-black'
  }
})
const linkDate = computed(() => {
  if (navbarState.value === 'date') {
    return 'border-b-2 border-solid border-black'
  }
})
const linkFavorites = computed(() => {
  if (navbarState.value === 'favorites') {
    return 'border-b-2 border-solid border-black'
  }
})
const linkBorderHome = computed(() => {
  if (navbarState.value === 'home') {
    return 'border-b-2 border-solid border-black'
  }
})
</script>

<template>
  <div class="flex justify-center items-center font-mono">
    <ul class="flex flex-wrap items-center justify-center gap-4 bg-[#c9a96e] text-[#fffdf9] w-fit p-5 rounded-b-md">
      <li :class="linkBorder1">Contact</li>
      <li :class="linkBorder2">About us</li>
      <li :class="linkFavorites">
        <NuxtLink :to="`/favorites`">Favorites</NuxtLink>
      </li>
      <li :class="linkDate">
          <NuxtLink :to="`/datetoevoegen`">Add date</NuxtLink>
      </li>
      <li :class="linkBorderHome">
        <NuxtLink :to="`/dates`">Home</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {
  cursor: pointer;
}
</style>