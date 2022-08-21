

<template>
  <div>
    <button @click="connect">Connect</button>
  </div>

</template>

<script setup lang="ts">
function connect() {
  window.poketto.connect()
}
</script>
