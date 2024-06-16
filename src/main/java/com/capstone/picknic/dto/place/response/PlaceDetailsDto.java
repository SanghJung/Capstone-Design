package com.capstone.picknic.dto.place.response;

import com.capstone.picknic.domain.RatingReview;
import com.capstone.picknic.domain.place.Coordinate;
import lombok.Builder;
import lombok.Getter;


@Getter
public class PlaceDetailsDto {
    private long id;
    private String addressName; //도로명
    private String place_type;
    private String categoryName; //음식점 > 한식 > 해물,생선
    private String placeName;
    private String thumbnailUrl;
    private Coordinate coord;
    private RatingReview ratingReview;


    @Builder
    public PlaceDetailsDto(Long id, String name, String categoryName, String address, Coordinate coord,
                           RatingReview ratingReview, String thumbnailUrl, String placeType) {
        this.id = id;
        this.placeName = name;
        this.addressName = address;
        this.categoryName = categoryName;
        this.coord = coord;
        this.thumbnailUrl = thumbnailUrl;
        this.ratingReview = ratingReview;
        this.place_type = placeType;
    }
}
