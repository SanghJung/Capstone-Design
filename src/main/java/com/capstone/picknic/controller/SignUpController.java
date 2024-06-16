package com.capstone.picknic.controller;


import com.capstone.picknic.dto.UserDto;
import com.capstone.picknic.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SignUpController {

    private final UserService userService;

    @PostMapping("/signUp")
    public ResponseEntity<?> signUp(@RequestBody UserDto userDto) {
        Long id = userService.save(userDto);
        return ResponseEntity.ok("save");
    }

    @PostMapping("/jwtTest")
    public ResponseEntity<?> test() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(name);
    }

}
