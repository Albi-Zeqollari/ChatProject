package com.example.chatapp.controllers;

import com.example.chatapp.models.Messages;
import com.example.chatapp.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;



import java.text.SimpleDateFormat;
import java.util.Date;

@CrossOrigin("http://localhost:4200")
@Controller
public class WebSocketController {


    @Autowired
    MessageRepository messageRepository;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public Messages sendMessage(@Payload Messages messages){

       return   messageRepository.save(messages);

    }
}
