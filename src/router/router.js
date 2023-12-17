import { createRouter, createWebHistory } from 'vue-router';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';


const routes = [
  { path: '/', component: TaskList },
  { path: '/add', name: 'addTask', component: TaskForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

