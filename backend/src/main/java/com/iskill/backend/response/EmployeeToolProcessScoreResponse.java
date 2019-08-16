package com.iskill.backend.response;


import com.iskill.backend.models.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeToolProcessScoreResponse {

    private Employee employee;
    private Map<String, Scores> toolProcessScores;
    private long key;
}
