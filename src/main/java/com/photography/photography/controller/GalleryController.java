package com.photography.photography.controller;

import com.photography.photography.entity.Gallery;
import com.photography.photography.service.GalleryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @PostMapping
    public Gallery createGallery(@Valid @RequestBody Gallery gallery) {
        return galleryService.createGallery(gallery);
    }

    @GetMapping
    public List<Gallery> getAllGallery() {
        return galleryService.getAllGallery();
    }

    @GetMapping("/{id}")
    public Gallery getGalleryById(@PathVariable Long id) {
        return galleryService.getGalleryById(id);
    }
    @PutMapping("/{id}")
public Gallery updateGallery(
        @PathVariable Long id,
        @Valid @RequestBody Gallery gallery) {

    Gallery existing =
            galleryService.getGalleryById(id);

    if (existing == null) {
        return null;
    }

    existing.setTitle(gallery.getTitle());
    existing.setCategory(gallery.getCategory());
    existing.setImageUrl(gallery.getImageUrl());

    return galleryService.createGallery(existing);
}
    @DeleteMapping("/{id}")
    public String deleteGallery(@PathVariable Long id) {
        galleryService.deleteGallery(id);
        return "Gallery deleted successfully";
    }
}