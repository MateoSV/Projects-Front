<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import type {ITask} from "@/interfaces/ITask";
import {useTask} from "@/composables/useTask";

const props = defineProps<{
  visible: boolean,
  task: ITask | null
}>()

const {updateTask, fetchUsers, users} = useTask()

const emit = defineEmits(['update', 'updateTask'])

const show = ref(false)
const loading = ref(false)
const user_id = ref(null)

onMounted(async () => {
  show.value = props.visible
  await fetchUsers()
})

const handleClose = () => {
  emit('update', false)
}

const handleSave = async () => {
  loading.value = true;
  const data: Partial<ITask> = {
    id: props.task?.id,
    user_id: user_id.value
  };
  const task = await updateTask(data);

  emit('updateTask', task);
  loading.value = false;
};
</script>

<template>
  <el-dialog
      title="Editar Tarea"
      v-model="show"
      :before-close="handleClose"
  >
    <el-select v-model="user_id" class="my-6" placeholder="Seleccione un usuario">
      <el-option
          v-for="user in users"
          :key="user.id"
          :label="user.name"
          :value="user.id"
      />
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Cancelar</el-button>
      <el-button type="primary" @click="handleSave">Guardar</el-button>
    </span>
  </el-dialog>
</template>

<style scoped>
</style>