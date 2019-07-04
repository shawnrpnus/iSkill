package com.iskill.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long questionId;

    @NotNull(message = "Question sequence / number is required")
    protected Integer questionSequence;

    @NotBlank(message = "Question is required")
    protected String questionText;

    @OneToMany(mappedBy = "question")
    protected List<Answer> answers = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    @JsonIgnore
    protected Category category;

    public Question(@NotBlank(message = "Question sequence / number is required") Integer questionSequence, @NotBlank(message = "Question is required") String questionText) {
        this.questionSequence = questionSequence;
        this.questionText = questionText;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Question)) return false;
        Question question = (Question) o;
        return questionId.equals(question.questionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(questionId, questionText);
    }
}
