package com.iskill.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SurveyForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long surveyFormId;

    @NotBlank(message = "Form name is required")
    @Column(unique = true)
    private String surveyFormName;

    private BigDecimal totalScore;

    private BigDecimal actualScore;

    @NotBlank(message = "Skill level is required")
    private String skillLevel;

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private Employee creator;

    @OneToMany(mappedBy = "surveyForm", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @Valid
    @Size(min = 1, message = "Form must have at least one category")
    private List<Category> categories = new ArrayList<>();

    @ManyToOne
    @Valid
    @NotNull(message = "Tool/Process is required")
    @JoinColumn(nullable = false)
    private ToolProcess toolProcess;

    @OneToMany(mappedBy = "surveyForm")
    private List<Evaluation> evaluations = new ArrayList<>();

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z", locale = "en_SG", timezone = "GMT+8")
    @Column(updatable = false)
    private Date created_At;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z", locale = "en_SG", timezone = "GMT+8")
    private Date updated_At;

    public SurveyForm(@NotBlank(message = "Form name is required") String surveyFormName,
                      @NotBlank(message = "Skill level is required") String skillLevel) {
        this.surveyFormName = surveyFormName;
        this.skillLevel = skillLevel;

    }

    @PrePersist
    protected void onCreate(){

        this.created_At = new Date();

    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SurveyForm)) return false;
        SurveyForm that = (SurveyForm) o;
        return this.surveyFormId != null && that.surveyFormId != null && surveyFormId.equals(that.surveyFormId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(surveyFormId);
    }
}
