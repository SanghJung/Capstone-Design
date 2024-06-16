package com.capstone.picknic.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    /**
     *
     * @param corsRegistry
     * Controller 에서 들어오는 cors 설정
     *
     */
    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**") //모든 3000번포트(프론트서버) 엔드포인트를 허용
                .allowedOrigins("http://localhost:3000");
    }
}
