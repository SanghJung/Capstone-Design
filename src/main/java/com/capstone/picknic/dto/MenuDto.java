package com.capstone.picknic.dto;


import com.capstone.picknic.domain.Menu;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
