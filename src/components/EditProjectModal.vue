<script setup lang="ts">
import {useProjects} from '@/composables/useProjects';
import {onMounted, reactive, ref} from "vue";
import type {IProject} from "@/interfaces/IProject";
import CreateTask from "@/components/CreateTask.vue";
import type {ITask} from "@/interfaces/ITask";
import {
  Delete
} from '@element-plus/icons-vue'
import {useTask} from "@/composables/useTask";

const props = defineProps<{
  visible: boolean,
  project: IProject
}>()

const emit = defineEmits(['update', 'updateProject'])

const {updateProject, getTasks} = useProjects()
const {deleteTask} = useTask()

const form = reactive({
  id: props.project.id,
  name: '',
  description: '',
  status: '',
  tasks: [] as ITask[]
})

const show = ref(false)
const loading = ref(false)

onMounted(async () => {
  show.value = props.visible
  form.name = props.project?.name || ''
  form.description = props.project?.description || ''
  form.status = props.project?.status || ''

  form.tasks = await getTasks(props.project.id)
})

const handleClose = () => {
  emit('update', false)
}

const handleSave = async () => {
  loading.value = true
  const project = await updateProject(form)
  emit('updateProject', project)
  loading.value = false
}

const giveTask = (task: ITask) => {
  form.tasks.push(task)
}

const handleDeleteTask = async (index: number, taskId: number) => {
  await deleteTask(taskId)
  form.tasks.splice(index, 1)
}
</script>

<template>
  <el-dialog
      title="Crear Proyecto"
      v-model="show"
      :before-close="handleClose"
  >
    <el-form :model="form" label-width="120px" v-loading="loading">
      <el-form-item label="Nombre">
        <el-input v-model="form.name" placeholder="Nombre del proyecto"></el-input>
      </el-form-item>
      <el-form-item label="Descripción">
        <el-input type="textarea" v-model="form.description" placeholder="Descripción del proyecto"></el-input>
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
      <el-form-item label="Tareas">
        <create-task :project-id="project.id" @giveTask="giveTask"></create-task>
        <div v-for="(task, index) in form.tasks" :key="task.id" class="task">
          <div class="whitespace-pre-wrap">{{ task.name }}</div>
          <el-button type="danger" :icon="Delete" circle @click="handleDeleteTask(index, task.id)"/>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Cancelar</el-button>
      <el-button type="primary" @click="handleSave">Guardar</el-button>
    </span>
  </el-dialog>
</template>

<style scoped>
.task {
  @apply flex my-4 justify-between w-full border-b border-blue-300 py-2 items-center
}
</style>