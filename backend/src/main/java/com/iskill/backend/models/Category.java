package com.iskill.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @NotBlank(message = "Category name is required")
    @Column(unique=true)
    private String categoryName;

    @OneToMany(mappedBy="category")
    @JsonIgnore
    private List<Question> questions = new ArrayList<>();

    public Category(String categoryName){
        this.categoryName = categoryName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return categoryId.equals(category.categoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, categoryName);
    }
}
