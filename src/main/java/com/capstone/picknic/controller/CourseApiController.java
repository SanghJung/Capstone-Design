package com.capstone.picknic.controller;

import com.capstone.picknic.domain.Course;
import com.capstone.picknic.dto.CourseSaveRequestDto;
import com.capstone.picknic.service.CourseService;
import com.capstone.picknic.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CourseApiController {

    private final CourseService courseService;

    @PostMapping("/save/course")
    public ResponseEntity<Course> saveCourse(@RequestBody CourseSaveRequestDto courseSaveRequestDto) {
        Course course = courseService.save(courseSaveRequestDto);
        return ResponseEntity.ok(course);
    }
}
