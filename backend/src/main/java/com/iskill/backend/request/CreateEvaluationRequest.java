package com.iskill.backend.request;


import com.iskill.backend.models.Evaluation;
import com.iskill.backend.models.Question;
import com.iskill.backend.models.SurveyForm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateEvaluationRequest {

    @Valid
    private Evaluation evaluation;

    private Long evaluatorEmployeeId;

    private Long evaluateeEmployeeId;

    private Long surveyFormId;
}
