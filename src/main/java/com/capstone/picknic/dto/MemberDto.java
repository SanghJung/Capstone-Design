package com.capstone.picknic.dto;


import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class MemberDto {
    private long id;
    // 나중에 정확한 규칙 정하고 정의 할것
    @NotBlank()                    // null, "", " " 검증
    @Size()                        // min, max. message 글자수 검증
    private String nickName;
    @NotBlank()
    private String loginId;
    @NotBlank()
    private String password;
}

// 아래와 같이 controller 에서 @Valid 으로 유효성검사 할려함

//@PostMapping("/login")
//public ResponseEntity login(@Valid @RequestBody MemebrDto memberDto) {
//    UserLoginResponseDto login = userService.login(loginUser);
//    return new ResponseEntity<>(new BaseResult.Normal(login), HttpStatus.OK);
//}