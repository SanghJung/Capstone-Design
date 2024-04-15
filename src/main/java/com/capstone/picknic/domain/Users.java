package com.capstone.picknic.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name = "user_table")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter


public class Users implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", updatable = false, nullable = false)
    private Long user_id;

    @Column(name = "loginid", updatable = false, unique = true, nullable = false)
    private String loginid;

    @Column(name = "password", updatable = false, nullable = false)
    private String password;

    @Column(name = "nickname", updatable = false, unique = true, nullable = false)
    private String nickname;

    @Builder
    public Users(String loginid, String password, String nickname, String auth){
        this.loginid = loginid;
        this.password = password;
        this.nickname = nickname;
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
        return loginid;
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
