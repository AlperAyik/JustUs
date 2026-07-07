<script setup>
const open = ref(false);

const obj = ref({
  link1: false,
  link2: false,
  link3: false,
  link4: false,
  link5: false,
})

function activeLink(curr) {
  if(curr === "link1") {
    obj.value.link1 = true;
  }
}

const linkBorder = computed(() => {
  Object.entries(obj.value).forEach(([key, value]) => {
    key = false
    console.log(key, value);
  })
  if(obj.value.link1 == true) {
    return 'border-b-2 border-solid border-black'
  }
})
</script>

<template>
  <div class="flex justify-center items-center font-mono" >
    <ul class="flex flex-wrap items-center justify-center gap-4 bg-[#c9a96e] text-[#fffdf9] w-fit p-5 rounded-b-md">
      <li>Contact</li>
      <li @click="activeLink('link1')" :class="linkBorder">About us</li>
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