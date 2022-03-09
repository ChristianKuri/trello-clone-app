<script setup>
import { useBoardStore } from './stores/BoardStore'

const boardStore = useBoardStore()
</script>

<template>
  <Board :boardStore="boardStore" />
</template>

<style lang="css">
.min-w-350px {
  min-width: 350px;
}
</style>
