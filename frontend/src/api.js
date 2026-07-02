import { API_BASE } from "./config.js";

export function mapApiTask(apiTask) {
  return {
    id: apiTask.id,
    title: apiTask.title,
    done: apiTask.completed,
    subtasks: (apiTask.subtasks || []).map((step) => ({
      id: step.id,
      text: step.title,
      done: step.completed,
    })),
  };
}

function mapTaskToRequest(task) {
  return {
    title: task.title,
    description: "",
    subtasks: (task.subtasks || []).map((step) => ({
      title: step.text,
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

export async function deleteTaskById(id) {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}

export async function updateTask(task, { replaceSubtasks = false } = {}) {
  const body = {
    completed: task.done,
  };

  if (task.title) {
    body.title = task.title;
  }

  if (replaceSubtasks) {
    body.replaceSubtasks = (task.subtasks || []).map((step) => ({
      title: step.text,
    }));
  } else {
    body.subtasks = (task.subtasks || [])
      .filter((step) => step.id != null)
      .map((step) => ({
        id: step.id,
        completed: step.done,
      }));
  }

  const response = await fetch(`${API_BASE}/tasks/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  return mapApiTask(data);
}

export async function createTask(task) {
  const response = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mapTaskToRequest(task)),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  return mapApiTask(data);
}
