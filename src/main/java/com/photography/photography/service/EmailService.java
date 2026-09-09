package com.photography.photography.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    private final String adminEmail = "priya230230ram@gmail.com";
    private final String senderEmail = "priya230230ram@gmail.com";
    private final String senderName = "Priya Photography";

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void sendBookingNotification(
            String name,
            String phone,
            String email,
            String eventType,
            String eventDate,
            String location,
            String message) {

        String subject = "New Photography Booking - " + name;

        String text =
                "New Photography Booking\n\n" +
                "Name: " + name + "\n" +
                "Phone: " + phone + "\n" +
                "Email: " + email + "\n" +
                "Event Type: " + eventType + "\n" +
                "Event Date: " + eventDate + "\n" +
                "Location: " + location + "\n" +
                "Message: " + message;

        sendEmail(subject, text);
    }

    public void sendContactNotification(
            String name,
            String email,
            String phone,
            String subject,
            String message) {

        String mailSubject = "New Contact Message - " + subject;

        String text =
                "New Contact Message\n\n" +
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Phone: " + phone + "\n" +
                "Subject: " + subject + "\n\n" +
                "Message:\n" +
                message;

        sendEmail(mailSubject, text);
    }

    private void sendEmail(String subject, String text) {

        try {

            Map<String, Object> emailData = Map.of(
                    "sender", Map.of(
                            "name", senderName,
                            "email", senderEmail
                    ),
                    "to", List.of(
                            Map.of(
                                    "email", adminEmail,
                                    "name", "Priya"
                            )
                    ),
                    "subject", subject,
                    "textContent", text
            );

            String json = objectMapper.writeValueAsString(emailData);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.brevo.com/v3/smtp/email"))
                    .header("accept", "application/json")
                    .header("api-key", brevoApiKey)
                    .header("content-type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            if (response.statusCode() >= 200 &&
                response.statusCode() < 300) {

                System.out.println("Brevo email sent successfully.");

            } else {

                System.out.println(
                        "Brevo email failed. Status: "
                                + response.statusCode()
                                + " Response: "
                                + response.body()
                );
            }

        } catch (Exception e) {

            System.out.println(
                    "Brevo email error: " + e.getMessage()
            );
        }
    }
}