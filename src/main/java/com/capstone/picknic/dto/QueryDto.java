package com.capstone.picknic.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class QueryDto {
    private String query;
    private String categoryCode;
    private int page;
    private int size;

}
