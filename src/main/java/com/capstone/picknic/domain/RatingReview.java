package com.capstone.picknic.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rating_review")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RatingReview {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rating_review_id")
    private Long id;

    @Column(name = "visitor_reviews_cnt")
    private int visitorReviewsCnt;

    @Column(name = "blog_reviews_cnt")
    private int blogReviewsCnt;

    private float rating;
}
