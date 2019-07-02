package com.iskill.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.util.ArrayList;
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

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private Employee creator;

    @OneToMany(mappedBy = "surveyForm")
    private List<Question> questions = new ArrayList<>();

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private ToolProcess toolProcess;

    @OneToMany(mappedBy = "surveyForm")
    private List<Evaluation> evaluations = new ArrayList<>();

    public SurveyForm(@NotBlank(message = "Form name is required") String formName,
                      @NotBlank(message = "Skill level is required") String skillLevel) {
        this.formName = formName;
        this.skillLevel = skillLevel;

    }
}
