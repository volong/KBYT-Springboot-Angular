package com.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "provinces")
public class Province {

    @Id
    @Column(name = "id_province", unique = true, columnDefinition = "VARCHAR(20)")
    private String id_province;

    private String province;
    @JsonIgnore
    //@OneToMany(targetEntity = Person.class)
    @OneToMany(mappedBy = "province")
    private Set<Person> persons;
    @JsonIgnore
    //@OneToMany(targetEntity = District.class)
    @OneToMany(mappedBy = "province")
    private Set<District> districts;

    public Province() {
    }

    public Province(String id_province, String province) {
        this.id_province = id_province;
        this.province = province;
    }

    public Set<District> getDistricts() {
        return districts;
    }

    public void setDistricts(Set<District> districts) {
        this.districts = districts;
    }

    public Set<Person> getPersons() {
        return persons;
    }

    public void setPersons(Set<Person> persons) {
        this.persons = persons;
    }

    public String getId_province() {
        return id_province;
    }

    public void setId_province(String id_province) {
        this.id_province = id_province;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }
}
