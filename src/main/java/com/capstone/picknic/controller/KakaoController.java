package com.capstone.picknic.controller;

import com.capstone.picknic.dto.PlaceApiDto;
import com.capstone.picknic.dto.QueryDto;
import com.capstone.picknic.service.KakaoSearchApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kakao/")
@RequiredArgsConstructor
public class KakaoController {

    private final KakaoSearchApiService kaoSearchApiService;
    @GetMapping("/test")
    public String test(@ModelAttribute QueryDto queryDto) {
        return kaoSearchApiService.searchKakaoApi(queryDto);
    }
}
