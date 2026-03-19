package com.capestone.grievance.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Grievance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime resolutionDeadline;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "reported_by")
    private User reportedBy;

    @ManyToOne
@JoinColumn(name = "assignee_type_id")
private AssigneeType assigneeType;

    // Default constructor (required by JPA)
    public Grievance() {}

    // ===== Getters =====

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getResolutionDeadline() {
        return resolutionDeadline;
    }

    public Priority getPriority() {
        return priority;
    }

    public Status getStatus() {
        return status;
    }

    public Category getCategory() {
        return category;
    }

    public User getReportedBy() {
        return reportedBy;
    }

   private AssigneeType getAssigneeType() {
    return assigneeType;
}

public void setAssigneeType(AssigneeType assigneeType) {
    this.assigneeType = assigneeType;
}
    // ===== Setters =====

    public void setId(Long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setResolutionDeadline(LocalDateTime resolutionDeadline) {
        this.resolutionDeadline = resolutionDeadline;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setReportedBy(User reportedBy) {
        this.reportedBy = reportedBy;
    }

   
    // ===== ENUMS =====

    public enum Status {
        PENDING,
        IN_PROGRESS,
        RESOLVED,
        REJECTED
    }

    public enum Priority {
        LOW,
        MEDIUM,
        HIGH,
        CRITICAL
    }

    public void setAssignee(User assignee) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setAssignee'");
    }
}