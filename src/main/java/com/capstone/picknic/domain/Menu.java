package com.capstone.picknic.domain;


import com.capstone.picknic.domain.place.Place;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "menu")
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class Menu {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Long id;

    private String name;

    @Column(name = "img_url")
    private String imgUrl;

    @ManyToOne(fetch = FetchType.LAZY)  // fetch = FetchType.LAZY는 지연로딩 전략으로 default 즉시로딩(EAGER)
    @JoinColumn(name = "place_id")
    private Place place;

    @Builder
    public Menu(String name, String imgUrl, Place place) {
        this.imgUrl = imgUrl;
        this.name = name;
        this.place = place;
    }
}
