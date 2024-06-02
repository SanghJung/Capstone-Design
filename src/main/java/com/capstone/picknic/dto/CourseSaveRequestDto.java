package com.capstone.picknic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CourseSaveRequestDto {
    private String LoginId;

    private String courseName;

    private String tags;

    private List<Long> PlaceIdList;
}
