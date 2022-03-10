<template>
  <div class="h-full p-4 overflow-auto bg-teal-600">
    <div class="flex flex-row items-start">
      <div
        class="p-2 mr-4 text-left bg-gray-200 rounded shadow min-w column min-w-350px"
        v-for="(column, columnIndex) of boardStore.data.columns"
        :key="columnIndex"
        @drop="moveTaskOrColumn($event, columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        draggable="true"
        @dragstart.self="pickUpColumn($event, columnIndex)"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div>
          <div
            class="flex flex-wrap items-center px-2 py-2 mb-2 text-gray-900 no-underline bg-white rounded shadow"
            v-for="task of column.tasks"
            :key="task.id"
            @click="selectTask(task)"
            draggable="true"
            @dragstart="pickupTask($event, task.id, column.name)"
          >
            <span class="w-full font-bold shrink-0">
              {{ task.name }}
            </span>
            <p class="w-full mt-1 text-sm shrink-0" v-if="task.description">
              {{ task.description }}
            </p>
          </div>

          <input
            type="text"
            class="block w-full p-2 bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="createTask(column.name, $event)"
          />
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="absolute inset-0 bg-gray-900 bg-opacity-70"
      v-if="isTaskOpen"
      @click.self="selectedTask = null"
    >
      <Task :task="selectedTask" />
    </div>
  </div>
</template>

<script>
import Task from './Task.vue'

export default {
  components: {
    Task,
  },
  name: 'Board',
  props: {
    boardStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedTask: null,
    }
  },
  computed: {
    isTaskOpen() {
      return this.selectedTask !== null
    },
  },
  methods: {
    selectTask(task) {
      this.selectedTask = task
    },

    createTask(columnName, event) {
      if (event.target.value) {
        this.boardStore.createTask(columnName, event.target.value)
        event.target.value = ''
      }
    },

    pickupTask(event, taskId, fromColumnName) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('task-id', taskId)
      event.dataTransfer.setData('from-column-name', fromColumnName)
      event.dataTransfer.setData('type', 'task')
    },

    pickUpColumn(event, fromIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('from-index', fromIndex)
      event.dataTransfer.setData('type', 'column')
    },

    moveTaskOrColumn(event, toColumnIndex) {
      const type = event.dataTransfer.getData('type')

      if (type === 'task') {
        this.moveTask(event, toColumnIndex)
      } else {
        this.moveColumn(event, toColumnIndex)
      }
    },

    moveTask(event, toColumnIndex) {
      const fromColumnName = event.dataTransfer.getData('from-column-name')
      const taskId = event.dataTransfer.getData('task-id')
      this.boardStore.moveTask(fromColumnName, toColumnIndex, taskId)
    },

    moveColumn(event, toIndex) {
      const fromIndex = event.dataTransfer.getData('from-index')
      this.boardStore.moveColumn(fromIndex, toIndex)
    },
  },
}
</script>

<style></style>
