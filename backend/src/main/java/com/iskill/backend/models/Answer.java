package com.iskill.backend.models;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
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

    public Answer(String textAnswer){
        this.textAnswer = textAnswer;
    }

    public Answer(Boolean yesNoAnswer){
        this.yesNoAnswer = yesNoAnswer;
    }
}
