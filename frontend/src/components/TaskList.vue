<script>
import memeImageSrc from "../assets/itsfine.png";
import { API_BASE } from "../config.js";
import { fetchTasks } from "../api.js";
import { createBreakdown } from "../utils/taskBreakdown.js";

export default {
  name: "TaskList",
  data() {
    return {
      tasks: [],
      apiStatus: "Lade Aufgaben vom Server …",
      showMemePopup: false,
      memeImageSrc,
      newTaskTitle: "",
    };
  },
  computed: {
    openTasks() {
      return this.tasks.filter((task) => !task.done);
    },
  },
  mounted() {
    this.loadTasksFromApi();
  },
  watch: {
    openTasks: {
      immediate: true,
      handler(newValue) {
        this.showMemePopup = newValue.length > 10;
      },
    },
  },
  methods: {
    async loadTasksFromApi() {
      try {
        this.tasks = await fetchTasks();
        this.apiStatus = `${this.tasks.length} Aufgaben vom Backend geladen.`;
      } catch (error) {
        this.apiStatus = `Backend nicht erreichbar (${API_BASE}/tasks). Lokal: Spring Boot starten.`;
        console.error(error);
      }
    },
    addCustomTask() {
      const title = this.newTaskTitle.trim();
      if (!title) {
        return;
      }

      const nextId = this.tasks.length ? Math.max(...this.tasks.map((task) => task.id)) + 1 : 1;
      this.tasks.unshift({
        id: nextId,
        title,
        done: false,
        subtasks: createBreakdown(title),
      });

      this.newTaskTitle = "";
    },
    completedSubtaskCount(task) {
      return task.subtasks.filter((subtask) => subtask.done).length;
    },
    markDone(taskId) {
      const task = this.tasks.find((item) => item.id === taskId);
      if (!task || task.done) {
        return;
      }

      task.done = true;
    },
    toggleSubtask(taskId, subtaskIndex) {
      const task = this.tasks.find((item) => item.id === taskId);
      if (!task) {
        return;
      }

      const subtask = task.subtasks[subtaskIndex];
      subtask.done = !subtask.done;

      const allDone = task.subtasks.length > 0 && task.subtasks.every((item) => item.done);
      task.done = allDone;
    },
    addExampleTasks() {
      const base = this.tasks.length + 1;
      this.tasks.push(
        {
          id: base,
          title: "Feed future-you with groceries",
          done: false,
          subtasks: [
            { text: "Check fridge like a detective", done: false },
            { text: "Write 5 essentials only", done: false },
          ],
        },
        {
          id: base + 1,
          title: "Tiny study sprint",
          done: false,
          subtasks: [
            { text: "Pick one chapter section", done: false },
            { text: "Start 30-minute timer and begin ugly", done: false },
          ],
        },
        {
          id: base + 2,
          title: "Laundry but make it painless",
          done: false,
          subtasks: [
            { text: "Sort clothes into two easy piles", done: false },
            { text: "Start machine and walk away", done: false },
          ],
        }
      );
    },
    closeMemePopup() {
      this.showMemePopup = false;
    },
  },
};
</script>

<template>
  <section class="task-list">
    <h2>TaskWise - tiny wins for busy brains</h2>
    <p class="api-status">{{ apiStatus }}</p>
    <p class="count">Active missions: {{ openTasks.length }}</p>

    <form class="add-task-form" @submit.prevent="addCustomTask">
      <input
        v-model="newTaskTitle"
        type="text"
        placeholder="Add a task and press Enter"
      />
    </form>

    <button class="secondary" type="button" @click="addExampleTasks">Add 3 tiny missions</button>

    <div v-if="showMemePopup" class="meme-overlay" @click.self="closeMemePopup">
      <article class="meme-popup">
        <button type="button" class="close-meme" @click="closeMemePopup">x</button>
        <img :src="memeImageSrc" alt="This is fine meme" class="meme-image" />
        <p class="meme-caption">That's a lot of tasks. Pick one tiny mission and start there.</p>
      </article>
    </div>

    <ul>
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <div class="task-header">
          <span :class="{ done: task.done }">
            {{ task.title }}
            ({{ completedSubtaskCount(task) }}/{{ task.subtasks.length }} steps)
          </span>
          <button type="button" @click="markDone(task.id)" :disabled="task.done">
            {{ task.done ? "Win logged" : "Tiny win" }}
          </button>
        </div>

        <ul class="subtasks">
          <li
            v-for="(step, index) in task.subtasks"
            :key="task.id + '-' + index"
            class="subtask-row"
          >
            <label class="subtask-label">
              <input
                type="checkbox"
                :checked="step.done"
                @change="toggleSubtask(task.id, index)"
              />
              <span :class="{ done: step.done }">{{ index + 1 }}. {{ step.text }}</span>
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
