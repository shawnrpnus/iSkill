package com.iskill.backend.services;

import com.iskill.backend.models.ToolProcess;
import com.iskill.backend.repositories.ToolProcessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToolProcessService {


    private final ToolProcessRepository toolProcessRepository;

    public ToolProcessService(ToolProcessRepository toolProcessRepository) {
        this.toolProcessRepository = toolProcessRepository;
    }

    public List<ToolProcess> getAllToolProcess(){
        return toolProcessRepository.findAll();
    }
}
