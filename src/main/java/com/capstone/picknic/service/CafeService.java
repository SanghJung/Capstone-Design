package com.capstone.picknic.service;

import com.capstone.picknic.domain.place.Cafe;
import com.capstone.picknic.domain.place.Restaurant;
import com.capstone.picknic.dto.PlaceDto;
import com.capstone.picknic.repository.CafeRepository;
import com.capstone.picknic.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CafeService {
    private final CafeRepository cafeRepository;

    public void save(PlaceDto placeDto) {
        Cafe cafe = Cafe.createCafe(placeDto);
        cafeRepository.save(cafe);
    }

    public void save(List<PlaceDto> placeDtoList) {
        for(PlaceDto placeDto : placeDtoList) {
            save(placeDto);
        }
    }
}
