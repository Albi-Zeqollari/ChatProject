package com.example.chatapp.repositories;

import com.example.chatapp.models.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends MongoRepository<ChatRoom,String> {


    List<ChatRoom> findByAdminId(String adminId);

    ChatRoom deleteChatRoomByAdminId(String adminID);

    Optional<ChatRoom> findById(String id, String userid);

    Optional<ChatRoom> findById(String id);

}
