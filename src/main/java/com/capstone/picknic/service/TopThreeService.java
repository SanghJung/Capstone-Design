/*
package com.capstone.picknic.service;

import com.capstone.picknic.domain.place.Cafe;
import com.capstone.picknic.dto.PlaceDto;
import com.capstone.picknic.repository.CafeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class TopThreeService {

    private CafeRepository cafeRepository;

    @Autowired
    public TopThreeService(CafeRepository cafeRepository) {
        this.cafeRepository = cafeRepository;
    }

    public List<PlaceDto> getNearbyCafes(double latitude, double longitude, double distance) {
        List<Cafe> allCafes = cafeRepository.findAll(); // 모든 카페 데이터 조회

        return allCafes.stream()
                .filter(cafe -> calculateDistance(latitude, longitude, cafe.getCoord().getX(), cafe.getCoord().getY()) <= distance)
                .sorted(Comparator.comparingDouble(cafe -> calculateDistance(latitude, longitude, cafe.getCoord().getX(), cafe.getCoord().getY())))
                .map(PlaceDto::fromEntity)  // Cafe -> PlaceDto 변환
                .collect(Collectors.toList());
    }

    // 두 좌표 간의 거리 계산 (Haversine 공식 활용)
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        // ... (Haversine 공식 구현)
    }
}
*/