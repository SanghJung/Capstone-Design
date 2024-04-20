package com.capstone.picknic.service;

import com.capstone.picknic.domain.place.Coordinate;
import com.capstone.picknic.domain.place.Restaurant;
import com.capstone.picknic.dto.PlaceDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class RestaurantServiceTest {

    @Autowired
    PlaceService restaurantService;
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

        Restaurant place = Restaurant.builder()
                .url("1111")
                .coord(new Coordinate(1.1,2.2))
                .name("restaurant")
                .categoryName("음식점")
                .address("1111")
                .phoneNumber("111")
                .build();

        //when
//        restaurantService.save(placeDto);

        //then

    }
}