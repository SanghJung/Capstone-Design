package com.capstone.picknic.service;

import com.capstone.picknic.domain.Info;
import com.capstone.picknic.domain.place.Place;
import com.capstone.picknic.repository.InfoRepository;
import com.capstone.picknic.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CrawlingService {
    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private InfoRepository infoRepository;

    public void crawlAndSaveInfo() {
        List<Place> places = placeRepository.findAll();
        for (Place place : places) {
            String jsonData = crawlData(place.getName());
            Info info = new Info();
            info.setPlaceName(place.getName());
            info.setJsonData(jsonData);
            infoRepository.save(info);
        }
    }

    public String crawlData(String placeName) {
        try {
            // Execute the Python script to crawl data
            ProcessBuilder pb = new ProcessBuilder("python", "../../../python_code/Crawl.py", placeName);
            Process process = pb.start();

            // Read the output of the Python script
            InputStream inputStream = process.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            String jsonData = reader.lines().collect(Collectors.joining("\n"));

            // Wait for the process to finish
            int exitCode = process.waitFor();

            // Check if the process exited normally
            if (exitCode == 0) {
                return jsonData;
            } else {
                // Handle error case if needed
                return null;
            }
        } catch (Exception e) {
            // Handle exception if any
            e.printStackTrace();
            return null;
        }
    }
}