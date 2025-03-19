package org.example.userauth.security.oauth2;

import java.util.Map;

public class OAuth2UserInfo {
    protected Map<String, Object> attributes;
    
    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    
    public Map<String, Object> getAttributes() {
        return attributes;
    }
    
    public String getId() {
        return (String) attributes.get("sub");
    }
    
    public String getName() {
        return (String) attributes.get("name");
    }
    
    public String getEmail() {
        return (String) attributes.get("email");
    }
    
    public String getFirstName() {
        String firstName = (String) attributes.get("given_name");
        if (firstName == null) {
            String name = getName();
            if (name != null && name.contains(" ")) {
                firstName = name.split(" ")[0];
            } else {
                firstName = name;
            }
        }
        return firstName;
    }
    
    public String getLastName() {
        String lastName = (String) attributes.get("family_name");
        if (lastName == null) {
            String name = getName();
            if (name != null && name.contains(" ")) {
                String[] parts = name.split(" ");
                if (parts.length > 1) {
                    lastName = parts[parts.length - 1];
                }
            }
        }
        return lastName != null ? lastName : "";
    }
}