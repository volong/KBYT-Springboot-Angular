package com.project.model.Interface.impl;

import com.project.model.Interface.ISaticalContact;

public class SaticalContact implements ISaticalContact {

    private int count;
    private String listContact;
    private int contactId;


    @Override
    public int getCount() {
        return count;
    }

    @Override
    public String getListContact() {
        return listContact;
    }

    @Override
    public int getContactId() {
        return contactId;
    }
}
