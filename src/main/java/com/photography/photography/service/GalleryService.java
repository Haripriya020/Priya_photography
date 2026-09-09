package com.photography.photography.service;

import com.photography.photography.entity.Gallery;
import com.photography.photography.repository.GalleryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GalleryService {

    private final GalleryRepository galleryRepository;

    public GalleryService(GalleryRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }

    public Gallery createGallery(Gallery gallery) {
        return galleryRepository.save(gallery);
    }

    public List<Gallery> getAllGallery() {
        return galleryRepository.findAll();
    }

    public Gallery getGalleryById(Long id) {
        return galleryRepository.findById(id).orElse(null);
    }

    public void deleteGallery(Long id) {
        galleryRepository.deleteById(id);
    }
}