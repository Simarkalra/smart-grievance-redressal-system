package com.capestone.grievance.Entity;

import jakarta.persistence.*;

@Entity
public class KeywordRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String keyword;

    private String priority;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public KeywordRule() {}

    public KeywordRule(String keyword, String priority, Category category) {
        this.keyword = keyword;
        this.priority = priority;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public String getKeyword() {
        return keyword;
    }

    public String getPriority() {
        return priority;
    }

    public Category getCategory() {
        return category;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}