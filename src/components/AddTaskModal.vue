\
<template>
  <dialog id="dialog">
    <h3>Add a task</h3>
    <form>
      <p style="margin-bottom: 0">Title:</p>
      <input v-model="task.title" type="text" id="title" />
      <p style="margin: 0">Description:</p>
      <input v-model="task.description" type="text" id="description" />
      <div style="margin: 24px 0">
        <a class="submit" @click="submit">Submit</a>
      </div>
    </form>
    <button @click="closeModal()" aria-label="close" class="x">❌</button>
  </dialog>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "AddTaskModal",
  props: {
    addTaskData: {
      type: Object,
      required: false,
      default: () => {
        return {
          status: "todo",
          openModal: false,
        };
      },
    },
  },
  data() {
    return {
      openModal: false,
      task: {
        title: "",
        description: "",
      },
    };
  },
  watch: {
    openModal(value) {
      if (value) {
        window.dialog.showModal();
      }
    },
  },
  methods: {
    ...mapActions("tasks", ["addTask"]),

    closeModal() {
      window.dialog.close();
      this.$emit("changeModalValue", false);
    },
    submit() {
      let data = {
        title: this.task.title,
        description: this.task.description,
        status: this.addTaskData.status,
      };
      this.addTask(data);
      window.dialog.close();
      this.$emit("changeModalValue", false);
    },
  },
  mounted() {
    this.openModal = true;
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
:root {
  --vs-primary: 29 92 255;
}
/*Dialog Styles*/
dialog {
  background: white;
  max-width: 400px;
  padding: 2rem 3rem 1rem;
  border-radius: 20px;
  border: 0;
  box-shadow: 0 5px 30px 0 #000;
  animation: fadeIn 1s ease both;
}
dialog::backdrop {
  animation: fadeIn 1s ease both;
  /*background: #000000;*/
  z-index: 2;
  /*backdrop-filter: blur(20px);*/
  opacity: 0.32;
}
dialog .x {
  filter: grayscale(1);
  border: none;
  background: none;
  position: absolute;
  top: 15px;
  right: 10px;
  transition: ease filter, transform 0.3s;
  cursor: pointer;
  transform-origin: center;
}
dialog .x:hover {
  filter: grayscale(0);
  transform: scale(1.1);
}
dialog h2 {
  font-weight: 600;
  font-size: 2rem;
  padding-bottom: 1rem;
}
dialog p {
  font-size: 1rem;
  line-height: 1.3rem;
  padding: 0.5rem 0;
}
dialog p a:visited {
  color: #000;
}
/*General Styles*/
body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins, sans-serif;
}
button.primary {
  display: inline-block;
  font-size: 0.8rem;
  color: #fff !important;
  background: #000;
  padding: 13px 25px;
  border-radius: 17px;
  box-sizing: border-box;
  transition: all 0.25s ease;
  border: 0;
  cursor: pointer;
  box-shadow: 0 10px 20px -10px #000;
}
button.primary:hover {
  box-shadow: 0 20px 20px -10px #000;
  transform: translateY(-5px);
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
