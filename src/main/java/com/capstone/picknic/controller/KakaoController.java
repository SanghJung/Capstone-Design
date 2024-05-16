package com.capstone.picknic.controller;

import com.capstone.picknic.dto.PlaceDto;
import com.capstone.picknic.dto.QueryDto;
import com.capstone.picknic.service.ActivityService;
import com.capstone.picknic.service.CafeService;
import com.capstone.picknic.service.KakaoSearchApiService;
import com.capstone.picknic.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/kakao/")
@RequiredArgsConstructor
@Slf4j

public class KakaoController {

    private final KakaoSearchApiService kakaoSearchApiService;
    private final int MAX_SIZE = 15;
    @GetMapping("/test")
    public List<PlaceDto> test(@ModelAttribute QueryDto queryDto) {
        log.info(kakaoSearchApiService.searchKakaoApi(queryDto).toString());
        return kakaoSearchApiService.searchKakaoApi(queryDto);
    }
    @GetMapping("/save/place")
    public String placeApiSave(@RequestParam String query, @RequestParam String code) {
        QueryDto queryDto = new QueryDto(query, code, 1, MAX_SIZE);
        kakaoSearchApiService.saveKakaoApi(queryDto);
        return "saved";
    }

}
