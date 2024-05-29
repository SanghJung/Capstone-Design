package com.capstone.picknic.service;

import com.capstone.picknic.domain.place.Place;
import com.capstone.picknic.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;

    public Place getPlaceById(Long id) {
        Optional<Place> place = placeRepository.findById(id);
        return place.orElse(null);

    }
}