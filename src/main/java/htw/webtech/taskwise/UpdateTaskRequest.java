package htw.webtech.taskwise;

import java.util.List;

public class UpdateTaskRequest {

    private String title;
    private boolean completed;
    private List<UpdateSubtaskRequest> subtasks;
    private List<CreateSubtaskRequest> replaceSubtasks;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public List<UpdateSubtaskRequest> getSubtasks() {
        return subtasks;
    }

    public void setSubtasks(List<UpdateSubtaskRequest> subtasks) {
        this.subtasks = subtasks;
    }

    public List<CreateSubtaskRequest> getReplaceSubtasks() {
        return replaceSubtasks;
    }

    public void setReplaceSubtasks(List<CreateSubtaskRequest> replaceSubtasks) {
        this.replaceSubtasks = replaceSubtasks;
    }
}
