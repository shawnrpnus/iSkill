package com.iskill.backend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class OpenEndedQuestion extends Question {

    @NotBlank(message = "An answer is required")
    @Size(max = 128, message = "Maximum answer length is 128 characters")
    private String answer;

    public OpenEndedQuestion(String questionText) {
        this.questionText = questionText;
    }
}
