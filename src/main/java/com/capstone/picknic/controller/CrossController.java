package com.capstone.picknic.controller;

import com.capstone.picknic.domain.place.Activity;
import com.capstone.picknic.domain.place.Cafe;
import com.capstone.picknic.domain.place.Restaurant;
import com.capstone.picknic.dto.place.response.PlaceDetailsDto;
import com.capstone.picknic.dto.place.response.PlaceInfoDto;
import com.capstone.picknic.repository.ActivityRepository;
import com.capstone.picknic.repository.CafeRepository;
import com.capstone.picknic.repository.PlaceRepository;


import com.capstone.picknic.repository.RestaurantRepository;
import com.capstone.picknic.service.ActivityService;
import com.capstone.picknic.service.CafeService;
import com.capstone.picknic.service.PlaceService;
import com.capstone.picknic.service.RestaurantService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")  //corsefinal에서만 오는 요청 허용, 모든 요청 허용 필요시 origin = "*" 사용
@RestController
@RequestMapping("/api") //모든 엔드포인트 url 경로
@RequiredArgsConstructor

public class CrossController {

    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private ActivityRepository activityRepository;
    @Autowired
    private CafeRepository cafeRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    private final PlaceService placeService;
    private final RestaurantService restaurantService;
    private final CafeService cafeService;
    private final ActivityService activityService;



    // ~~Repository.findAll() 메서드를 통해 DB 속 정보들 가져와서 List<> 형태로 반환
  /*@GetMapping
    public List<Place> getPlace(){
        return placeRepository.findAll();
    }*/

    @GetMapping("/activities")
    public List<Activity> getAllActivity(){
        return activityRepository.findAll();
    }

    @GetMapping("/restaurants")
    public List<Restaurant> getAllRestaurant(){
        return restaurantRepository.findAll();
    }

    @GetMapping("/cafes")
    public List<Cafe> getAllCafe(){
        return cafeRepository.findAll();
    }

    //특정 ~~_id를 가진 정보 조회

    @GetMapping("/activities/{id}")   // pii/place/"coursefinal/{id}
    public ResponseEntity<Activity> getActivityById(@PathVariable Long id){
        return activityRepository.findById(id) //데이터베이스 속 Place_id 정보 찾기
                .map(ResponseEntity::ok)// 정보 O -> ResponseEntity 객체 생성, HTTP 코드 200(OK)와 정보를 응답 본문에 포함
                .orElseGet(() -> ResponseEntity.notFound().build()); //만약 정보 존재 X -> 404에러

    }

    @GetMapping("/restaurants/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id){
        return restaurantRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @GetMapping("/cafes/{id}")
    public ResponseEntity<Cafe> getCafeById(@PathVariable Long id){
        return cafeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PostMapping("/place")
    public ResponseEntity<List<PlaceDetailsDto>> getPlaceDetails() {
        List<PlaceDetailsDto> placeDetailsDtoList = placeService.allPlaceDetails();
        return ResponseEntity.ok(placeDetailsDtoList);
    }

    @PostMapping("/place/restaurant")
    public ResponseEntity<List<PlaceDetailsDto>> getRestaurantDetails() {
        List<PlaceDetailsDto> placeDetailsDtoList = restaurantService.allPlaceDetails();
        return ResponseEntity.ok(placeDetailsDtoList);
    }
    @PostMapping("/place/cafe")
    public ResponseEntity<List<PlaceDetailsDto>> getCafeDetails() {
        List<PlaceDetailsDto> placeDetailsDtoList = cafeService.allPlaceDetails();
        return ResponseEntity.ok(placeDetailsDtoList);
    }
    @PostMapping("/place/activity")
    public ResponseEntity<List<PlaceDetailsDto>> getActivityDetails() {
        List<PlaceDetailsDto> placeDetailsDtoList = activityService.allPlaceDetails();
        return ResponseEntity.ok(placeDetailsDtoList);
    }

    @Data
    public static class Dto {
        Long id;
    }
    @PostMapping("/info")
    public ResponseEntity<Optional<PlaceInfoDto>> getPlaceInfo(@RequestBody Dto dto) {
        Optional<PlaceInfoDto> placeInfoDto = placeService.findPlaceInfo(dto.getId());
        return ResponseEntity.ok(placeInfoDto);
    }
    /*
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    function PlaceList() {
    //요청 결과물
    const [places, setPlaces] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, serError] = useState(null);


      useEffect(() => {
        // 컴포넌트 마운트 시 데이터 가져오는 과정
        const pushPlaces = async () => {
            try{
                setPlaces(null);
                setLoading(null);
                setError(null);
                const response = await axios.get('/api/stores');
                setPlaces(response.data)//받은 데이터 setPlace에 담기
            } catch (e){
                setError(e); //에러 발생시
            }
            setLoading(false) //로딩 끝날 때
        };
        pushPlaces();
    },[]);
        if (loading) return <div>loading</div>;
        if (error) return <div>error</div>;
        if (!places) return null;

// html부분 추가 - 윤지님이 짜둔 코드 추가하면 될 듯


   다른 방법
        axios.get('/api/stores') // 스프링 부트 엔드포인트 URL
           .then(response => {
              setStores(response.data); // 응답 데이터로 상태 업데이트
        })
        .catch(error => {
            console.error('Error fetching store data:', error);
        });
      },[]);




*/





}
