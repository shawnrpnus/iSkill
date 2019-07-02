package com.iskill.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class ToolProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long toolProcessId;

    @NotBlank(message = "Tool/Process Name is required")
    protected String toolProcessName;

    @OneToMany(mappedBy = "toolProcess")
    private List<SurveyForm> surveyForms = new ArrayList<>();

    public ToolProcess(@NotBlank(message = "Tool/Process Name is required") String toolProcessName) {
        this.toolProcessName = toolProcessName;
    }
}
