package com.capestone.grievance.Entity;

import jakarta.persistence.*;

@Entity
public class Category {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
  @JoinColumn(name = "assignee_type_id")
    public AssigneeType assigneeType;

public Category() {
}
    public Category(String name, AssigneeType assigneeType){
        this.name=name;
        this.assigneeType=assigneeType;
    }

    public Category(AssigneeType assigneeType) {
        this.assigneeType = assigneeType;
    }
     public AssigneeType getAssigneeType() {
        return assigneeType;
    }

    public void setAssigneeType(AssigneeType assigneeType) {
        this.assigneeType = assigneeType;
    }

    public Long getId() {
    return id;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}


}
