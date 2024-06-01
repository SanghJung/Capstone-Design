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

    @Column(name = "visitor_reviews")
    private int visitorReviews;

    @Column(name = "blog_reviews")
    private int blogReviews;

    @Column(name = "rating_value")
    private float ratingValue;

    @Builder
    public RatingReview(int visitorReviews, int blogReviews, float rating) {
        this.blogReviews = blogReviews;
        this.visitorReviews = visitorReviews;
        this.ratingValue = rating;
    }
}
