package com.iskill.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @NotBlank(message = "Question is required")
    private String question;

    private String stringAnswer;

    private BigDecimal numericAnswer;

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private SurveyForm surveyForm;

    public Question(@NotBlank(message = "Question is required") String question) {
        this.question = question;
    }
}
