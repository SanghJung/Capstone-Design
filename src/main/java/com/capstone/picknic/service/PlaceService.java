package com.capstone.picknic.service;

import com.capstone.picknic.domain.place.Place;
import com.capstone.picknic.dto.PlaceApiDto;
import com.capstone.picknic.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;
    public void save(PlaceApiDto placeApiDto) {
        Place place = placeApiDto.toEntity();
        placeRepository.save(place);
    }
}
