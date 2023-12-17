
import { createStore } from 'vuex';


export default createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [
      { id: 1, text: 'Название задачи', description: 'Описание задачи', completed: true, date: new Date() },
    ],
    editedTask: {
      id: null,
      text: "",
      description: "",
      completed: false
    },
    formTitle: "",
    submitButtonText: "",
    searchQuery: "",
    sortByDate: false,
  },

  mutations: {
    editTask(state, task) {
      state.editedTask = { ...task };
      state.formTitle = "Редактировать задачу";
      state.submitButtonText = "Сохранить";
    },
    updateTasks(state, updatedTasks) {
      state.tasks = updatedTasks;
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    submitForm(state) {
      if (state.editedTask.id) {
        const index = state.tasks.findIndex((task) => task.id === state.editedTask.id);
        state.tasks.splice(index, 1, { ...state.editedTask });
      } else {
        state.editedTask.id = state.tasks.length + 1;
        state.editedTask.date = new Date();
        state.tasks.push({ ...state.editedTask });
      }
      state.editedTask = {
        id: null,
        text: "",
        description: "",
        completed: false
      };
      state.formTitle = "";
      state.submitButtonText = "";

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateSearchQuery(state, value) {
      state.searchQuery = value;
    },
    updateSortByDate(state, value) {
      state.sortByDate = value;
    },
  },

  getters: {
    filteredTasks(state) {
      const query = state.searchQuery.toLowerCase();
      return state.tasks.filter(task => task.text.toLowerCase().includes(query));
    }
  }
});
