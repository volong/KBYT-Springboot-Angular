package com.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_person;

    @Column(unique=false)
    private String passportNumber;
    private String fullName;
    private Date yob;
    private String gender;
    private String phoneNumber;
    private String email;
    private String street;                  //đường, thôn, xóm.....
    private String actIn14days;             //action trong vòng 14 ngày qua
    private Long khaiho;
    private Date date;
    private Long declared;
    private Long isDelete;

    @ManyToOne
    @JoinColumn(name = "id_province")
    private Province province;

    @ManyToOne
    @JoinColumn(name = "id_district")
    private District district;

    @ManyToOne
    @JoinColumn(name = "id_ward")
    private Ward ward;

    @JsonIgnore
    @OneToMany(mappedBy = "person")
    private Set<Sick> sicks;

    @JsonIgnore
    @OneToMany(mappedBy = "person")
    private Set<Contact> contacts;

    @JsonIgnore
    @OneToMany(mappedBy = "person")
    private Set<Symptom> symptoms;


    public Person() {
    }

    public Person(Long id_person, String passportNumber, String fullName, String gender, Date yob, String phoneNumber,
                  String email, String street, String actIn14days, Long khaiho, Date date, String id_province, String id_district, String id_ward, Long declared, Long isDelete
    ) {
        this.id_person = id_person;
        this.passportNumber = passportNumber;
        this.fullName = fullName;
        this.gender = gender;
        this.yob = yob;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.street = street;
        this.actIn14days = actIn14days;
        this.khaiho = khaiho;
        this.date = date;
        this.declared = declared;
        this.isDelete = isDelete;
    }

    public Long getId_person() {
        return id_person;
    }

    public void setId_person(Long id_person) {
        this.id_person = id_person;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Date getYob() {
        return yob;
    }

    public void setYob(Date yob) {
        this.yob = yob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getActIn14days() {
        return actIn14days;
    }

    public void setActIn14days(String actIn14days) {
        this.actIn14days = actIn14days;
    }

    public Long getKhaiho() {
        return khaiho;
    }

    public void setKhaiho(Long khaiho) {
        this.khaiho = khaiho;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getDeclared() {
        return declared;
    }

    public void setDeclared(Long declared) {
        this.declared = declared;
    }

    public Long getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Long isDelete){
        this.isDelete = isDelete;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public Ward getWard() {
        return ward;
    }

    public void setWard(Ward ward) {
        this.ward = ward;
    }

    public Set<Sick> getSicks() {
        return sicks;
    }

    public void setSicks(Set<Sick> sicks) {
        this.sicks = sicks;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }

    public Set<Symptom> getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(Set<Symptom> symptoms) {
        this.symptoms = symptoms;
    }



}
