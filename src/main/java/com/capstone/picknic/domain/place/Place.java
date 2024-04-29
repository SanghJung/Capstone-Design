package com.capstone.picknic.domain.place;

import com.capstone.picknic.domain.Detail;
import com.capstone.picknic.domain.Menu;
import com.capstone.picknic.domain.RatingReview;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Table(name = "place")
@Inheritance(strategy = InheritanceType.JOINED) // use join strategy
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorColumn(name = "Place_Type") // default is DType
@Getter
@SuperBuilder
public class Place {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long id;

    @Column(name = "place_name", nullable = false)
    private String name;

    @Column(name = "place_address", nullable = false)
    private String address;

    @Column(nullable = false)
    @Embedded
    private Coordinate coord;

    @Column(name = "place_url")
    private String url;

    @Column(name = "catagory_name")
    private String categoryName;

    @Column(name = "phone_number")
    private String phoneNumber;

    //thumbnail 설정 유무
    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // fetch = FetchType.LAZY는 지연로딩 전략으로 default 즉시로딩(EAGER)
    @JoinColumn(name = "rating_review_id")
    private RatingReview ratingReview;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // fetch = FetchType.LAZY는 지연로딩 전략으로 default 즉시로딩(EAGER)
    @PrimaryKeyJoinColumn
    private Detail detail;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL) // mappedBy는 연관관계에서 주인이 아닌 엔티티에서 수정을 불가하게 하는것
    private List<Menu> menus;                                 // cascade는 부모의 객체가 영속화,삭제 될때 자식객체도 같이

}

