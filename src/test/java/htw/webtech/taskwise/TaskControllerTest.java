package htw.webtech.taskwise;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
// Backend use-case tests (UC 1-5)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void createTask() throws Exception {
        // Use case 1: create a new task
        mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Einkaufen\",\"subtasks\":[]}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Einkaufen"));
    }

    @Test
    void toggleSubtask() throws Exception {
        // Use case 2: check off a subtask
        mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":"Aufgabe mit Steps","subtasks":[
                                  {"title":"Schritt 1"},
                                  {"title":"Schritt 2"}
                                ]}
                                """))
                .andExpect(status().isCreated());

        Task task = findTaskByTitle("Aufgabe mit Steps");
        long subtaskId = task.getSubtasks().get(0).getId();

        mockMvc.perform(put("/tasks/" + task.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"completed":false,"subtasks":[
                                  {"id":%d,"completed":true}
                                ]}
                                """.formatted(subtaskId)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.subtasks[0].completed").value(true));
    }

    @Test
    void markTaskDone() throws Exception {
        // Use case 3: mark task as done (tiny win)
        mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Tiny win test\",\"subtasks\":[]}"))
                .andExpect(status().isCreated());

        Task task = findTaskByTitle("Tiny win test");

        mockMvc.perform(put("/tasks/" + task.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"completed\":true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(true));
    }

    @Test
    void deleteTask() throws Exception {
        // Use case 4: delete a task
        mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Zum Loeschen\",\"subtasks\":[]}"))
                .andExpect(status().isCreated());

        Task task = findTaskByTitle("Zum Loeschen");

        mockMvc.perform(delete("/tasks/" + task.getId()))
                .andExpect(status().isNoContent());

        assertTrue(taskRepository.findById(task.getId()).isEmpty());
    }

    @Test
    void editTaskTitle() throws Exception {
        // Use case 5: edit task title and subtasks
        mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Alter Titel\",\"subtasks\":[{\"title\":\"Alt 1\"}]}"))
                .andExpect(status().isCreated());

        Task task = findTaskByTitle("Alter Titel");

        mockMvc.perform(put("/tasks/" + task.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":"Neuer Titel","completed":false,"replaceSubtasks":[
                                  {"title":"Neu 1"},
                                  {"title":"Neu 2"}
                                ]}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Neuer Titel"))
                .andExpect(jsonPath("$.subtasks[0].title").value("Neu 1"));
    }

    private Task findTaskByTitle(String title) {
        return taskRepository.findAllWithSubtasks().stream()
                .filter(item -> title.equals(item.getTitle()))
                .findFirst()
                .orElseThrow();
    }
}
