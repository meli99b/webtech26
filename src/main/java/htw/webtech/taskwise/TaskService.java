package htw.webtech.taskwise;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAll() {
        List<Task> tasks = new ArrayList<>();
        taskRepository.findAll().forEach(tasks::add);
        return tasks;
    }

    @Transactional
    public Task create(CreateTaskRequest request) {
        Task task = new Task(
                request.getTitle(),
                request.getDescription() != null ? request.getDescription() : "",
                false
        );

        if (request.getSubtasks() != null) {
            for (CreateSubtaskRequest subtaskRequest : request.getSubtasks()) {
                task.addSubtask(new Subtask(subtaskRequest.getTitle(), false));
            }
        }

        return taskRepository.save(task);
    }
}
