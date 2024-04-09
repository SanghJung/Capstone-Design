package com.capstone.picknic.domain;

import com.capstone.picknic.dto.MemberDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "nick_name", nullable = false, length = 20)
    private String nickName;

    @Column(name = "login_id", nullable = false, length = 20)
    private String loginId;

    @Column(nullable = false, length = 20)
    private String password;

    // 생성 메서드 //
    // MemberDTO로 대체
    public static Member createMember(MemberDto memberDto, PasswordEncoder passwordEncoder) {
        Member member = new Member(memberDto.getId(), memberDto.getNickName(), memberDto.getLoginId(),
                passwordEncoder.encode(memberDto.getPassword()));
        return member;
    }

//    @Builder
//    public Member(String name, String password, String loginId) {
//        this.nickName = name;
//        this.password = password;
//        this.loginId = loginId;
//    }
//

}
