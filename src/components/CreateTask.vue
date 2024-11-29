<script setup lang="ts">
import {
  Edit
} from '@element-plus/icons-vue'
import {ref} from "vue";
import {useTask} from "@/composables/useTask";

const props = defineProps<{
  projectId: number
}>()

const emit = defineEmits(['giveTask'])

const {createTask} = useTask()

const name = ref('')
const dueDate = ref('')

const handleCreate = async () => {
  const task = await createTask({
    name: name.value,
    due_date: dueDate.value,
    project_id: props.projectId
  })

  emit('giveTask', task)
}

</script>

<template>
  <div class="flex">
    <el-input v-model="name" placeholder="Nombre de la tarea"></el-input>
    <el-date-picker v-model="dueDate" type="date" placeholder="Fecha de entrega" class="mx-2"></el-date-picker>
    <el-button type="primary" :icon="Edit" circle @click="handleCreate" />
  </div>
</template>
