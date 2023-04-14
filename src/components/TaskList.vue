<template>
  <div class="container">
    <h1>Trello</h1>
    <div class="row">
      <div
        class="col board"
        @drop="onDrop($event, 'todo')"
        @dragover.prevent
        @dragenter.prevent
      >
        <h3>To do</h3>
        <Card v-for="(item, index) in getTodoTasks" :key="index" :task="item" />
        <a href="javascript:void(0)" class="btn" @click="openModal('todo')"
          >+ Add a card</a
        >
      </div>
      <div
        class="col board"
        @drop="onDrop($event, 'doing')"
        @dragover.prevent
        @dragenter.prevent
      >
        <h3>Doing</h3>
        <Card
          v-for="(item, index) in getDoingTasks"
          :key="index"
          :task="item"
        />
        <a href="javascript:void(0)" class="btn" @click="openModal('doing')"
          >+ Add a card</a
        >
      </div>
      <div
        class="col board"
        @drop="onDrop($event, 'done')"
        @dragover.prevent
        @dragenter.prevent
      >
        <h3>Done</h3>
        <Card v-for="(item, index) in getDoneTasks" :key="index" :task="item" />
        <a href="javascript:void(0)" class="btn" @click="openModal('done')"
          >+ Add a card</a
        >
      </div>
    </div>
    <AddTaskModal
      v-if="addTaskData && addTaskData.openModal"
      :addTaskData="addTaskData"
      @changeModalValue="changeModalValue"
    />
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import AddTaskModal from "@/components/AddTaskModal.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TaskList",
  data() {
    return {
      addTaskData: {
        status: "",
        openModal: false,
      },
      openConfirmModal: false,
    };
  },
  components: {
    Card,
    AddTaskModal,
  },
  computed: {
    ...mapGetters("tasks", ["getTodoTasks", "getDoingTasks", "getDoneTasks"]),
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    onDrop(evt, status) {
      console.log(evt);
      const itemID = evt.dataTransfer.getData("itemID");
      let data = {
        itemID,
        status,
      };
      this.$store.dispatch("tasks/updateTask", data);
    },
    openModal(status) {
      this.addTaskData.status = status;
      this.addTaskData.openModal = true;
    },
    changeModalValue(value) {
      this.addTaskData.openModal = value;
    },
  },
};
</script>
<style></style>
