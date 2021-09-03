package com.example.chatapp.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Document
public class User {


    @Id
    private String id;
    @NonNull
    private String name;
    @NonNull
    private String username;
    @NonNull
    private String email;
    @NonNull
    private String password;



    private Boolean isActive;
    private String logo;

    private List<String> chatId;

}
