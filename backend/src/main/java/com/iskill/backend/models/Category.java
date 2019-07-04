package com.iskill.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

    @NotNull
    private Integer categorySequence;

    @NotBlank(message = "Category name is required")
    private String categoryName;

    @ManyToOne(optional = false)
    @JoinColumn(updatable = false, nullable = false)
    @JsonIgnore
    private SurveyForm surveyForm;

    @OneToMany(mappedBy="category", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @Valid
    private List<Question> questions = new ArrayList<>();

    public Category(String categoryName, Integer categorySequence){
        this.categoryName = categoryName;
        this.categorySequence = categorySequence;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return this.categoryId != null && category.categoryId != null && categoryId.equals(category.categoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, categoryName);
    }
}
