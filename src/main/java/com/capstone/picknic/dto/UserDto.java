package com.capstone.picknic.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
    private Long userId;
    private String loginId;
    private String password;
    private String nickname;

}