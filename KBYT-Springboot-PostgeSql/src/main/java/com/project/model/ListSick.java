package com.project.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "listsick")
public class ListSick {

    @Id
    private Long id_sick;
    private String sick;

    @JsonIgnore
    @OneToMany(mappedBy = "listSick")
    private Set<Sick> sicks;

    public ListSick() {
    }

    public ListSick(Long id_sick, String sick) {
        this.id_sick = id_sick;
        this.sick = sick;
    }

    public Long getId_sick() {
        return id_sick;
    }

    public void setId_sick(Long id_sick) {
        this.id_sick = id_sick;
    }

    public String getSick() {
        return sick;
    }

    public void setSick(String sick) {
        this.sick = sick;
    }

    public Set<Sick> getSicks() {
        return sicks;
    }

    public void setSicks(Set<Sick> sicks) {
        this.sicks = sicks;
    }
}
