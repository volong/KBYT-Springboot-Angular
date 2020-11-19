package com.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "listsymptom")
public class ListSymptom {

    @Id
    private Long id_symptom;
    private String symptom;

    @JsonIgnore
    @OneToMany(mappedBy = "listSymptom")
    private Set<Symptom> symptoms;

    public ListSymptom() {
    }

    public ListSymptom(Long id_symptom, String symptom) {
        this.id_symptom = id_symptom;
        this.symptom = symptom;
    }

    public Long getId_symptom() {
        return id_symptom;
    }

    public void setId_symptom(Long id_symptom) {
        this.id_symptom = id_symptom;
    }

    public String getSymptom() {
        return symptom;
    }

    public void setSymptom(String symptom) {
        this.symptom = symptom;
    }

    public Set<Symptom> getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(Set<Symptom> symptoms) {
        this.symptoms = symptoms;
    }
}
