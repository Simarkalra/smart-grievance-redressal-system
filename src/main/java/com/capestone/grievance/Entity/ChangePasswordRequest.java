package com.capestone.grievance.Entity;

public class ChangePasswordRequest {

    private String username;
    private String oldPassword;
    private String newPassword;
    private Long organizationId;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username){
        this.username=username;
    }

    public String getOldPassword() {
        return oldPassword;
    }
    public void setOldPassword(String oldPassword){
        this.oldPassword=oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }
    public void setNewPassword(String newPassword){
        this.newPassword=newPassword;
    }

    public Long getOrganizationId() {
        return organizationId;
    }
    public void setOrganizationId(Long organizationId) {
        this.organizationId = organizationId;
    }
}
