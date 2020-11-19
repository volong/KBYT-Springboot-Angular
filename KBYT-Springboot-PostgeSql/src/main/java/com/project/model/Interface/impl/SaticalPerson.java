package com.project.model.Interface.impl;

import com.project.model.Interface.ISaticalPerson;

public class SaticalPerson implements ISaticalPerson {

    private int count;
    private String date;

    @Override
    public int getCount() {
        return count;
    }

    @Override
    public String getDate() {
        return date;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public SaticalPerson() {
    }
}
