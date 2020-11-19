package com.project.model.Interface.impl;

import com.project.model.Interface.ISaticalSymptom;

public class SaticalSymptom implements ISaticalSymptom {
    private int count;
    private String listSymptom;
    private int symptomId;

    @Override
    public int getCount() {
        return count;
    }

    @Override
    public String getListSymptom() {
        return listSymptom;
    }

    @Override
    public int getSymptomId() {
        return symptomId;
    }
}
