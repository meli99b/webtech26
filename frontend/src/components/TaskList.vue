<script>
import memeImageSrc from "../assets/itsfine.png";
import { API_BASE } from "../config.js";
import { fetchTasks } from "../api.js";
import { createBreakdown } from "../utils/taskBreakdown.js";
import { pickExampleMissions } from "../utils/exampleMissions.js";

export default {
  name: "TaskList",
  data() {
    return {
      tasks: [],
      apiStatus: "Lade Aufgaben vom Server …",
      showMemePopup: false,
      memeImageSrc,
      newTaskTitle: "",
      editingTaskId: null,
      editTitle: "",
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
    startEdit(task) {
      this.editingTaskId = task.id;
      this.editTitle = task.title;
    },
    cancelEdit() {
      this.editingTaskId = null;
      this.editTitle = "";
    },
    saveEdit(taskId) {
      const title = this.editTitle.trim();
      if (!title) {
        return;
      }

      const task = this.tasks.find((item) => item.id === taskId);
      if (!task) {
        return;
      }

      task.title = title;
      task.done = false;
      task.subtasks = createBreakdown(title);
      this.cancelEdit();
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      if (this.editingTaskId === taskId) {
        this.cancelEdit();
      }
    },
    addExampleTasks() {
      const existingTitles = this.tasks.map((task) => task.title);
      const picked = pickExampleMissions(existingTitles, 3);
      let nextId = this.tasks.length
        ? Math.max(...this.tasks.map((task) => task.id)) + 1
        : 1;

      picked.forEach((mission) => {
        this.tasks.push({
          id: nextId,
          title: mission.title,
          done: false,
          subtasks: mission.subtasks,
        });
        nextId += 1;
      });
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
          <form
            v-if="editingTaskId === task.id"
            class="edit-task-form"
            @submit.prevent="saveEdit(task.id)"
          >
            <input v-model="editTitle" type="text" class="edit-task-input" />
            <div class="edit-actions">
              <button type="submit" class="small-btn">Speichern</button>
              <button type="button" class="small-btn secondary-btn" @click="cancelEdit">
                Abbrechen
              </button>
            </div>
          </form>
          <span v-else class="task-title" :class="{ done: task.done }">
            {{ task.title }}
            ({{ completedSubtaskCount(task) }}/{{ task.subtasks.length }} steps)
          </span>

          <div v-if="editingTaskId !== task.id" class="task-actions">
            <button type="button" class="small-btn secondary-btn" @click="startEdit(task)">
              Bearbeiten
            </button>
            <button type="button" class="small-btn danger-btn" @click="deleteTask(task.id)">
              Löschen
            </button>
            <button type="button" class="small-btn win-btn" @click="markDone(task.id)" :disabled="task.done">
              {{ task.done ? "Erledigt" : "Tiny win" }}
            </button>
          </div>
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
