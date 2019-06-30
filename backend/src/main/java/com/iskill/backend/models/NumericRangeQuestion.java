package com.iskill.backend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class NumericRangeQuestion extends Question {

    @NotBlank(message = "Lower bound is required")
    @Column(nullable = false)
    private Integer lowerBound;

    @NotBlank(message = "Upper bound is required")
    @Column(nullable = false)
    private Integer upperBound;

    @NotBlank(message = "Answer is required")
    @Column(nullable = false)
    private Integer answer;

    public NumericRangeQuestion(String questionText, Integer lowerBound, Integer upperBound) {
        this.questionText = questionText;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }
}
