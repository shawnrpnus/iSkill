package com.iskill.backend.request;


import com.iskill.backend.models.Evaluation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateEvaluationRequest {

    @Valid
    private Evaluation evaluation;

    private Long newEvaluatorEmployeeId;

    private Long newEvaluateeEmployeeId;

    private Long newSurveyFormId;
}
