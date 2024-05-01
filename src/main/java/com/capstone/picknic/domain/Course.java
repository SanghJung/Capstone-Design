package com.capstone.picknic.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.internal.util.stereotypes.Lazy;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "course")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Course {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private long id;

    @Column(name = "course_name")
    private String CourseName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "course")
    private List<CourseHashtag> courseHashtagList = new ArrayList<>();

    @OneToMany(mappedBy = "course")
    private List<CoursePlace> coursePlaceList = new ArrayList<>();
}
