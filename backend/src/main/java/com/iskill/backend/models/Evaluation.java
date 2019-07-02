package com.iskill.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evaluationId;

    private String remarks;

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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers;

    public Evaluation(String remarks, EvaluationStatusEnum status) {
        this.remarks = remarks;
        this.status = status;
    }
}
