package com.photography.photography.controller;

import com.photography.photography.entity.Contact;
import com.photography.photography.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    // CREATE CONTACT
    @PostMapping
    public Contact createContact(@Valid @RequestBody Contact contact) {
        return contactService.createContact(contact);
    }

    // GET ALL CONTACTS
    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }

    // GET CONTACT BY ID
    @GetMapping("/{id}")
    public Contact getContactById(@PathVariable Long id) {
        return contactService.getContactById(id);
    }

    // DELETE CONTACT
    @DeleteMapping("/{id}")
    public String deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return "Contact deleted successfully";
    }
}