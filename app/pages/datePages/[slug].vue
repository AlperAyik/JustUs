<script setup>
const route = useRoute();
const date = ref({});

const {data, pending, error} = await useFetch('http://localhost:3001/dateIdeas')

const slug = data.value.filter((item) => item.slug === route.params.slug);
date.value = slug;
console.log(date.value?.[0]);
const dates = date.value?.[0]

//voeg loading animation toe en check als deze date ook in favorites staat zo ja zet ergens deze date heb je al opgeslagen
</script>

<template>
<!-- maak info page voor dates -->
  <div v-if="error">
    {{error}}
  </div>
  <div v-else-if="pending">
    loading...
  </div>
  <div v-else>
    {{dates.titel}}
  </div>
</template>