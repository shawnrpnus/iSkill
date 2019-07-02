package com.iskill.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evaluationId;

    private String remarks;

    @NotNull(message = "Evaluation Status is Required")
    private EvaluationStatusEnum status;

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private Employee evaluator;

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private Employee evaluatee;

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private SurveyForm surveyForm;

    @OneToMany
    private List<Answer> answers = new ArrayList<>();

    public Evaluation(String remarks, EvaluationStatusEnum status) {
        this.remarks = remarks;
        this.status = status;
    }
}
