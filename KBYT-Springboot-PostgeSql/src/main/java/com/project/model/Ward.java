package com.project.model;
//phường

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "wards")
public class Ward {
    @Id
    @Column(name = "id_ward", unique = true, columnDefinition = "VARCHAR(20)")
    private String id_ward;
    private String ward;

    @ManyToOne
    @JoinColumn(name = "id_district")
    private District district;

    @JsonIgnore
    //@OneToMany(targetEntity = Person.class)
    @OneToMany(mappedBy = "ward")
    private Set<Person> persons;

    public Ward() {
    }

    public Ward(String ward) {
        this.ward = ward;
    }

    private Set<Person> getPersons() {
        return persons;
    }

    private void setPersons(Set<Person> persons) {
        this.persons = persons;
    }

    public String getId_ward() {
        return id_ward;
    }

    public void setId_ward(String id_ward) {
        this.id_ward = id_ward;
    }

    public String getWard() {
        return ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }
}
