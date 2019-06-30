package com.iskill.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class SurveyForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long formId;

    @NotBlank(message = "Form name is required")
    private String formName;

    private BigDecimal totalScore;

    private BigDecimal actualScore;

    @NotBlank(message = "Skill level is required")
    private String skillLevel;

    @NotNull(message = "Evaluation type is required")
    private EvaluationTypeEnum evaluationTypeEnum;

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private Employee creator;

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private Employee evaluatedEmployee;

    @OneToMany(mappedBy = "surveyForm")
    private List<Question> questions;

    public SurveyForm(@NotBlank(message = "Form name is required") String formName, @NotBlank(message = "Skill level is required") String skillLevel, @NotNull(message = "Evaluation type is required") EvaluationTypeEnum evaluationTypeEnum) {
        this.formName = formName;
        this.skillLevel = skillLevel;
        this.evaluationTypeEnum = evaluationTypeEnum;
    }
}
