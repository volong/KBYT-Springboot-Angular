package com.project.model.Interface.impl;

import com.project.model.Interface.IStaticalDeclared;

public class StaticDeclared implements IStaticalDeclared {
    private int declared;

    @Override
    public int getDeclared() {
        return declared;
    }


}
