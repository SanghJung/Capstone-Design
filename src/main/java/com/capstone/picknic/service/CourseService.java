package com.capstone.picknic.service;

import com.capstone.picknic.domain.Course;
import com.capstone.picknic.domain.CoursePlace;
import com.capstone.picknic.domain.User;
import com.capstone.picknic.domain.place.Place;
import com.capstone.picknic.dto.CourseRepuestDto;
import com.capstone.picknic.dto.CourseSaveRequestDto;
import com.capstone.picknic.repository.CoursePlaceRepository;
import com.capstone.picknic.repository.CourseRepository;
import com.capstone.picknic.repository.PlaceRepository;
import com.capstone.picknic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    private final CoursePlaceRepository coursePlaceRepository;
    @Transactional
    public Course save(CourseSaveRequestDto courseSaveRequestDto) {

        User user = userRepository.findByLoginId(courseSaveRequestDto.getLoginId())
                .orElseThrow(() -> new IllegalArgumentException("아이디를 찾을 수 없습니다."));

        Course course = Course.builder()
                .courseName(courseSaveRequestDto.getCourseName())
                .user(user)
                .hashtags(courseSaveRequestDto.getTags())
                .coursePlaceList(new ArrayList<>())
                .build();

        Course savedCourse = courseRepository.save(course);

        for (Long placeId : courseSaveRequestDto.getPlaceIdList()) {
            Optional<Place> place = placeRepository.findById(placeId);
            CoursePlace coursePlace = CoursePlace.builder().place(place.get()).build();
            coursePlace.setCourse(savedCourse);
            coursePlaceRepository.save(coursePlace);
        }

        return savedCourse;
    }
}
