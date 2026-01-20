package com.example.userManagement.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "provider_profile")
public class ProviderProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String linkedin;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String service;

    private String price;

    private Integer stars;

    private String address;

    @Column(name = "profile_pic")
    private String profilePic;

    private Boolean certified;

    @Column(name = "certification_number")
    private String certificationNumber;

    private Integer experience;

    @ElementCollection
    @CollectionTable(name = "provider_profile_work_images", joinColumns = @JoinColumn(name = "provider_profile_id"))
    @Column(name = "work_images")
    private List<String> workImages;

    @ElementCollection
    @CollectionTable(name = "provider_profile_testimonials", joinColumns = @JoinColumn(name = "provider_profile_id"))
    @Column(name = "testimonials")
    private List<String> testimonials;

    // Getters and Setters
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public Boolean getCertified() {
        return certified;
    }

    public void setCertified(Boolean certified) {
        this.certified = certified;
    }

    public String getCertificationNumber() {
        return certificationNumber;
    }

    public void setCertificationNumber(String certificationNumber) {
        this.certificationNumber = certificationNumber;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
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
}
