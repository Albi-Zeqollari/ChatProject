package com.example.chatapp.repositories;

import com.example.chatapp.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface UserRepository extends MongoRepository<User,String> {


    User findByEmail(String  email);

    List<User> findByChatId(String chatId);

}
