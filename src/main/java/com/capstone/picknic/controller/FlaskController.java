package com.capstone.picknic.controller;

import com.capstone.picknic.domain.place.Place;
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

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class FlaskController {

    public static void main(String[] args){
        SpringApplication.run(FlaskController.class, args);
    }
}


@RestController
class GptController{
    @Autowired
    private PlaceService placeService;
    private final RestTemplate restTemplate = new RestTemplate();
    private final String flaskServerUrl = "http://127.0.0.1:5000/get-course";
    private final String flaskServerUrlWithPlace = "http://127.0.0.1:5000/get-course-with-place";
    @GetMapping("/api/unchosen")
    public String fetchCourse(@RequestParam(value = "question", defaultValue = "추천 기준은 평점, 방문자 리뷰수, 블로그 리뷰수를 참고해서 너가 알아서 추천해줘. 첫번째로 activities 중에서 장소 1개를 추천해줘. 두번째로 앞에서 추천한 장소 반경 2km 이내에 있는 restaurant, cafe 중에서 restaurant 2개, Cafe 1개를 추천해줘. 마지막으로 추천한 4개의 장소를 restaurant, cafe, activity, restaurant 순으로 출력해줘.") String question){
        ResponseEntity<String> response = restTemplate.getForEntity(flaskServerUrl + "?question=" + question, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            return "Failed to get date course. HTTP Status Code: " + response.getStatusCode();
        }
    }

    @PostMapping("/api/chosen")
    public String fetchCourseWithPlace(@RequestParam Long id) {
        Place place = placeService.getPlaceById(id);

        if (place == null) {
            return "Place not found";
        }

        Map<String, String> payload = new HashMap<>();
        payload.put("id", place.getId().toString());
        //payload.put("place_type", place.());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(flaskServerUrlWithPlace, request, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            return "Failed to get course. HTTP Status Code: " + response.getStatusCode();
        }
    }

}