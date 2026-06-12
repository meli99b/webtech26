package htw.webtech.taskwise;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {

    @Query("SELECT DISTINCT t FROM Task t LEFT JOIN FETCH t.subtasks")
    List<Task> findAllWithSubtasks();
}
