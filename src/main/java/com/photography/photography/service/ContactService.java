package com.photography.photography.service;

import com.photography.photography.entity.Contact;
import com.photography.photography.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;
    private final EmailService emailService;

    public ContactService(
            ContactRepository contactRepository,
            EmailService emailService) {

        this.contactRepository = contactRepository;
        this.emailService = emailService;
    }

    public Contact createContact(Contact contact) {

        // First save contact message to MySQL
        Contact savedContact = contactRepository.save(contact);

        // Send email notification to admin
        try {

            emailService.sendContactNotification(
                    savedContact.getName(),
                    savedContact.getEmail(),
                    savedContact.getPhone(),
                    savedContact.getSubject(),
                    savedContact.getMessage()
            );

            System.out.println("Contact email sent successfully.");

        } catch (Exception e) {

            System.out.println(
                    "Contact saved, but email failed: "
                            + e.getMessage()
            );
        }

        return savedContact;
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Contact getContactById(Long id) {
        return contactRepository.findById(id).orElse(null);
    }

    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }
}