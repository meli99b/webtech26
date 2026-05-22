<script>
import TaskList from "./components/TaskList.vue";

export default {
  name: "App",
  components: {
    TaskList,
  },
};
</script>

<template>
  <main class="container">
    <TaskList />
  </main>
</template>
