package com.capstone.picknic.service;

import com.capstone.picknic.domain.place.Activity;
import com.capstone.picknic.domain.place.Cafe;
import com.capstone.picknic.dto.PlaceDto;
import com.capstone.picknic.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;
    public void save(PlaceDto placeDto) {
        Activity activity = Activity.createActivity(placeDto);
        activityRepository.save(activity);
    }

    public void save(List<PlaceDto> placeDtoList) {
        for(PlaceDto placeDto : placeDtoList) {
            save(placeDto);
        }
    }
}
