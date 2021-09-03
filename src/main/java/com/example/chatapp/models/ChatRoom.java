package com.example.chatapp.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor

public class ChatRoom {

    @Id
    @NonNull
    private  String id;

    private List<Messages> messagesListId;

    private List<User> usersListId;
    @NonNull
    private String chatName;
    @NonNull
    private String adminId;

    private LocalDateTime recentConversation;

}
