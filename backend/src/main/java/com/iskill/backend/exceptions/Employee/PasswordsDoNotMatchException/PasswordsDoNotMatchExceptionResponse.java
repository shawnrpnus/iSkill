package com.iskill.backend.exceptions.Employee.PasswordsDoNotMatchException;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class PasswordsDoNotMatchExceptionResponse {

    private String password;
    private String confirmPassword;

}
