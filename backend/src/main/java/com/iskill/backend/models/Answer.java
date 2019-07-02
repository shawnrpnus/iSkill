package com.iskill.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    private Integer numericAnswer;

    private String textAnswer;

    private Boolean yesNoAnswer;

    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private Question question;

    public Answer(Integer numericAnswer) {
        this.numericAnswer = numericAnswer;
    }
}
