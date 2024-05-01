package com.capstone.picknic.domain.place;

import com.capstone.picknic.dto.PlaceDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;


@Entity
@Table(name = "restaurant")
@Getter
@DiscriminatorValue("restaurant") // default is class name
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class Restaurant extends Place {

    public static Restaurant createRestaurant(PlaceDto placeDto) {
        return Restaurant.builder()
                .coord(new Coordinate(Double.parseDouble(placeDto.getX()), Double.parseDouble(placeDto.getY())))
                .address(placeDto.getAddressName())
                .name(placeDto.getPlaceName())
                .phoneNumber(placeDto.getPhone())
                .url(placeDto.getPlaceUrl())
                .categoryName(placeDto.getCategoryName())
                .build();
    }
}

