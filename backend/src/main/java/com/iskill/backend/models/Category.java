package com.iskill.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @NotBlank(message = "Category is required")
    private String categoryName;

    @OneToMany(mappedBy="category")
    private List<Question> questions;

    public Category(String categoryName){
        this.categoryName = categoryName;
    }
}
