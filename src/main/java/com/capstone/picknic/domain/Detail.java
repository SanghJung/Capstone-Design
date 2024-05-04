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

    private String introduction;

    private String service;

    @Column(name = "parking_yn")
    private boolean parkingYN;

    @Builder
    public Detail(String introduction, String service, boolean parkingYN){
        this.introduction = introduction;
        this.service = service;
        this.parkingYN = parkingYN;
    }
}
