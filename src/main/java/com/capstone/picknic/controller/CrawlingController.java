package com.capstone.picknic.controller;

import com.capstone.picknic.service.CrawlingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/crawl")
public class CrawlingController {
    @Autowired
    private CrawlingService crawlingService;

    @PostMapping("/start")
    public ResponseEntity<String> startCrawling() {
        crawlingService.crawlAndSaveInfo();
        return ResponseEntity.ok("Crawling started.");
    }
}