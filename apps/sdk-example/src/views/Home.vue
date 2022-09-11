

<template>
  <div>
    <div v-if="address">
      <p>Connected: {{address}}</p>
      <button @click="disconnect">Disconnect</button>
      <router-link to="/create-nft-collection">Create NFT Collection</router-link>
      <router-view></router-view>
    </div>
    <button v-else @click="connect">Connect</button>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const address = ref('')
async function connect() {
  try {
    // @ts-ignore
    const data = await window.poketto.connect()
    address.value = data.address
  } catch (e) {
    console.error(e)
  }
}

async function disconnect() {
  try {
    // @ts-ignore
    const data = await window.poketto.disconnect(address.value)
    address.value = ''
  } catch (e) {
    console.error(e)
  }
}
</script>
