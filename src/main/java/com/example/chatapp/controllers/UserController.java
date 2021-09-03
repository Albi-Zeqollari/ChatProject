package com.example.chatapp.controllers;

import com.example.chatapp.dto.UserDto;
import com.example.chatapp.models.ChatRoom;
import com.example.chatapp.models.User;
import com.example.chatapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/users")
    private List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {

        if(user.getName().equals("") && user.getUsername().equals("")&& user.getEmail().equals("") && user.getPassword().equals("")){

            return null;
        }else{
            return userRepository.save(user);
       }

    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {

        Optional<User> user = userRepository.findById(id);

        if (user.isPresent()) {

            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody UserDto userDto) {

        User user1 = userRepository.findByEmail(userDto.getEmail());

        if(user1.getEmail().equals(userDto.getEmail())  &&  user1.getPassword().equals(userDto.getPassword())){

            if( userDto.getPassword().equals("")){
                return null;
            }
                user1.setIsActive(true);
                userRepository.save(user1);
                return new ResponseEntity<>(user1,HttpStatus.OK);
         }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user,@PathVariable String id){

        User updatedUser = userRepository.save(user);

        return ResponseEntity.ok(updatedUser);
    }


    @GetMapping("/us/{chatId}")
    public ResponseEntity<List<User>> getChatByUserId(@PathVariable String chatId){

       List<User> userList = userRepository.findByChatId(chatId);

       return ResponseEntity.ok(userList);
    }



}

