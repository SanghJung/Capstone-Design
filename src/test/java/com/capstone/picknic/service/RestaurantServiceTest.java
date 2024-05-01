package com.capstone.picknic.service;

import com.capstone.picknic.dto.PlaceDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class RestaurantServiceTest {

    @Autowired
    RestaurantService restaurantService;
    @Test
    void 장소저장() {

        //given
        PlaceDto placeDto = PlaceDto.builder()
                .x("11")
                .y("11")
                .addressName("11")
                .phone("11")
                .categoryName("음식점")
                .placeUrl("11")
                .placeName("음식점")
                .build();

        //when
        restaurantService.save(placeDto);

        //then


    }
}