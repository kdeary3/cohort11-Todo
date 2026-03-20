package mil.t2com.moda.todo.category;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    CategoryService categoryService;

    Category newCategory;

    // Start using when refactoring
    @BeforeEach
    void setUp() {
        // Arrange
        newCategory = new Category("delayed");
        newCategory.setId(1L);
    }

//    void setUp() {
    ////        MockitoAnnotations.openMocks(this);
//    }

    @Test
    void shouldSaveNewCategory() {
        // Act
        when(categoryRepository.save(newCategory)).thenReturn(newCategory);
        Category result = categoryService.saveCategory(newCategory);

        // Assert
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getLabel()).isEqualTo("delayed");

        verify(categoryRepository, only()).save(newCategory);
    }

    @Test
    void shouldFindTaskByLabel(){
        // Act
        when(categoryRepository.findByLabel(newCategory.getLabel())).thenReturn(java.util.Optional.of(newCategory));
        Optional<Category> result = categoryService.findCategoryByLabel(newCategory.getLabel());

        // Assert
        assertThat(result.get().getLabel()).isEqualTo("delayed");
        verify(categoryRepository, only()).findByLabel(newCategory.getLabel());

    }

    @Test
    void shouldCheckIfExistingCategoryAndSaveIfNotExists() {
        // Act
        when(categoryRepository.findByLabel(newCategory.getLabel())).thenReturn(Optional.empty());
        when(categoryRepository.save(any(Category.class))).thenReturn(newCategory);

        Category result = categoryService.createCategoryIfNotExists("delayed");
        // Assert
        assertThat(result.getLabel()).isEqualTo("delayed");

        verify(categoryRepository, times(1)).save(any(Category.class));
        verify(categoryRepository, times(1)).findByLabel("delayed");
    }


}