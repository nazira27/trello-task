<template>
  <div class="card" draggable="true" @dragstart="startDrag($event, task)">
    <h5 v-if="task.title">{{ task.title }}</h5>
    <p>{{ task.description }}</p>
    <div style="text-align: end">
      <a class="delete-btn" href="javascript:void(0)" @click="deleteTask">
        <img src="../assets/images/trash_icon.svg" height="32" />
      </a>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "CardComponent",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("tasks", ["removeTask"]),
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    deleteTask() {
      this.removeTask(this.task);
    },
  },
};
</script>
<style></style>
