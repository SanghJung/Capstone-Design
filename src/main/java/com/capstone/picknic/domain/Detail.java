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

    @Column(length = 500)
    private String introduction;

    @Column(length = 500)
    private String service;

    @Column(name = "place_time", length = 500)
    private String placeTime;

    @Column(name = "parking_yn")
    private String parkingYN;

    @Builder
    public Detail(String introduction, String service, String parkingYN, String placeTime){
        this.introduction = introduction;
        this.service = service;
        this.parkingYN = parkingYN;
        this.placeTime = placeTime;
    }
}
