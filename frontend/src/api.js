import { API_BASE } from "./config.js";

export function mapApiTask(apiTask) {
  return {
    id: apiTask.id,
    title: apiTask.title,
    done: apiTask.completed,
    subtasks: (apiTask.subtasks || []).map((step) => ({
      text: step.title,
      done: step.completed,
    })),
  };
}

export async function fetchTasks() {
  const response = await fetch(`${API_BASE}/tasks`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  return data.map(mapApiTask);
}
