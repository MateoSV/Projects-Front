<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import type {ITask} from "@/interfaces/ITask";
import {useTask} from "@/composables/useTask";

const props = defineProps<{
  visible: boolean,
  task: ITask | null
}>()

const {updateTask} = useTask()

const emit = defineEmits(['update', 'updateTask'])

const form = reactive({
  id: props.task?.id,
  project_id: props.task?.project_id,
  user_id: props.task?.user_id,
  name: '',
  status: '',
  due_date: '',
})

const show = ref(false)
const loading = ref(false)

onMounted(async () => {
  show.value = props.visible

  form.name = props.task?.name || ''
  form.status = props.task?.status || ''
  form.due_date = props.task?.due_date || ''
})

const handleClose = () => {
  emit('update', false)
}

const handleSave = async () => {
  const task = await updateTask(form)

  emit('updateTask', task)
}
</script>

<template>
  <el-dialog
      title="Editar Tarea"
      v-model="show"
      :before-close="handleClose"
  >
    <el-form :model="form" label-width="150px" v-loading="loading">
      <el-form-item label="Tarea">
        <el-input v-model="form.name" placeholder="Tarea"></el-input>
      </el-form-item>
      <el-form-item label="Estado">
        <el-select v-model="form.status" placeholder="Seleccione un estado">
          <el-option label="En progreso" value="in_progress">
            En progreso
          </el-option>
          <el-option label="Completado" value="completed">
            Completado
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Fecha de entrega">
        <el-date-picker
            v-model="form.due_date"
            type="date"
            placeholder="Fecha de entrega"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Cancelar</el-button>
      <el-button type="primary" @click="handleSave">Guardar</el-button>
    </span>
  </el-dialog>
</template>

<style scoped>
</style>