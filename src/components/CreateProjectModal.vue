<script setup lang="ts">
import { useProjects } from '@/composables/useProjects';
import {onMounted, reactive, ref} from "vue";

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update', 'setProject'])

const { createProject } = useProjects()

const form = reactive({
  name: '',
  description: '',
  status: ''
})

const show = ref(false)
const loading = ref(false)

onMounted(() => {
  show.value = props.visible
})

const handleClose = () => {
  emit('update', false)
}

const handleSave = async () => {
  loading.value = true
  const project = await createProject(form)
  emit('setProject', project)
  loading.value = false
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Cancelar</el-button>
      <el-button type="primary" @click="handleSave">Guardar</el-button>
    </span>
  </el-dialog>
</template>

<style scoped>

</style>