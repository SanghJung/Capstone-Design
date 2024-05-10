package com.capstone.picknic.domain;


import com.capstone.picknic.dto.UserDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Table(name = "user_table")


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User implements UserDetails {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", updatable = false, nullable = false)
    private Long userId;

    @Column(name = "login_id", updatable = false, unique = true, nullable = false)
    private String loginId;

    @Column(name = "password", updatable = false, nullable = false)
    private String password;

    @Column(name = "nickname", updatable = false, unique = true, nullable = false)
    private String nickname; //getNickname userNickname -> getUserNickname

    @Builder
    public User(String loginId, String password, String nickname, String auth) {
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
    }


    public Boolean checkDuplicatedPassword(String password) {
        return this.password.equals(password);
    }


    /*회원정보 변경*/
    public void updateNickname(String nickname){
        this.nickname = nickname;
    }
    public  void updatePassword(String password){
        this.password = password;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("users"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return loginId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
