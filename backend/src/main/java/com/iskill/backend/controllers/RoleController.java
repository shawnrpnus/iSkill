package com.iskill.backend.controllers;

import com.iskill.backend.services.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import static com.iskill.backend.security.SecurityConstants.FRONTEND_DEPLOYMENT_URL;

@RestController
@RequestMapping("/api/role")
@CrossOrigin(origins = {"http://localhost:3000", FRONTEND_DEPLOYMENT_URL})
public class RoleController {
    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRoles(){
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }


}
