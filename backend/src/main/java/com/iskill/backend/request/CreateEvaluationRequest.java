package com.iskill.backend.request;


import com.iskill.backend.models.Evaluation;
import com.iskill.backend.models.Question;
import com.iskill.backend.models.SurveyForm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateEvaluationRequest {

    @Valid
    private Evaluation evaluation;

    @NotNull(message = "You are not logged in!")
    private Long creatorEmployeeId;

    @NotNull(message = "You are not logged in!")
    private Long evaluatorEmployeeId;

    @NotNull(message = "Employee is required")
    private Long evaluateeEmployeeId;

    @NotNull(message = "Survey Form is required")
    private Long surveyFormId;
}
