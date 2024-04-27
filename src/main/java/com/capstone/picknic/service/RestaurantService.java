package com.capstone.picknic.service;

import com.capstone.picknic.domain.place.Place;
import com.capstone.picknic.domain.place.Restaurant;
import com.capstone.picknic.dto.PlaceDto;
import com.capstone.picknic.repository.PlaceRepository;
import com.capstone.picknic.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final PlaceRepository placeRepository;
    public void save(PlaceDto placeDto) {
        if(checkDuplicatesByName(placeDto.getPlaceName())) return;
        Restaurant restaurant = Restaurant.createRestaurant(placeDto);
        restaurantRepository.save(restaurant);
    }
    public void save(List<PlaceDto> placeDtoList) {
        for(PlaceDto placeDto : placeDtoList) {
            save(placeDto);
        }
    }
    public Boolean checkDuplicatesByName(String name) {
        return placeRepository.existsByName(name);
    }
}
