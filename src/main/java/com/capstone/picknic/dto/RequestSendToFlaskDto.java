package com.capstone.picknic.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RequestSendToFlaskDto {
    private final String place_name;
    private final String context;
}