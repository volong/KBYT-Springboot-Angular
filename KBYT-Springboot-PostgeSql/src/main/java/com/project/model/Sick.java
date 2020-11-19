package com.project.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "sick")
public class Sick {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_person")
    private Person person;

    @ManyToOne
    @JoinColumn(name = "id_sick")
    private ListSick listSick;

    public Sick(Long id) {
        this.id = id;
    }

    public Sick() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id_sicks) {
        this.id = id_sicks;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public ListSick getListSick() {
        return listSick;
    }

    public void setListSick(ListSick listSick) {
        this.listSick = listSick;
    }
}
