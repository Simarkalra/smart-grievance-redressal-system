package com.capestone.grievance.Entity;

import jakarta.persistence.*;

@Entity
public class Category {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Category)) return false;
    Category c = (Category) o;
    return id != null && id.equals(c.id);
}

@Override
public int hashCode() {
    return getClass().hashCode();
}

@ManyToOne
private Organization organization;

    @ManyToOne
    @JoinColumn(name = "assignee_type_id")
    private AssigneeType assigneeType;

    public Category() {
    }
    public Category(String name, AssigneeType assigneeType) {
        this.name = name;
        this.assigneeType = assigneeType;
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
    public void setOrganization(Organization org) {
      this.organization=org;
    }
}
