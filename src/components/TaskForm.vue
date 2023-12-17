<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>{{ formTitle }}</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="task" class="form-label">Задача:</label>
            <input type="text" class="form-control form-control-lg" v-model="editedTask.text" required />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Описание:</label>
            
            <textarea class="form-control form-control-lg" v-model="editedTask.description" style="height: 100px; overflow: auto;" required></textarea>
          </div>
          <button class="btn btn-primary" type="submit">{{ submitButtonText }}добавить</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  computed: {
    editedTask() {
      return this.$store.state.editedTask;
    },
    formTitle() {
      return this.$store.state.formTitle;
    },
    submitButtonText() {
      return this.$store.state.submitButtonText;
    }
  },
  methods: {
    submitForm() {
      this.$store.commit('submitForm');
      this.$router.push('/');
    }
  }
};
</script>
