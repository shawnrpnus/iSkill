package com.iskill.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @EqualsAndHashCode
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;

    private String name;

    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private List<Employee> employees = new ArrayList<>();

    public Role(String name){
        this.name = name;
    }
}
