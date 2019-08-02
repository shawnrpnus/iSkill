package com.iskill.backend.request;


import com.iskill.backend.models.Evaluation;
import com.iskill.backend.models.Question;
import com.iskill.backend.models.SurveyForm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssignEvaluationRequest {

    @NotNull(message = "You are not logged in!")
    private Long creatorEmployeeId;

    @NotNull(message = "You are not logged in!")
    private Long[] evaluatorEmployeeIds;

    @NotNull(message = "Employee is required")
    private Long[] evaluateeEmployeeIds;

    @NotNull(message = "Survey Form is required")
    private Long surveyFormId;
}
