package com.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

//quận

@Entity
@Table(name = "districts")
public class District extends BasicModel{

    @Id
    @Column(name = "id_district", unique = true, columnDefinition = "VARCHAR(20)")
    private String id_district;
    private String district;

    @ManyToOne
    @JoinColumn(name = "id_province")
    private Province province;

    @JsonIgnore
    //@OneToMany(targetEntity = Person.class)
    @OneToMany(mappedBy = "district")
    private Set<Person> persons;

    @JsonIgnore
    //@OneToMany(targetEntity = Ward.class)
    @OneToMany(mappedBy = "district")
    private Set<Ward> wards;

    public District() {
    }

    public Set<Person> getPersons() {
        return persons;
    }

    public void setPersons(Set<Person> persons) {
        this.persons = persons;
    }

    public String getId_district() {
        return id_district;
    }

    public void setId_district(String id_district) {
        this.id_district = id_district;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }


    public Set<Ward> getWards() {
        return wards;
    }

    public void setWards(Set<Ward> wards) {
        this.wards = wards;
    }

}
