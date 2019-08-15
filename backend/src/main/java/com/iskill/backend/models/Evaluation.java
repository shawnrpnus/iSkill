package com.iskill.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
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
    @JsonIgnore
    private Employee creator;

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
//    @JsonIgnore
    private Employee evaluator;

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private Employee evaluatee;

    @ManyToOne
    @JoinColumn(nullable = false)
//    @JsonIgnore
    private SurveyForm surveyForm;

    @OneToMany
    private List<Answer> answers = new ArrayList<>();

    private Integer maxScore = 0;

    private Integer totalScore = 0;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z", locale = "en_SG", timezone = "GMT+8")
    @Column(updatable = false)
    private Date created_At;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z", locale = "en_SG", timezone = "GMT+8")
    private Date updated_At;

    public Evaluation(String remarks, EvaluationStatusEnum status) {
        this.remarks = remarks;
        this.status = status;
    }

    @PrePersist
    protected void onCreate() {
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Evaluation)) return false;
        Evaluation that = (Evaluation) o;
        return this.evaluationId != null && that.evaluationId != null && evaluationId.equals(that.evaluationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(evaluationId);
    }
}
