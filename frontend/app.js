const TaskList = {
  name: "TaskList",
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "Make tomorrow less chaotic",
          done: false,
          subtasks: [
            { text: "Open last week's notes and steal the useful bits", done: false },
            { text: "Write 3 tiny bullet points, not a masterpiece", done: false },
            { text: "Set a 10-minute timer and call it a win", done: false },
          ],
        },
        {
          id: 2,
          title: "Rescue desk",
          done: false,
          subtasks: [
            { text: "Collect and remove obvious trash first", done: false },
            { text: "Move dishes to the kitchen in one trip", done: false },
            { text: "Clear one desk zone so your brain can breathe", done: false },
          ],
        },
        {
          id: 3,
          title: "Write that email you've been dodging",
          done: false,
          subtasks: [
            { text: "Open inbox and ignore everything else for now", done: false },
            { text: "Find the one email you've been avoiding", done: false },
            { text: "Send a 2-minute reply and move on", done: false },
          ],
        },
      ],
      showMemePopup: false,
      memeImageSrc: "./assets/itsfine.png",
      newTaskTitle: "",
    };
  },
  computed: {
    openTasks() {
      return this.tasks.filter((task) => !task.done);
    },
  },
  methods: {
    createBreakdown(title) {
      const task = title.toLowerCase();
      const hasAny = (keywords) => keywords.some((keyword) => task.includes(keyword));
      const recipientMatch = title.match(/for\s+(.+)/i);
      const recipient = recipientMatch ? recipientMatch[1].trim() : "them";

      if (hasAny(["email", "e-mail", "mail", "inbox", "reply"])) {
        return [
          { text: "Open inbox and locate the one message that matters most", done: false },
          { text: "Write a rough 2-line reply first", done: false },
          { text: "Polish quickly and send it", done: false },
        ];
      }

      if (hasAny(["study", "learn", "exam", "read", "lecture", "homework"])) {
        return [
          { text: "Pick one small section only", done: false },
          { text: "Set a 15-minute timer", done: false },
          { text: "Write 3 quick notes from what you read", done: false },
        ];
      }

      if (hasAny(["clean", "desk", "room", "laundry", "tidy", "kitchen"])) {
        return [
          { text: "Trash first: remove obvious clutter", done: false },
          { text: "Put misplaced items in one pile", done: false },
          { text: "Clear one visible surface", done: false },
        ];
      }

      if (hasAny(["shop", "grocery", "buy", "groceries", "supermarket"])) {
        return [
          { text: `List only essentials for "${title}"`, done: false },
          { text: "Group items by section (produce, pantry, other)", done: false },
          { text: "Buy just the list and leave", done: false },
        ];
      }

      if (hasAny(["call", "phone", "appointment", "doctor"])) {
        return [
          { text: `Find contact details for "${title}"`, done: false },
          { text: "Write one sentence for what you need", done: false },
          { text: "Make the call and note the result", done: false },
        ];
      }

      if (hasAny(["gift", "present", "birthday", "mothers day", "mother's day", "christmas"])) {
        return [
          { text: `Set a budget range for ${recipient}`, done: false },
          { text: "Pick one category (flowers, self-care, book, experience)", done: false },
          { text: "Choose one item and add it to cart or note the store", done: false },
        ];
      }

      if (hasAny(["trip", "travel", "vacation", "holiday"])) {
        return [
          { text: `Pick destination and dates for "${title}"`, done: false },
          { text: "Set total budget (transport + stay + food)", done: false },
          { text: "Book first anchor item (flight/train/hotel)", done: false },
        ];
      }

      if (hasAny(["plan", "planning", "organize", "schedule"])) {
        return [
          { text: `Write the goal for "${title}" in one sentence`, done: false },
          { text: "List the top 3 actions only", done: false },
          { text: "Schedule the first action on calendar", done: false },
        ];
      }

      if (hasAny(["meeting", "sync", "standup", "call with"])) {
        return [
          { text: `Write the agenda for "${title}" in 3 bullets`, done: false },
          { text: "Prepare required files/links before start", done: false },
          { text: "Add one follow-up action after the meeting", done: false },
        ];
      }

      if (hasAny(["flight", "plane", "airport", "boarding"])) {
        return [
          { text: "Compare 2-3 flight options by time and price", done: false },
          { text: "Book ticket and save confirmation details", done: false },
          { text: "Set reminders for check-in and airport departure", done: false },
        ];
      }

      return [
        { text: `Clarify what "done" means for "${title}"`, done: false },
        { text: `Do the easiest 2-minute starter step for "${title}"`, done: false },
        { text: `Take one concrete next action on "${title}"`, done: false },
      ];
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
        subtasks: this.createBreakdown(title),
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
  watch: {
    openTasks: {
      immediate: true,
      handler(newValue) {
        if (newValue.length > 10) {
          this.showMemePopup = true;
        } else {
          this.showMemePopup = false;
        }
      },
    },
  },
  template: `
    <section class="task-list">
      <h2>TaskWise - tiny wins for busy brains</h2>
      <p class="count">Active missions: {{ openTasks.length }}</p>

      <form class="add-task-form" @submit.prevent="addCustomTask">
        <input
          v-model="newTaskTitle"
          type="text"
          placeholder="Add a task and press Enter"
        />
      </form>

      <button class="secondary" @click="addExampleTasks">Add 3 tiny missions</button>

      <div v-if="showMemePopup" class="meme-overlay" @click.self="closeMemePopup">
        <article class="meme-popup">
          <button class="close-meme" @click="closeMemePopup">x</button>
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
            <button @click="markDone(task.id)" :disabled="task.done">
              {{ task.done ? "Win logged" : "Tiny win" }}
            </button>
          </div>

          <ul class="subtasks">
            <li v-for="(step, index) in task.subtasks" :key="task.id + '-' + index" class="subtask-row">
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
  `,
};

Vue.createApp({
  components: {
    TaskList,
  },
  template: `
    <main class="container">
      <TaskList />
    </main>
  `,
}).mount("#app");
