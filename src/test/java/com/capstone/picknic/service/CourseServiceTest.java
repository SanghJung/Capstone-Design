package com.capstone.picknic.service;

import com.capstone.picknic.domain.Course;
import com.capstone.picknic.domain.User;
import com.capstone.picknic.dto.CourseSaveRequestDto;
import com.capstone.picknic.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;


@ExtendWith(SpringExtension.class)
@SpringBootTest

class CourseServiceTest {

    @Autowired
    CourseService courseService;
    @Autowired
    UserRepository userRepository;

    @Test
    void 코스저장() {
        User user = User.builder()
                .loginId("11")
                .password("11")
                .nickname("11")
                .build();

        User savedUser = userRepository.save(user);

        CourseSaveRequestDto courseSaveRequestDto = new CourseSaveRequestDto(savedUser.getLoginId(), "course1", "가족이랑", Arrays.asList(1L, 2L, 3L));
        Course course = courseService.save(courseSaveRequestDto);

        System.out.println(course.getCourseName() + "," +  course.getCoursePlaceList() + "," + course.getId() + "," +course.getUser() + "," + course.getHashtags());


    }
}