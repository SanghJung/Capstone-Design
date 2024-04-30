package com.capstone.picknic.controller;

import com.capstone.picknic.dto.RequestSendToFlaskDto;
import com.capstone.picknic.service.FlaskService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FlaskController {

    private final FlaskService flaskService;

    /**
     * Flask로 데이터 전송
     */
    @PostMapping("/flask")
    public String sendToFlask(@RequestBody RequestSendToFlaskDto dto) throws JsonProcessingException {
        return flaskService.sendToFlask(dto);
    }
}