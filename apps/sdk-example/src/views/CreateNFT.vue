

<template>
    <button @click="createNFTCollection">Create NFT Collection</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const address = ref('')
async function createNFTCollection() {
  console.log({ address})
  try {
    // @ts-ignore
    const data = await window.poketto.createNFTCollection({
      name: "My NFT Collection",
      description: "My NFT Collection Description",
      image: "https://example.com/image.png",
      maxAmount: 100,
    })
    console.log({ data })

  } catch (e) {
    console.error(e)
  }
}


</script>
