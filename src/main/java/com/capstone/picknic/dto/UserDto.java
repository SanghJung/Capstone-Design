package com.capstone.picknic.dto;

import com.capstone.picknic.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {

    private Long userId;
    private String loginId;
    private String password;
    private String nickname;

    @Builder
    public UserDto(String loginId, String password, String nickname) {
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
    }

    public User toEntity() {
        return User.builder()
                .nickname(nickname)
                .password(password)
                .loginId(loginId)
                .build();
    }
}