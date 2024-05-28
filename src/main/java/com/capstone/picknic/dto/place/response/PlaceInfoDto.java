package com.capstone.picknic.dto.place.response;

import com.capstone.picknic.domain.Detail;
import com.capstone.picknic.domain.Menu;
import lombok.Builder;
import lombok.Getter;

import javax.management.DescriptorAccess;

@Getter
public class PlaceInfoDto {
    private String phoneNumber;
    private String url;
    private Menu menu;
    private Detail detail;


    @Builder
    public PlaceInfoDto(String phoneNumber, String url, Menu menu, Detail detail) {
        this.phoneNumber = phoneNumber;
        this.url = url;
        this.menu = menu;
        this.detail = detail;
    }
}