package com.iskill.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter @Setter @EqualsAndHashCode
@NoArgsConstructor
public class Employee implements UserDetails {

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
    private String password; //field must be called password by default, otherwise override the getPassword() method

    @Transient
    private String confirmPassword;

    @NotBlank(message = "Cost Center is required")
    private String costCenter;

    private String shift;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "creator")
    @JsonIgnore
    private List<SurveyForm> createdSurveyForms = new ArrayList<>();

    @OneToMany(mappedBy = "evaluator")
    @JsonIgnore
    private List<Evaluation> receivedEvaluations = new ArrayList<>();

    @OneToMany(mappedBy = "evaluatee")
    @JsonIgnore
    private List<Evaluation> givenEvaluations = new ArrayList<>();

    @OneToMany(mappedBy = "creator")
    @JsonIgnore
    private List<Evaluation> createdEvaluations = new ArrayList<>();


    public Employee(@NotBlank(message = "Name is required") String name,
                    @NotBlank(message = "Username is required") @Size(max = 12, min = 4, message = "Please use 4 to 12 characters") String username,
                    @NotBlank(message = "Password is required") String password,
                    @NotBlank(message = "Cost Center is required") String costCenter,
                    String shift,
                    @NotNull Role role) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.costCenter = costCenter;
        this.shift = shift;
        this.role = role;
    }

    /*
    UserDetails interface methods
     */

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
