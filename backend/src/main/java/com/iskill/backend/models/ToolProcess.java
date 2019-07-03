package com.iskill.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class ToolProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long toolProcessId;

    @NotBlank(message = "Tool/Process Name is required")
    @Column(unique = true)
    protected String toolProcessName;

    @OneToMany(mappedBy = "toolProcess")
    @JsonIgnore
    private List<SurveyForm> surveyForms = new ArrayList<>();

    public ToolProcess(@NotBlank(message = "Tool/Process Name is required") String toolProcessName) {
        this.toolProcessName = toolProcessName;
    }
}
