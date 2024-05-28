package com.capstone.picknic.service;

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
import java.util.stream.Collectors;

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

    public List<PlaceInfoDto> findPlaceInfo(Long id) {
        return placeRepository.findById(id).stream().map(place -> PlaceInfoDto.builder()
                .phoneNumber(place.getPhoneNumber())
                .url(place.getUrl())
                .menus(place.getMenus())
                .detail(place.getDetail())
                .build())
                .collect(Collectors.toList());
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


}
