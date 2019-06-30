package com.iskill.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Username is required")
    @Size(max = 12, min = 4, message = "Please use 4 to 12 characters")
    @Column(unique = true, updatable = false)
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    @OneToMany(mappedBy = "employee")
    private List<SurveyForm> surveyForms = new ArrayList<>();

    public Employee(@NotBlank(message = "Name is required") String name,
                    @NotBlank(message = "Username is required") @Size(max = 12, min = 4, message = "Please use 4 to 12 characters") String username,
                    @NotBlank(message = "Password is required") String password) {
        this.name = name;
        this.username = username;
        this.password = password;
    }
}
