package htw.webtech.taskwise;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TaskDataLoader implements CommandLineRunner {

    private final TaskRepository taskRepository;

    public TaskDataLoader(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String... args) {
        if (taskRepository.count() > 0) {
            return;
        }

        Task cleanRoom = new Task("Clean room", "Break task into steps", false);
        cleanRoom.addSubtask(new Subtask("Pick up clothes", false));
        cleanRoom.addSubtask(new Subtask("Clean desk", false));
        cleanRoom.addSubtask(new Subtask("Vacuum", false));
        taskRepository.save(cleanRoom);

        Task study = new Task("Study for exam", "Start small chunks", false);
        study.addSubtask(new Subtask("Read 2 pages", true));
        study.addSubtask(new Subtask("Make summary", false));
        taskRepository.save(study);
    }
}
