package com.capstone.picknic.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
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

    @Column(name = "rating_value")
    private float ratingValue;

    @Builder
    public RatingReview(int visitorReviewsCnt, int blogReviewsCnt, float rating) {
        this.blogReviewsCnt = blogReviewsCnt;
        this.visitorReviewsCnt = visitorReviewsCnt;
        this.ratingValue = rating;
    }
}
