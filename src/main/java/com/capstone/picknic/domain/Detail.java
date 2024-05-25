package com.capstone.picknic.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "detail")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Detail {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detail_id")
    private Long id;

    private String service;

    @Column(name = "place_time", length = 500)
    private String placeTime;

    @Column(name = "place_facility")
    private String placeFacility;

    @Column(name = "place_homepage_url", length = 500)
    private String PlaceHomepageUrl;

    @Builder
    public Detail(String placeFacility, String service, String placeHomepageUrl, String placeTime){
        this.service = service;
        this.placeFacility = placeFacility;
        this.placeTime = placeTime;
        this.PlaceHomepageUrl = placeHomepageUrl;
    }
}
