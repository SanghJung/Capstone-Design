package com.capstone.picknic.service;

import com.capstone.picknic.domain.Menu;
import com.capstone.picknic.dto.MenuDto;
import com.capstone.picknic.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;

    public void save(MenuDto menuDto) {
        menuRepository.save(menuDto.toEntity());
    }
}
