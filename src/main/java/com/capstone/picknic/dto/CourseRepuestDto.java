package com.capstone.picknic.dto;

import com.capstone.picknic.domain.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CourseRepuestDto {
    private String courseName;
    private User user;
}
