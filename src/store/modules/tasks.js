const state = {
  loadingTasks: false,
  tasks: [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      status: "todo",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      status: "doing",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description 3",
      status: "done",
    },
  ],
};

const getters = {
  getTodoTasks: (state) => {
    return state.tasks.filter((task) => task.status === "todo");
  },
  getDoingTasks: (state) => {
    return state.tasks.filter((task) => task.status === "doing");
  },
  getDoneTasks: (state) => {
    return state.tasks.filter((task) => task.status === "done");
  },
};

const mutations = {
  SET_STATUS(state, payload) {
    const { itemID, status } = payload;
    const item = state.tasks.find((item) => item.id === parseInt(itemID));
    item.status = status;
  },
  REMOVE_TASK(state, payload) {
    const item = state.tasks.find((item) => item.id === parseInt(payload.id));
    const index = state.tasks.indexOf(item);
    state.tasks.splice(index, 1);
  },
  ADD_TASK(state, payload) {
    let id = Math.max(...state.tasks.map((o) => o.id));
    payload.id = id + 1;
    state.tasks.push(payload);
  },
};

const actions = {
  addTask: async ({ commit }, payload) => {
    commit("ADD_TASK", payload);
  },
  removeTask: ({ commit }, payload) => {
    commit("REMOVE_TASK", payload);
  },
  updateTask: async ({ commit }, payload) => {
    commit("SET_STATUS", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
