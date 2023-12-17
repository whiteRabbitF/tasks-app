<template>
  <div id="app">
    <TaskList 
    v-if="$route.path !== '/add'"/>
    <TaskForm 
    v-if="$route.path !== '/'"/>
  </div>
</template>

<script>
import TaskList from "./components/TaskList.vue";
import TaskForm from "./components/TaskForm.vue";

export default {
  name: "App",
  components: {
    TaskList,
    TaskForm
  }
};
</script>


<style>

*{
  font-family: 'Mulish', sans-serif;
}
</style>
