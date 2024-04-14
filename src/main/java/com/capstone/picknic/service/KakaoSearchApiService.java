package com.capstone.picknic.service;

import com.capstone.picknic.dto.PlaceApiDto;
import com.capstone.picknic.dto.QueryDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class KakaoSearchApiService {

    @Value("${kakao-key}")
    private String kakaoKey;
    public String searchKakaoApi(QueryDto queryDto) {
        WebClient webClient = WebClient.builder()//v2/local/search/keyword는 get과 post의 동적이게하기위해 나중에
                .baseUrl("https://dapi.kakao.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        Mono<String> response = webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/v2/local/search/keyword")
                        .queryParam("query", queryDto.getQuery())
                        .queryParam("page", queryDto.getPage())
                        .queryParam("size", queryDto.getSize())
                        .queryParam("category_group_code", queryDto.getCategoryCode())
                        .build())
                .header("Authorization", "KakaoAK "+ kakaoKey)
                .retrieve()
                .bodyToMono(String.class);

        return response.block();
    }

}
