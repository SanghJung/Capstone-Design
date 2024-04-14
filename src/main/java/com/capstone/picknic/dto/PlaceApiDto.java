package com.capstone.picknic.dto;

import com.capstone.picknic.domain.place.Coordinate;
import com.capstone.picknic.domain.place.Place;
import com.capstone.picknic.domain.place.Restaurant;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PlaceApiDto {

    private long id;
    private String addressName; //도로명
    private String categoryName; //음식점 > 한식 > 해물,생선
    private String phone;
    private String placeName;
    private String placeUrl;
    private String x;
    private String y;

    public Place toEntity() {
        Place place = Place.builder()
                .coord(new Coordinate(Double.parseDouble(x), Double.parseDouble(y)))
                .name(placeName)
                .url(placeUrl)
                .address(addressName)
                .categoryName(categoryName)
                .phoneNumber(phone)
                .build();
        return place;
    }
}
