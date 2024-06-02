package com.capstone.picknic.service;


import com.capstone.picknic.domain.place.Place;
import com.capstone.picknic.domain.Detail;
import com.capstone.picknic.domain.Menu;
import com.capstone.picknic.domain.RatingReview;
import com.capstone.picknic.domain.place.Place;
import com.capstone.picknic.dto.CrawlingDto;
import com.capstone.picknic.dto.MenuDto;
import com.capstone.picknic.dto.place.request.PlaceNameRequestDto;
import com.capstone.picknic.dto.place.response.PlaceDetailsDto;
import com.capstone.picknic.dto.place.response.PlaceInfoDto;
import com.capstone.picknic.dto.place.response.PlaceNameUrlDto;
import com.capstone.picknic.repository.MenuRepository;

import com.capstone.picknic.repository.PlaceRepository;
import jakarta.persistence.DiscriminatorValue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final MenuRepository menuRepository;

    public List<Place> findAll() {
        return placeRepository.findAll();
    }

    public List<String> allPlaceName() {
        return placeRepository.findAll().stream().map(Place::getName).collect(Collectors.toList());
    }

    public Place findOneByName(PlaceNameRequestDto placeNameRequestDto) {
        return placeRepository.findOneByName(placeNameRequestDto.getName());
    }

    public List<PlaceNameUrlDto> allNameWithUrl() {
        return placeRepository.findAll().stream().map(place -> new PlaceNameUrlDto(place.getName(), place.getUrl()))
                .collect(Collectors.toList());
    }


    //
    public List<PlaceDetailsDto> allPlaceDetails() {
        return placeRepository.findAll().stream().map(place -> PlaceDetailsDto.builder()
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

    public Optional<PlaceInfoDto> findPlaceInfo(Long id) {
        return placeRepository.findById(id).map(place -> PlaceInfoDto.builder()
                .phoneNumber(place.getPhoneNumber())
                .url(place.getUrl())
                .menus(place.getMenus().stream().map(menu -> MenuDto.builder()
                        .thumb(menu.getImgUrl())
                        .price(menu.getPrice())
                        .name(menu.getName())
                        .build()).collect(Collectors.toList()))
                .detail(place.getDetail())
                .build());
    }

    @Transactional
    public Place Update(CrawlingDto crawlingDto) {

        Place place = placeRepository.findOneByName(crawlingDto.getName());

        place.setThumbnailUrl(crawlingDto.getPlaceThumb());

        place.setDetail(Detail.builder()
                .placeHomepageUrl(crawlingDto.getPlaceHomepageUrl())
                .placeFacility(crawlingDto.getPlaceFacility())
                .placeTime(crawlingDto.getPlaceTime())
                .service(crawlingDto.getPlaceService())
                .build());

        for(MenuDto menuDto : crawlingDto.getMenus()) {
            Menu menu = menuDto.toEntity();
            menu.setPlace(place);
            menuRepository.save(menu);
        }

        place.setRatingReview(RatingReview.builder()
                .blogReviews(Integer.parseInt(crawlingDto.getBlogReview()))
                .rating(Float.parseFloat(crawlingDto.getRating()))
                .visitorReviews(Integer.parseInt(crawlingDto.getVisitorReview()))
                .build());

        return place;
    }



    //flask서버 연동 service
    public Place getPlaceById(Long id) {
        Optional<Place> place = placeRepository.findById(id);
        return place.orElse(null);

    }
/*
    public PlaceDetailsDto getPlaceDetailsById(Long id) {
        Optional<Place> placeOptional = placeRepository.findById(id);
        if (placeOptional.isPresent()) {
            Place place = placeOptional.get();
            String placeType = place.getClass().getAnnotation(DiscriminatorValue.class).value();
            return PlaceDetailsDto.builder()
                    .placeType(placeType)
                    .build();
        }
        return null;
    }
*/

    public PlaceDetailsDto getPlaceDetailsById(Long id) {
        return placeRepository.findById(id)
                .map(place -> PlaceDetailsDto.builder()
                        .id(place.getId())
                        .placeType(place.getClass().getAnnotation(DiscriminatorValue.class).value())
                        .build())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 장소입니다."));
        // or
        // .orElse(null); // 또는 기본 PlaceDetailsDto 반환
    }

}