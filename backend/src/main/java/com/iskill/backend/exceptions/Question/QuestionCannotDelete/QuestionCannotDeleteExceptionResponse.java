package com.iskill.backend.exceptions.Question.QuestionCannotDelete;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class QuestionCannotDeleteExceptionResponse {

    private String QuestionNotFound;

}
