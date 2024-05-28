package com.capstone.picknic.controller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
@SpringBootApplication
public class FlaskController {

    public static void main(String[] args){
        SpringApplication.run(FlaskController.class, args);
    }
}


@RestController
class GptController{
    private final RestTemplate restTemplate = new RestTemplate();
    private final String flaskServerUrl = "http://127.0.0.1:5000/get-course";

    @GetMapping("/api/unchosen")
    public String fetchCourse(@RequestParam(value = "question", defaultValue = "추천 기준은 평점, 방문자 리뷰수, 블로그 리뷰수를 참고해서 너가 알아서 추천해줘. 첫번째로 activities 중에서 장소 1개를 추천해줘. 두번째로 앞에서 추천한 장소 반경 2km 이내에 있는 restaurant, cafe 중에서 restaurant 2개, Cafe 1개를 추천해줘. 마지막으로 추천한 4개의 장소를 restaurant, cafe, activity, restaurant 순으로 출력해줘.") String question){
        ResponseEntity<String> response = restTemplate.getForEntity(flaskServerUrl + "?question=" + question, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            return "Failed to get date course. HTTP Status Code: " + response.getStatusCode();
        }
    }

    /*
    @GetMapping("/api/chosen")
    public String ChosenCourse(@RequestParam(value ="question", defaultValue = "")String question){
        ResponseEntity<String> response = restTemplate.getForEntity(flaskServerUrl + "?question=" + question, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            return "Failed to get date course. HTTP Status Code: " + response.getStatusCode();
        }
    }*/

}