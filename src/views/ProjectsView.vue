<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useProjects} from '@/composables/useProjects';
import type {IProject} from "@/interfaces/IProject";
import CreateProjectModal from "@/components/CreateProjectModal.vue";
import {useI18n} from 'vue-i18n';
import EditProjectModal from "@/components/EditProjectModal.vue";

const {projects, fetchProjects, visible, visibleEdit, project, deleteProject} = useProjects();
const {t} = useI18n();

onMounted(() => {
  fetchProjects();
});

const handleEdit = (index: number, selectedProject: IProject) => {
  project.value = selectedProject;
  visibleEdit.value = true;
};

const handleDelete = (index: number, project: IProject) => {
  deleteProject(project.id);
  projects.value.splice(index, 1);
};

const handleCreate = (value: boolean) => {
  visible.value = value
}

const setProject = (project: IProject) => {
  projects.value.push(project)
  visible.value = false
}

const setVisibleEdit = (value: boolean) => {
  visibleEdit.value = value
}

const updateProject = (project: IProject) => {
  const index = projects.value.findIndex(p => p.id === project.id)
  projects.value[index] = project
  setVisibleEdit(false)
}

</script>

<template>
  <div class="p-4">
    <div class="page-title">
      Proyectos
    </div>
    <el-table :data="projects" stripe style="width: 100%">
      <el-table-column prop="id" label="ID"/>
      <el-table-column prop="name" label="Nombre"/>
      <el-table-column label="Estado">
        <template #default="{ row }">
          <el-tag :type="row.status ===  'in_progress' ? 'warning' : 'success' ">{{ t(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-button size="small" type="success" @click="handleCreate(true)" class="mb-4">
            Crear Proyecto
          </el-button>
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            Editar
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >
            Eliminar
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <create-project-modal v-if="visible" :visible="visible" @update="handleCreate" @setProject="setProject"/>
    <edit-project-modal v-if="visibleEdit && project"
                        :visible="visibleEdit"
                        :project="project"
                        @update="setVisibleEdit"
                        @updateProject="updateProject"/>
  </div>
</template>

<style scoped>
.page-title {
  @apply text-4xl text-blue-400 mb-6;
}
</style>