package mx.edu.utez.service.control;

import mx.edu.utez.service.model.User;
import mx.edu.utez.service.model.UserDTO;
import mx.edu.utez.service.utils.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("sgu-api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<Message> getAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getById(@PathVariable("id") Long id) {
        return userService.findById(id);
    }

    @PostMapping("/save")
    public ResponseEntity<Message> save(@Validated(UserDTO.Register.class) @RequestBody User dto) {
        return userService.save(dto);
    }

    @PutMapping("/update")
    public ResponseEntity<Message> update(@Validated(UserDTO.Modify.class) @RequestBody User dto) {
        return userService.update(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Message> delete(@PathVariable("id") Long id) {
        return userService.delete(id);
    }
}
