package com.project.model;

import com.sun.istack.Nullable;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@Data
@MappedSuperclass
public class BasicModel {
    private String createBy;
}
