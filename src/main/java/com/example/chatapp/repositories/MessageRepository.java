package com.example.chatapp.repositories;

import com.example.chatapp.models.Messages;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Messages,String> {


    List<Messages> findByUserId(String userId);

    Messages deleteMessagesById(String id);

    List<Messages> findByChatId(String chatId);
}
