package com.capstone.picknic.service;

import com.capstone.picknic.domain.place.Activity;
import com.capstone.picknic.dto.PlaceDto;
import com.capstone.picknic.repository.ActivityRepository;
import com.capstone.picknic.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ActivityService {
    private final ActivityRepository activityRepository;
    private final PlaceRepository placeRepository;

    @Transactional
    public void save(PlaceDto placeDto) {
        if(checkDuplicatesByName(placeDto.getPlaceName()))return;
        Activity activity = Activity.createActivity(placeDto);
        activityRepository.save(activity);
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
}
