package com.capstone.picknic.controller;

import com.capstone.picknic.domain.place.Place;
import com.capstone.picknic.dto.place.response.PlaceDetailsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import com.capstone.picknic.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class FlaskController {
    public static void main(String[] args){
        SpringApplication.run(FlaskController.class, args);
    }

}

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
class GptController {

    private final PlaceService placeService;

    @PostMapping("/unchosen") // 엔드포인트 변경
    public String unChosenPlace() { // @RequestBody 제거

        // Flask 서버 URL 설정
        String flaskServerUrl = "http://localhost:5000/recommend"; // 엔드포인트 변경

        // RestTemplate을 사용하여 Flask 서버에 POST 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.postForObject(flaskServerUrl, null, String.class);

        return response;

    }

    @PostMapping("/chosen/{id}")
    public ResponseEntity<?> chosenPlace(@PathVariable Long id) {

        String ChosenFlaskServerUrl = "http://localhost:5000/recommend_v2";

        PlaceDetailsDto placeDetailsDto = placeService.getPlaceDetailsById(id);
        if (placeDetailsDto == null) {
            return ResponseEntity.badRequest().body("존재하지 않는 장소입니다.");
        }

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> requestPayload = new HashMap<>();
        requestPayload.put("id", placeDetailsDto.getId());
        requestPayload.put("place_type", placeDetailsDto.getPlace_type());

        String choResponse = restTemplate.postForObject(ChosenFlaskServerUrl, requestPayload, String.class);

        return ResponseEntity.ok(choResponse);
    }


}