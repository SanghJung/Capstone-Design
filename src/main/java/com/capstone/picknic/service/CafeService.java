package com.capstone.picknic.service;

import com.capstone.picknic.domain.place.Cafe;
import com.capstone.picknic.dto.PlaceDto;
import com.capstone.picknic.repository.CafeRepository;
import com.capstone.picknic.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CafeService {
    private final CafeRepository cafeRepository;
    private final PlaceRepository placeRepository;

    public void save(PlaceDto placeDto) {
        if(checkDuplicatesByName(placeDto.getPlaceName()))return;
        Cafe cafe = Cafe.createCafe(placeDto);
        cafeRepository.save(cafe);
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
