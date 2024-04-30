package com.capstone.picknic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class PicknicApplication {

	public static void main(String[] args) {
		SpringApplication.run(PicknicApplication.class, args);
	}

	@GetMapping("/consume")
	public String consumeApi() {
		RestTemplate restTemplate = new RestTemplate();
		String apiUrl = "http://localhost:5000/scrape/" + "바비레드 강남구";  // Change this URL to match your Flask API endpoint
		String result = restTemplate.getForObject(apiUrl, String.class);
		return "Data from Python API: " + result;
	}
}
