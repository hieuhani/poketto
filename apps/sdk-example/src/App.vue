

<template>
  <div>
    <button @click="connect">Connect</button>
  </div>

</template>

<script setup lang="ts">
function connect() {
  // @ts-ignore
  window.poketto.connect()
}
</script>
