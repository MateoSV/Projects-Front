<script setup lang="ts">

import {onMounted} from 'vue'
import {useTask} from "@/composables/useTask";
import {useI18n} from 'vue-i18n';
import EditTaskModal from "@/components/EditTaskModal.vue";
import type {ITask} from "@/interfaces/ITask";
import AssingUserModal from "@/components/AssingUserModal.vue";

const {t} = useI18n();
const {fetchTasks, tasks, visible, task, assingUserShow} = useTask()


onMounted(() => {
  fetchTasks()
})

const handleEdit = (taskSelected: ITask) => {
  task.value = taskSelected
  visible.value = true
}

const setVisible = (value: boolean) => {
  visible.value = value
}

const updateTask = (task: ITask) => {
  const index = tasks.value.findIndex((t) => t.id === task.id)
  tasks.value[index] = task
  setVisible(false)
  assingUserShow.value = false
}

const handleAssing = (taskSelected: ITask) => {
  task.value = taskSelected
  assingUserShow.value = true
}

</script>

<template>
  <div class="p-4">
    <div class="page-title">
      Tareas
    </div>
    <el-table :data="tasks" stripe style="width: 100%">
      <el-table-column prop="project_name" label="Proyecto"/>
      <el-table-column prop="name" label="Tarea"/>
      <el-table-column label="Estado">
        <template #default="{ row }">
          <el-tag :type="row.status ===  'in_progress' ? 'warning' : 'success' ">{{ t(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="due_date" label="Fecha de entrega"/>
      <el-table-column align="right">
        <template #default="{row}">
          <el-button size="small" @click="handleEdit(row)">
            Editar
          </el-button>
          <el-button size="small" type="primary" @click="handleAssing(row)">
            Asignar
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <edit-task-modal v-if="visible && task"
                     :visible="visible"
                     :task="task"
                     @update="setVisible"
                     @updateTask="updateTask"></edit-task-modal>

    <assing-user-modal v-if="assingUserShow && task" :visible="assingUserShow" :task="task" @update="assingUserShow = false"
                       @updateTask="updateTask"></assing-user-modal>
  </div>
</template>

<style scoped>
.page-title {
  @apply text-4xl text-blue-400 mb-6;
}
</style>