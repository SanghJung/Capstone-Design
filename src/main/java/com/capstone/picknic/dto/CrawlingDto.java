package com.capstone.picknic.dto;

import com.capstone.picknic.domain.Menu;
import com.capstone.picknic.domain.place.Place;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CrawlingDto {

    @JsonProperty("place_name")
    private String name;

    @JsonProperty("rating")
    private String rating;

    @JsonProperty("visitor_review")
    private String visitorReview;

    @JsonProperty("blog_review")
    private String blogReview;

    @JsonProperty("place_thumb")
    private String placeThumb;

    @JsonProperty("place_facility")
    private String placeFacility;

    @JsonProperty("place_homepage_url")
    private String placeHomepageUrl;

    @JsonProperty("place_time")
    private String placeTime;

    @JsonProperty("place_service")
    private String placeService;

    @JsonProperty("menus")
    private List<MenuDto> menus;
}
