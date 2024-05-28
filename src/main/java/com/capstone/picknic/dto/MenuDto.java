package com.capstone.picknic.dto;


import com.capstone.picknic.domain.Menu;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class MenuDto {

    @JsonProperty("name")
    private String name;

    @JsonProperty("price")
    private String price;

    @JsonProperty("thumb")
    private String thumb;

    public Menu toEntity() {
        return Menu.builder()
                .imgUrl(this.thumb)
                .name(this.name)
                .price(this.price)
                .build();
    }

    @Builder
    public MenuDto(String name, String price, String thumb) {
        this.name = name;
        this.price = price;
        this.thumb = thumb;
    }
}
