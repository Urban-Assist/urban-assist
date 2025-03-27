package com.example.userManagement.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Data
public class ProviderProfileDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String description;
    private Boolean certified;
    private String profilePic;
    private int stars;
    private String address;
    private String price;
    private List<String> workImages;
    private List<String> testimonials;
    private String phoneNumber;
    private String email;
    private String linkedin;
    private String service;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public List<String> getWorkImages() {
        return workImages;
    }

    public void setWorkImages(List<String> workImages) {
        this.workImages = workImages;
    }

    public List<String> getTestimonials() {
        return testimonials;
    }

    public void setTestimonials(List<String> testimonials) {
        this.testimonials = testimonials;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public Boolean getCertified() {
        return certified;
    }

    public void setCertified(Boolean certified) {
        this.certified = certified;
    }
}