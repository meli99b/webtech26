const EXAMPLE_MISSION_POOL = [
  {
    title: "Feed future-you with groceries",
    subtasks: [
      { text: "Check fridge and note what is actually missing", done: false },
      { text: "Write a 5-item list — nothing extra", done: false },
      { text: "Grab the list and do one quick shop run", done: false },
    ],
  },
  {
    title: "Tiny study sprint",
    subtasks: [
      { text: "Pick one chapter section — just one", done: false },
      { text: "Set a 25-minute timer and start messy", done: false },
      { text: "Write 3 bullet notes before the timer ends", done: false },
    ],
  },
  {
    title: "Laundry but make it painless",
    subtasks: [
      { text: "Sort clothes into lights and darks only", done: false },
      { text: "Start one load — do not wait for perfection", done: false },
      { text: "Set a reminder to move clothes to dry", done: false },
    ],
  },
  {
    title: "Reply to that one email",
    subtasks: [
      { text: "Open inbox and find the overdue message", done: false },
      { text: "Draft a 2-sentence reply — rough is fine", done: false },
      { text: "Send it and archive the thread", done: false },
    ],
  },
  {
    title: "Reset the kitchen counter",
    subtasks: [
      { text: "Move dishes to the sink in one trip", done: false },
      { text: "Wipe the counter with what you have nearby", done: false },
      { text: "Put away 3 items that do not belong there", done: false },
    ],
  },
  {
    title: "Pack bag for tomorrow",
    subtasks: [
      { text: "List what you need for tomorrow morning", done: false },
      { text: "Put charger, keys, and essentials in the bag", done: false },
      { text: "Lay out clothes so morning-you does less thinking", done: false },
    ],
  },
  {
    title: "Water the plants before they judge you",
    subtasks: [
      { text: "Check which plants look thirsty", done: false },
      { text: "Fill a cup or bottle with water", done: false },
      { text: "Water the dry ones — skip the drama plants", done: false },
    ],
  },
  {
    title: "Doctor appointment prep",
    subtasks: [
      { text: "Find the appointment time and location", done: false },
      { text: "Write down 2 symptoms or questions to mention", done: false },
      { text: "Gather insurance card and ID in one spot", done: false },
    ],
  },
  {
    title: "Birthday gift hunt",
    subtasks: [
      { text: "Set a small budget ceiling", done: false },
      { text: "Pick one gift category (book, treat, experience)", done: false },
      { text: "Choose one item and buy or bookmark it", done: false },
    ],
  },
  {
    title: "Sunday meal prep mini-edition",
    subtasks: [
      { text: "Pick one protein and one veggie for the week", done: false },
      { text: "Cook or prep just enough for 2 meals", done: false },
      { text: "Label containers so future-you knows what is inside", done: false },
    ],
  },
  {
    title: "Declutter one drawer",
    subtasks: [
      { text: "Empty the drawer onto a flat surface", done: false },
      { text: "Trash obvious junk and group similar items", done: false },
      { text: "Put back only what you actually use", done: false },
    ],
  },
  {
    title: "Plan weekend trip basics",
    subtasks: [
      { text: "Pick dates and destination in one sentence", done: false },
      { text: "Check transport options and rough cost", done: false },
      { text: "Book or hold one thing (train, stay, or ticket)", done: false },
    ],
  },
];

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickExampleMissions(existingTitles, count = 3) {
  const existing = new Set(existingTitles.map((t) => t.toLowerCase().trim()));
  const available = EXAMPLE_MISSION_POOL.filter(
    (mission) => !existing.has(mission.title.toLowerCase())
  );

  const pool = available.length >= count ? available : EXAMPLE_MISSION_POOL;
  return shuffle(pool).slice(0, count).map((mission) => ({
    title: mission.title,
    subtasks: mission.subtasks.map((step) => ({ ...step })),
  }));
}
