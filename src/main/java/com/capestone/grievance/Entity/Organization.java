package com.capestone.grievance.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Organization {

    @Id
    @GeneratedValue
    private Long id;

    private String name; // College name / Company name

    public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public Object getId() {
    return id;
}

}