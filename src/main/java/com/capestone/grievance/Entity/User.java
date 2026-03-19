package com.capestone.grievance.Entity;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String role;

    // 🔥 ADD THIS FIELD
    @ManyToOne
    @JoinColumn(name = "assignee_type_id")
    private AssigneeType assigneeType;

    public User() {}

    public User(String username, String password, String role, AssigneeType assigneeType) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.assigneeType = assigneeType;
    }

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public AssigneeType getAssigneeType() {
        return assigneeType;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setAssigneeType(AssigneeType assigneeType) {
        this.assigneeType = assigneeType;
    }
}