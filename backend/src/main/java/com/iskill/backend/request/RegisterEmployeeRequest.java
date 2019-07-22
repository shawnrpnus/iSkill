package com.iskill.backend.request;

import com.iskill.backend.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterEmployeeRequest {

    private String name;
    private String username;
    private String password;
    private String costCenter;
    private String shift;

    @Valid
    private Role role;
}
