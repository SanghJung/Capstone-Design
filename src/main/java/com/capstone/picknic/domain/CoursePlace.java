package com.capstone.picknic.domain;

import com.capstone.picknic.domain.place.Place;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "course_place")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CoursePlace {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_place_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    public void setCourse(Course course) {
        this.course = course;
        course.getCoursePlaceList().add(this);
    }

    @Builder
    public CoursePlace(Place place) {
        this.place = place;
    }
}
