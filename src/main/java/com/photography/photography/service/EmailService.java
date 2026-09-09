package com.photography.photography.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    private final String adminEmail =
            "priya230230ram@gmail.com";

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendBookingNotification(
            String name,
            String phone,
            String email,
            String eventType,
            String eventDate,
            String location,
            String message) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo(adminEmail);

        mail.setSubject(
                "New Photography Booking - " + name
        );

        mail.setText(
                "New Photography Booking\n\n" +

                "Name: " + name + "\n" +
                "Phone: " + phone + "\n" +
                "Email: " + email + "\n" +
                "Event Type: " + eventType + "\n" +
                "Event Date: " + eventDate + "\n" +
                "Location: " + location + "\n" +
                "Message: " + message
        );

        mailSender.send(mail);
    }


    public void sendContactNotification(
            String name,
            String email,
            String phone,
            String subject,
            String message) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo(adminEmail);

        mail.setSubject(
                "New Contact Message - " + subject
        );

        mail.setText(
                "New Contact Message\n\n" +

                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Phone: " + phone + "\n" +
                "Subject: " + subject + "\n\n" +

                "Message:\n" +
                message
        );

        mailSender.send(mail);
    }
}