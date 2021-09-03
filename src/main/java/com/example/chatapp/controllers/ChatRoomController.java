package com.example.chatapp.controllers;


import com.example.chatapp.models.ChatRoom;
import com.example.chatapp.repositories.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
public class ChatRoomController {

    @Autowired
    private ChatRepository chatRepository;


    @GetMapping("/chat-rooms")
     public List<ChatRoom> getAllChatRooms(){

         return  chatRepository.findAll();
     }

     @PostMapping("/chat-rooms")
    public  ChatRoom createChatRoom(@RequestBody ChatRoom chatRoom){

       return   chatRepository.save(chatRoom);
     }

     @GetMapping("/chat-rooms/{id}/{userid}")
    public ResponseEntity<?> getChatById(@PathVariable String id,@PathVariable String userid){

         Optional<ChatRoom> chatRoom = chatRepository.findById(id,userid);

         if(chatRoom.isPresent()){

             return new ResponseEntity<>(chatRoom.get(), HttpStatus.OK);
         }else {

             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
         }
     }


    @GetMapping("/chat-room/{id}")
    public ResponseEntity<?> getChatById1(@PathVariable String id){

        Optional<ChatRoom> chatRoom = chatRepository.findById(id);

        if(chatRoom.isPresent()){

            return new ResponseEntity<>(chatRoom.get(), HttpStatus.OK);
        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/chat-rooms/{adminId}")
    public ResponseEntity<Map<String,Boolean>> deleteChat(@PathVariable String adminId){

        ChatRoom chatRoom = chatRepository.deleteChatRoomByAdminId(adminId);

        Map<String,Boolean> response = new HashMap<>();

        response.put("deleted",Boolean.TRUE);

        return ResponseEntity.ok(response);
     }

    @GetMapping("/chat/{adminId}")
    public ResponseEntity<List<ChatRoom>> getChatByUserId(@PathVariable String adminId){

      List<ChatRoom> chatRoomList = chatRepository.findByAdminId(adminId);

      return ResponseEntity.ok(chatRoomList);
    }

    @PutMapping("/chat-room/{id}")
    public  ResponseEntity<ChatRoom> updateChatRoom(@PathVariable String id,@RequestBody ChatRoom chatRoom){

        ChatRoom chatRoom1= chatRepository.save(chatRoom);

        return  ResponseEntity.ok(chatRoom1);

    }

}
