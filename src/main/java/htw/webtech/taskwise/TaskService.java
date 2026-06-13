package htw.webtech.taskwise;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Transactional(readOnly = true)
    public List<Task> findAll() {
        return taskRepository.findAllWithSubtasks();
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

    @Transactional
    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    @Transactional
    public Task update(Long id, UpdateTaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Task not found"));

        task.setCompleted(request.isCompleted());

        if (request.getSubtasks() != null) {
            for (UpdateSubtaskRequest subtaskRequest : request.getSubtasks()) {
                task.getSubtasks().stream()
                        .filter(subtask -> subtask.getId().equals(subtaskRequest.getId()))
                        .findFirst()
                        .ifPresent(subtask -> subtask.setCompleted(subtaskRequest.isCompleted()));
            }
        }

        return taskRepository.save(task);
    }
}
