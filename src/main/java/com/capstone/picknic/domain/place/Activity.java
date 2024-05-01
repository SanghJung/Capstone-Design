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
@Getter
@Table(name = "activity")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("activity")
@SuperBuilder
public class Activity extends Place {
    public static Activity createActivity(PlaceDto placeDto) {
        return Activity.builder()
                .coord(new Coordinate(Double.parseDouble(placeDto.getX()), Double.parseDouble(placeDto.getY())))
                .address(placeDto.getAddressName())
                .name(placeDto.getPlaceName())
                .phoneNumber(placeDto.getPhone())
                .url(placeDto.getPlaceUrl())
                .categoryName(placeDto.getCategoryName())
                .build();
    }
}
