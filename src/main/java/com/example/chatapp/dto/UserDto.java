package com.example.chatapp.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserDto {

    private String email;

    private String password;
}
