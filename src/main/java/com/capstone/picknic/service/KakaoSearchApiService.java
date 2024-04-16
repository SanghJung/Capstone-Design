package com.capstone.picknic.service;

import com.capstone.picknic.dto.PlaceDto;
import com.capstone.picknic.dto.QueryDto;
import com.capstone.picknic.repository.PlaceRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor

public class KakaoSearchApiService {

    private final RestaurantService restaurantService;
    private final ActivityService activityService;
    private final CafeService cafeService;
    private final ObjectMapper objectMapper;
    private final int MAX_PAGE = 45;

    @Value("${kakao-key}")
    private String kakaoKey;
    public List<PlaceDto> searchKakaoApi(QueryDto queryDto) {
        WebClient webClient = WebClient.builder()//v2/local/search/keyword는 get과 post의 동적이게하기위해 나중에
                .baseUrl("https://dapi.kakao.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        // param 추가하고 String 으로 받아옴
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

        //받아온 데이터 저장
        String jsonRespones = response.block();

        //Json 데이터를 Dto로 변환
        List<PlaceDto> placeDtos = new ArrayList<>();
        try{
            JsonNode rootNode = objectMapper.readTree(jsonRespones);
            JsonNode documentsnode = rootNode.get("documents");

            if(documentsnode != null && documentsnode.isArray()) {
                for(JsonNode documentnode : documentsnode) {
                    PlaceDto placeDto = PlaceDto.builder()
                            .x(documentnode.get("x").asText())
                            .y(documentnode.get("y").asText())
                            .placeUrl(documentnode.get("place_url").asText())
                            .phone(documentnode.get("phone").asText())
                            .placeName(documentnode.get("place_name").asText())
                            .addressName(documentnode.get("address_name").asText())
                            .categoryName(documentnode.get("category_name").asText())
                            .build();
                    placeDtos.add(placeDto);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();;
        }

        return placeDtos;
    }

    public void saveKakaoApi(QueryDto queryDto) {
        for(int i = 1; i <= MAX_PAGE; i++) {
            queryDto.setPage(i);
            List<PlaceDto> placeDtos = searchKakaoApi(queryDto);
            if (Objects.equals(queryDto.getCategoryCode(), "FD6"))
                restaurantService.save(placeDtos);
            else if(Objects.equals(queryDto.getCategoryCode(), "CE7"))
                cafeService.save(placeDtos);
            else if(Objects.equals(queryDto.getCategoryCode(), "CT1") || Objects.equals(queryDto.getCategoryCode(), "AT4"))
                activityService.save(placeDtos);

        }
    }


}
