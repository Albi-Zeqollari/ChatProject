package com.example.chatapp.controllers;

import com.example.chatapp.models.Messages;
import com.example.chatapp.models.User;
import com.example.chatapp.repositories.MessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:4200")
@RestController
public class MessagesController {


    private  final SimpMessagingTemplate template;



    @Autowired
    private MessageRepository messageRepository;

    public MessagesController(SimpMessagingTemplate template) {
        this.template = template;

    }


    @GetMapping("/message")
    public List<Messages> getAllMessages(){


        return messageRepository.findAll();
    }

    @PostMapping("/message")
    public Messages createMessages(@RequestBody Messages messages){

        return messageRepository.save(messages);
    }

    @GetMapping("/msg/{chatId}")
    public ResponseEntity<List<Messages>> getMsgByUserId(@PathVariable String chatId){

        List<Messages> messagesList =  messageRepository.findByChatId(chatId);

        return  ResponseEntity.ok(messagesList);

    }

    @DeleteMapping("/msg/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteMsg(@PathVariable String id){

        messageRepository.deleteMessagesById(id);

        Map<String,Boolean> response = new HashMap<>();

        response.put("deleted",Boolean.TRUE);

        return ResponseEntity.ok(response);

    }


}
