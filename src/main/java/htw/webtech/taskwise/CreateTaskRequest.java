package htw.webtech.taskwise;

import java.util.List;

public class CreateTaskRequest {

    private String title;
    private String description;
    private List<CreateSubtaskRequest> subtasks;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<CreateSubtaskRequest> getSubtasks() {
        return subtasks;
    }

    public void setSubtasks(List<CreateSubtaskRequest> subtasks) {
        this.subtasks = subtasks;
    }
}
