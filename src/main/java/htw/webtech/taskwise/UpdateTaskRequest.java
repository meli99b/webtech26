package htw.webtech.taskwise;

import java.util.List;

public class UpdateTaskRequest {

    private boolean completed;
    private List<UpdateSubtaskRequest> subtasks;

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
}
