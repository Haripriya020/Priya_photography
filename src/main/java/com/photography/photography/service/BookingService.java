package com.photography.photography.service;

import com.photography.photography.entity.Booking;
import com.photography.photography.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EmailService emailService;

    public BookingService(
            BookingRepository bookingRepository,
            EmailService emailService) {

        this.bookingRepository = bookingRepository;
        this.emailService = emailService;
    }

    public Booking createBooking(Booking booking) {

        // First save booking to MySQL
        Booking savedBooking = bookingRepository.save(booking);

        // Send email notification to admin
        try {

            emailService.sendBookingNotification(
                    savedBooking.getName(),
                    savedBooking.getPhone(),
                    savedBooking.getEmail(),
                    savedBooking.getEventType(),
                    savedBooking.getEventDate(),
                    savedBooking.getLocation(),
                    savedBooking.getMessage()
            );

            System.out.println("Booking email sent successfully.");

        } catch (Exception e) {

            System.out.println(
                    "Booking saved, but email failed: "
                            + e.getMessage()
            );
        }

        return savedBooking;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}