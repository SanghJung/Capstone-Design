package com.capstone.picknic.domain.place;

import com.capstone.picknic.dto.PlaceDto;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("Cafe")
@Getter
@Table(name = "cafe")
@SuperBuilder

public class Cafe extends Place {



    public static Cafe createCafe(PlaceDto placeDto) {
        return Cafe.builder()
                .coord(new Coordinate(Double.parseDouble(placeDto.getX()), Double.parseDouble(placeDto.getY())))
                .address(placeDto.getAddressName())
                .name(placeDto.getPlaceName())
                .phoneNumber(placeDto.getPhone())
                .url(placeDto.getPlaceUrl())
                .categoryName(placeDto.getCategoryName())
                .build();
    }
}

