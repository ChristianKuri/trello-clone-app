<template>
  <div class="min-h-screen p-4 overflow-auto bg-teal-600">
    <div class="flex flex-row items-start">
      <!-- Start columns -->
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
        <div class="flex items-center justify-between mb-2 font-bold">
          <div>
            {{ column.name }}
          </div>
          <button type="button" @click="deleteColumn(columnIndex)">X</button>
        </div>
        <div>
          <div
            class="flex flex-wrap items-center px-2 py-2 mb-2 text-gray-900 no-underline bg-white rounded shadow"
            v-for="(task, taskIndex) of column.tasks"
            :key="task.id"
            @click="selectTask(task)"
            draggable="true"
            @dragstart="pickupTask($event, taskIndex, columnIndex)"
            @dragover.prevent
            @dragenter.prevent
            @drop.stop="moveTaskOrColumn($event, columnIndex, taskIndex)"
          >
            <span class="w-full font-bold shrink-0">
              <div class="flex justify-between">
                <div>
                  {{ task.name }}
                </div>
                <button
                  type="button"
                  @click.stop="deleteTask(columnIndex, taskIndex)"
                >
                  X
                </button>
              </div>
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
      <!-- End columns -->

      <!-- Create new column -->
      <div
        class="flex p-2 mr-4 text-left bg-gray-200 rounded shadow min-w column min-w-350px"
      >
        <input
          type="text"
          @keyup.enter="createColumn($event)"
          class="flex-grow p-2 mr-2 bg-transparent"
          placeholder="+ Enter new column"
        />
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

    createColumn(event) {
      if (event.target.value) {
        this.boardStore.createColumn(event.target.value)
        event.target.value = ''
      }
    },

    pickupTask(event, fromTaskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('from-task-index', fromTaskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'task')
    },

    pickUpColumn(event, fromIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('from-index', fromIndex)
      event.dataTransfer.setData('type', 'column')
    },

    moveTaskOrColumn(event, toColumnIndex, toTaskIndex = null) {
      const type = event.dataTransfer.getData('type')

      if (type === 'task') {
        this.moveTask(event, toColumnIndex, toTaskIndex)
      } else {
        this.moveColumn(event, toColumnIndex)
      }
    },

    moveTask(event, toColumnIndex, toTaskIndex = null) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      const fromTaskIndex = event.dataTransfer.getData('from-task-index')
      this.boardStore.moveTask(
        fromColumnIndex,
        toColumnIndex,
        fromTaskIndex,
        toTaskIndex,
      )
    },

    moveColumn(event, toIndex) {
      const fromIndex = event.dataTransfer.getData('from-index')
      this.boardStore.moveColumn(fromIndex, toIndex)
    },

    deleteColumn(index) {
      this.boardStore.deleteColumn(index)
    },

    deleteTask(columnIndex, taskIndex) {
      this.boardStore.deleteTask(columnIndex, taskIndex)
    },
  },
}
</script>

<style></style>
