package com.my.exhibitions.controllers;

import com.my.exhibitions.entities.User;
import com.my.exhibitions.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
public class UserController {

    private final static Logger LOGGER = Logger.getLogger(UserController.class);

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public void getLogin() {
        LOGGER.info("Get -> /login");
    }

    @PostMapping("/login")
    public void logUserIn() {
        LOGGER.info("Post -> /login");
    }

    @PostMapping("/registration")
    public void registerNewUser(@Valid @RequestBody User user) {
        LOGGER.info("Post -> /registration");
        boolean alreadyExists = userService.existsByUsername(user.getUsername());
        if(!alreadyExists) {
            userService.save(user);
        }
    }
}