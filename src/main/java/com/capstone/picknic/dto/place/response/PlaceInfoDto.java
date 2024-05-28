package com.capstone.picknic.dto.place.response;

import com.capstone.picknic.domain.Detail;
import com.capstone.picknic.domain.Menu;
import com.capstone.picknic.dto.MenuDto;
import lombok.Builder;
import lombok.Getter;

import javax.management.DescriptorAccess;
import java.util.List;

@Getter
public class PlaceInfoDto {
    private String phoneNumber;
    private String url;
    private List<MenuDto> menus;
    private Detail detail;


    @Builder
    public PlaceInfoDto(String phoneNumber, String url, List<MenuDto> menus, Detail detail) {
        this.phoneNumber = phoneNumber;
        this.url = url;
        this.menus = menus;
        this.detail = detail;
    }
}