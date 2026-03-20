package mil.t2com.moda.todo.task;

import mil.t2com.moda.todo.category.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TaskService taskService;

    @Captor
    ArgumentCaptor<Task> captor = ArgumentCaptor.forClass(Task.class);

    @Captor
    private ArgumentCaptor<List<Task>> captors ;

    String enablement = "enablement";
    Task learnHttpMethods;
    Task learnCaptor;
    Category enableCategory = new Category(enablement);
    Category studyCategory = new Category("study");
    List<Task> tasks = new ArrayList<>();

    @BeforeEach
    void setUp() {
        // Arrange
        learnHttpMethods = new Task(
                "Learn about testing HTTP request/response",
                "Learn how to use WebMvcTest",
                false,
                enableCategory
        );
        learnHttpMethods.setId(1L);
        learnCaptor = new Task(
                "Learn captor",
                "Learn how to use captor",
                false,
                studyCategory
        );

        when(taskService.saveTask(any(Task.class))).thenReturn(learnHttpMethods);

    }

    @Test
    void shouldSaveNewTask() throws Exception {
        // Act + Assert
        mockMvc.perform(post("/api/v1/task")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(learnHttpMethods)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value(matchesPattern("Learn about.*request/response")))
                .andExpect(jsonPath("$.description").value(containsString("Learn how to")))
                .andExpect(jsonPath("$.category.label").value("enablement"))
                .andDo(print());

        verify(taskService, only()).saveTask(any(Task.class));
    }

    @Test
    void shouldSaveNewTaskUsingCaptor() throws Exception {

        // Act + Assert
        mockMvc.perform(post("/api/v1/task")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(learnHttpMethods)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value(matchesPattern("Learn about.*request/response")))
                .andExpect(jsonPath("$.description").value(containsString("Learn how to")))
                .andExpect(jsonPath("$.category.label").value("enablement"))
                .andDo(print());

        verify(taskService, only()).saveTask(captor.capture());
        assertThat(captor.getValue()).usingRecursiveComparison().isEqualTo(learnHttpMethods);
        verify(taskService, only()).saveTask(any(Task.class));
    }

    @Test
    void shouldFindAllTasks() throws Exception {
        tasks.add(learnHttpMethods);
        tasks.add(learnHttpMethods);
        when(taskService.findAllTasks()).thenReturn(tasks);

        // Act + Assert
        mockMvc.perform(get("/api/v1/task"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andDo(print());

        verify(taskService, only()).findAllTasks();
    }


}