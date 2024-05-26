package com.capstone.picknic.controller;

import com.capstone.picknic.domain.Detail;
import com.capstone.picknic.domain.Menu;
import com.capstone.picknic.domain.RatingReview;
import com.capstone.picknic.domain.place.Place;
import com.capstone.picknic.dto.CrawlingDto;
import com.capstone.picknic.dto.MenuDto;
import com.capstone.picknic.dto.place.request.PlaceNameRequestDto;
import com.capstone.picknic.dto.place.response.PlaceNameUrlDto;
import com.capstone.picknic.repository.MenuRepository;
import com.capstone.picknic.service.MenuService;
import com.capstone.picknic.service.PlaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class PlaceController {

    private final PlaceService placeService;

    @PostMapping("/v1/places")
    public ResponseEntity<List<Place>> getAllPlace() {
        List<Place> places = placeService.findAll();
        return ResponseEntity.ok(places);
    }
    @PostMapping("/v1/places/names-urls")
    public ResponseEntity<List<PlaceNameUrlDto>> getAllPlaceNamesAndUrls() {
        List<PlaceNameUrlDto> PlaceNameUrlDtos = placeService.allNameWithUrl();
        return ResponseEntity.ok(PlaceNameUrlDtos);
    }
    @PostMapping("/v1/places/crawling")
    public ResponseEntity<CrawlingDto> saveCrawlingData(@RequestBody CrawlingDto crawlingDto) {
        Place place = placeService.Update(crawlingDto);
        return ResponseEntity.ok(crawlingDto);
    }

 }
