<script setup>
const route = useRoute();
const date = ref({});

onMounted(async () => {
  const data = await $fetch('http://localhost:3001/dateIdeas');

  const slug = data.filter((item) => item.slug === route.params.slug);
  date.value = slug;
  console.log(date.value?.[0]);
})
</script>

<template>

</template>