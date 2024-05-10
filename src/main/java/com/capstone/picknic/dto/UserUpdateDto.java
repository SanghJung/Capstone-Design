package com.capstone.picknic.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserUpdateDto {

    @NotBlank
    private String loginId;

    @NotBlank
    private String nickname;

    @NotBlank
    private String password;
}
