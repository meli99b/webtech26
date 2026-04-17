package htw.webtech.taskwise;

import java.util.List;

public class Task {

    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private List<Subtask> subtasks;

    public Task(Long id, String title, String description, boolean completed, List<Subtask> subtasks) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.subtasks = subtasks;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public List<Subtask> getSubtasks() {
        return subtasks;
    }
}