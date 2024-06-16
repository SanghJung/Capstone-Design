package com.capstone.picknic.config;


import com.capstone.picknic.jwt.JwtFilter;
import com.capstone.picknic.jwt.LoginFilter;
import com.capstone.picknic.jwt.TokenProvider;
import com.capstone.picknic.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity // Spring Security 지원을 가능하게 함
@RequiredArgsConstructor
public class SecurityConfig{

    private final AuthenticationConfiguration authenticationConfiguration;
    private final TokenProvider tokenProvider;


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors((cors) -> cors // filter를 통해 들어오는 요철 cors 설정
                        .configurationSource(new CorsConfigurationSource() {
                            @Override
                            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                                CorsConfiguration configuration = new CorsConfiguration();
                                configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000")); // Localhost:3000 (프론트서버)에서 오는 요청 허용
                                configuration.setAllowedMethods(Collections.singletonList("*")); //GET, POST, PUT, DELETE 를 모두허용
                                configuration.setAllowCredentials(true); //쿠키, 인증해더를 포함한 요청 허용
                                configuration.setAllowedHeaders(Collections.singletonList("*")); //모든 Http 헤더 허용
                                configuration.setMaxAge(3600L); //Cors 캐시 지속시간(Cors를 얼마나 지속할건지)

                                configuration.setExposedHeaders(Collections.singletonList("Authorization")); //클라이언트가 "Authorization" 헤더에 접근 가능하게 함
                                return configuration;
                            }
                        })
                )
                .formLogin( (auth) -> auth.disable()) //form로그인 기능 끄기
                .httpBasic( (auth) -> auth.disable()) //http basic 인증 끄기
                .sessionManagement( management -> management
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))// 세션 기반 인증 끄기
                .authorizeHttpRequests((auth) -> auth //인증을 받은 사용자만 요청이 가능하게 함
                        .requestMatchers("/login", "signUp").permitAll() //인증을 받지 않은 사용자도 요청가능하게함
                        .anyRequest().authenticated())

                .addFilterBefore(new JwtFilter(tokenProvider), LoginFilter.class) // 구현한 필터들을 내가 원하는 필터 순서대로 거치기 위해 씀

                .csrf(AbstractHttpConfigurer::disable) //세션을 stateless 상태로 사용하기 때문 csrf 끄기
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), tokenProvider), UsernamePasswordAuthenticationFilter.class)// 구현한 필터들을 내가 원하는 필터 순서대로 거치기 위해 씀
                .build();
    }
}