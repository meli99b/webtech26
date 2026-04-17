package htw.webtech.taskwise;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskController {

    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return List.of(
                new Task(
                        1L,
                        "Clean room",
                        "Break task into steps",
                        false,
                        List.of(
                                new Subtask(1L, "Pick up clothes", false),
                                new Subtask(2L, "Clean desk", false),
                                new Subtask(3L, "Vacuum", false)
                        )
                ),
                new Task(
                        2L,
                        "Study for exam",
                        "Start small chunks",
                        false,
                        List.of(
                                new Subtask(4L, "Read 2 pages", true),
                                new Subtask(5L, "Make summary", false)
                        )
                )
        );
    }
}