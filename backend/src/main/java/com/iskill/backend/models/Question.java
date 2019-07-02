package com.iskill.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long questionId;

    @NotBlank(message = "Question sequence / number is required")
    protected Integer questionSequence;

    @NotBlank(message = "Question is required")
    protected String questionText;

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    protected SurveyForm surveyForm;

    @OneToMany(mappedBy = "question")
    private List<Answer> answers;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Category category;

    public Question(@NotBlank(message = "Question sequence / number is required") Integer questionSequence, @NotBlank(message = "Question is required") String questionText) {
        this.questionSequence = questionSequence;
        this.questionText = questionText;
    }
}
