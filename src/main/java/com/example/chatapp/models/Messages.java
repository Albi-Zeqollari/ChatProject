package com.example.chatapp.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@Document

public class Messages {

    @Id
    @NonNull
    private String id;
    @NonNull

    private String userName;

    private String userId;
    @NonNull
    private String chatId;
    @NonNull
    private String textMessage;
    @NonNull
    private LocalDateTime time;
    @NonNull
    private List<String> Seen;

}
