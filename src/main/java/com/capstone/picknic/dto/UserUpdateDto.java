package com.capstone.picknic.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@NoArgsConstructor
public class UserUpdateDto {

    @NotBlank
    private String loginId;

    @NotBlank
    private String password;

    private String newPassword;
}
