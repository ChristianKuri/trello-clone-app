<template>
  <div
    class="relative inset-0 flex flex-col max-w-2xl py-4 m-32 mx-auto text-left bg-white rounded shadow"
  >
    <div class="flex flex-col items-start justify-between flex-grow px-4">
      {{ task.name }}
    </div>
    <textarea
      class="relative h-64 px-2 mt-2 leading-normal bg-transparent border border-none"
      :value="task.description"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
