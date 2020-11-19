package com.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "listcontact")
public class ListContact {

    @Id
    private Long id_contact;
    private String contact;

    @JsonIgnore
    @OneToMany(mappedBy = "listContact")
    private Set<Contact> contacts;

    public ListContact() {
    }

    public ListContact(Long id_contact, String contact) {
        this.id_contact = id_contact;
        this.contact = contact;
    }

    public Long getId_contact() {
        return id_contact;
    }

    public void setId_contact(Long id_contact) {
        this.id_contact = id_contact;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }
}
