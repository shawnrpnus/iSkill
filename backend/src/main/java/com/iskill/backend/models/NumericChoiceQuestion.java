package com.iskill.backend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class NumericChoiceQuestion extends Question {

    @NotNull(message = "Lower bound is required")
    @Column(nullable = false)
    private Integer lowerBound;

    @NotNull(message = "Upper bound is required")
    @Column(nullable = false)
    private Integer upperBound;

    public NumericChoiceQuestion(String questionText, Integer lowerBound, Integer upperBound) {
        super();
        this.questionText = questionText;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }
}
