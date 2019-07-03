package com.iskill.backend.request;


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
public class UpdateSurveyFormRequest {

    @Valid
    private SurveyForm surveyForm; //should contain formName, totalScore, actualScore, skillLevel
    //dont update creator, toolprocess and evaluations
    @Valid
    private List<Question> questions;
}
