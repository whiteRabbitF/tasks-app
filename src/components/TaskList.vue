<template>
  <div>
    <header class="header bg-primary text-white p-3">
      <div class="container d-flex align-items-center justify-content-between">
        <div class="fs-4 fw-bold">To Do</div>
        <input v-model="searchQuery" placeholder="Поиск по задачам" class="form-control mx-auto" name="search-input"/>
        <img src="/assets/search.png" alt="поиск">
      </div>
    </header>
    <div v-if="filteredTasks.length === 0" class="text-center mt-3">
      <p>Ничего не найдено</p>
    </div>

  <div v-if="filteredTasks.length > 0" class="container mt-4">
      <h2 class="text-center fw-bold">Список задач</h2>
      <div class="d-flex justify-content-between align-items-center mb-3">
    <span class="sort">Сортировать по дате:</span>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" v-model="sortByDate" name="checkbox-input"/>
        <label>Сортировать</label>
      </div>
    </div>
  </div>
    <div class="container">
      <ul class="list-group mx-auto">
        <li v-for="task in sortedTasks" :key="task.id" class="list-group-item task">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p class="time">Дата добавления: {{ formatDate(task.date) }}</p>
              <label class="form-check-label name">{{ task.text }}</label>
              <div class="description" style="overflow: auto;">{{ task.description }}</div>
            </div>
          <div class="buttons">
            <router-link to="/add">
              <button @click="editTask(task)" class="edit-btn" title="Редактировать">
              <span class="edit-span">Редактировать</span>
              <img src="/assets/edit.png" alt="редактировать">
            </button>
          </router-link>
            <button @click="deleteTask(task.id)" class="delete-btn" title="Удалить">
              <span class="delete-span">Удалить</span>
              <img src="/assets/delete.png" alt="удалить">
            </button>
          </div>
          </div>
        </li>
      </ul>
      <router-link to="/add" class="position-fixed bottom-0 end-0 p-3">
        <button class="btn btn-primary rounded-circle">
          <span class="visually-hidden">Добавить задачу</span>
            <img src="/assets/plus-icon.png" alt="Добавить задачу" />
        </button>
    </router-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    searchQuery: {
      get() {
        return this.$store.state.searchQuery;
      },
      set(value) {
        this.$store.commit('updateSearchQuery', value);
      }
    },
    sortByDate: {
      get() {
        return this.$store.state.sortByDate;
      },
      set(value) {
        this.$store.commit('updateSortByDate', value);
      }
    },
    filteredTasks() {
      const query = this.searchQuery.toLowerCase();
      return this.tasks.filter(task =>
        task.text.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    },
    sortedTasks() {
      let sorted = [...this.filteredTasks];
      if (this.sortByDate) {
        sorted = sorted.sort((a, b) => {
          return moment(a.date).diff(moment(b.date));
        });
      }
      return sorted;
    },
  },
  methods: {
    editTask(task) {
      this.$store.commit('editTask', task);
    },
    deleteTask(taskId) {
      this.$store.commit('deleteTask', taskId);
    },
    formatDate(date) {
      moment.locale('ru');
      return moment(date).format('dd, D MMM YYYY');
    },
  }
};
</script>

<style scoped>
.header {
  background-color: #007bff;
  color: #ffffff;
  padding: 10px;
  min-height: 100wh;
}
.header img{
  width: 30px;
}

.header input {
  height: 30px;
  border: none; 
  border-radius: 10px;
  margin-left: 10px;
  max-width: 700px;
  padding: 20px;
}

input[type="checkbox"] {
  transform: scale(2);
  margin-right: 50px;
  margin-bottom: 250px;
}

.header span {
  font-size: 20px;
  cursor: pointer;
}
.header .fs-4 {
  font-size: 22px;
  font-weight: 500;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  margin-left: 10px;
}

.buttons {
  display: flex;
  flex-direction: row;
  margin-left: auto;
}

.buttons img {
  width: 30px;
}

.task {
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 8px rgba(0, 0, 0, 0.15), 0 8px 10px rgba(0, 0, 0, 0.2), 0 10px 12px rgba(0, 0, 0, 0.25);
}
.sort{
  font-size: 18pt;
}
.name,
.description {
  word-wrap: break-word;
  overflow: hidden;
}

.name {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  min-width: 500px;
  height: 50px;
  font-size: 12pt;
}

.description {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  min-width: 500px;
  height: 120px;
  font-size: 14pt;
}

@media (max-width: 768px) {
  .name {
    height: auto;
    font-size: 10pt;
  }

  .description {
    height: auto;
    font-size: 12pt;
  }
}

@media (max-width: 480px) {
  .name,
  .description {
    min-width: auto;
  }
}

.time{
  font-size: 12pt;
}

.edit-btn,
.delete-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.edit-span,
.delete-span{
  display: none;
  font-size: 12px;
}

.edit-btn:hover .edit-span,
.delete-btn:hover .delete-span {
  display: inline;
}

.buttons img {
  width: 30px;
}

.btn-primary {
  position: fixed;
  bottom: 100px; 
  right: 100px;
  z-index: 1000;
  transition: opacity 0.3s ease;
  background-color: #1e64af;
}


.btn-primary img {
  width: 50px;
}

.btn-primary:hover {
  background-color: #0d3e72;
  border-color: #0056b3;
}

.visually-hidden {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-primary:hover .visually-hidden {
  opacity: 1;
}

</style>
