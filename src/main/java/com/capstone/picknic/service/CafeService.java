package com.capstone.picknic.service;

import com.capstone.picknic.domain.place.Cafe;
import com.capstone.picknic.dto.PlaceDto;
import com.capstone.picknic.dto.place.response.PlaceDetailsDto;
import com.capstone.picknic.repository.CafeRepository;
import com.capstone.picknic.repository.PlaceRepository;
import jakarta.persistence.DiscriminatorValue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CafeService {
    private final CafeRepository cafeRepository;
    private final PlaceRepository placeRepository;

    @Transactional
    public void save(PlaceDto placeDto) {
        if(checkDuplicatesByName(placeDto.getPlaceName()))return;
        Cafe cafe = Cafe.createCafe(placeDto);
        cafeRepository.save(cafe);
    }

    @Transactional
    public void save(List<PlaceDto> placeDtoList) {
        for(PlaceDto placeDto : placeDtoList) {
            save(placeDto);
        }
    }

    public Boolean checkDuplicatesByName(String name) {
        return placeRepository.existsByName(name);
    }

    public List<PlaceDetailsDto> allPlaceDetails() {
        return cafeRepository.findAll().stream().map(place -> PlaceDetailsDto.builder()
                        .ratingReview(place.getRatingReview())
                        .id(place.getId())
                        .categoryName(place.getCategoryName())
                        .coord(place.getCoord())
                        .address(place.getAddress())
                        .thumbnailUrl(place.getThumbnailUrl())
                        .name(place.getName())
                        .placeType(place.getClass().getAnnotation(DiscriminatorValue.class).value())
                        .build())
                .collect(Collectors.toList());
    }
}
