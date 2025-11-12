package mx.edu.utez.service.control;

import mx.edu.utez.service.model.User;
import mx.edu.utez.service.model.UserRepository;
import mx.edu.utez.service.utils.Message;
import mx.edu.utez.service.utils.TypesResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findAll() {
        List<User> users = repo.findAll();
        logger.info("La búsqueda ha sido realizada correctamente");
        return new ResponseEntity<>(new Message(users,"Listado de usuarios", TypesResponse.SUCCESS), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findById(Long id) {
        Optional<User> userOptional = repo.findById(id);
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(new Message("El usuario no existe", TypesResponse.WARNING), HttpStatus.NOT_FOUND);
        }
        logger.info("Usuario encontrado correctamente");
        return new ResponseEntity<>(new Message(userOptional.get(), "Usuario encontrado", TypesResponse.SUCCESS), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> save(User dto) {
        if(dto.getNombre().length() > 30) {
            return new ResponseEntity<>(new Message("El nombre excede el número de caracteres",TypesResponse.WARNING),HttpStatus.BAD_REQUEST);
        }
        if(dto.getApellidos().length() > 50) {
            return new ResponseEntity<>(new Message("Los apellidos exceden el número de caracteres",TypesResponse.WARNING),HttpStatus.BAD_REQUEST);
        }
        if(dto.getCorreo_electronico().length() > 255) {
            return new ResponseEntity<>(new Message("El correo electrónico excede el número de caracteres",TypesResponse.WARNING),HttpStatus.BAD_REQUEST);
        }
        if(dto.getTelefono().length() > 50) {
            return new ResponseEntity<>(new Message("El número de teléfono excede el número de caracteres",TypesResponse.WARNING),HttpStatus.BAD_REQUEST);
        }

        User user = new User(dto.getNombre(),dto.getApellidos(),dto.getCorreo_electronico(),dto.getTelefono());
        user = repo.saveAndFlush(user);
        if(user == null){
            return new ResponseEntity<>(new Message("El usuario no se registró",TypesResponse.ERROR),HttpStatus.BAD_REQUEST);
        }
        logger.info("El registro ha sido realizado correctamente");
        return new ResponseEntity<>(new Message(user,"El usuario se registró correctamente",TypesResponse.SUCCESS),HttpStatus.CREATED);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> update(User dto) {
        Optional<User> userOptional = repo.findById(dto.getId());
        if(!userOptional.isPresent()){
            return new ResponseEntity<>(new Message("El usuario no existe",TypesResponse.ERROR),HttpStatus.NOT_FOUND);
        }
        if(dto.getNombre().length() > 30) {
            return new ResponseEntity<>(new Message("El nombre excede el número de caracteres",TypesResponse.WARNING),HttpStatus.BAD_REQUEST);
        }
        if(dto.getApellidos().length() > 50) {
            return new ResponseEntity<>(new Message("Los apellidos exceden el número de caracteres",TypesResponse.WARNING),HttpStatus.BAD_REQUEST);
        }
        if(dto.getCorreo_electronico().length() > 255) {
            return new ResponseEntity<>(new Message("El correo electrónico excede el número de caracteres",TypesResponse.WARNING),HttpStatus.BAD_REQUEST);
        }
        if(dto.getTelefono().length() > 50) {
            return new ResponseEntity<>(new Message("El número de teléfono excede el número de caracteres",TypesResponse.WARNING),HttpStatus.BAD_REQUEST);
        }

        User user1 = userOptional.get();
        user1.setNombre(dto.getNombre());
        user1.setApellidos(dto.getApellidos());
        user1.setCorreo_electronico(dto.getCorreo_electronico());
        user1.setTelefono(dto.getTelefono());
        user1 = repo.saveAndFlush(user1);

        if(user1 == null){
            return new ResponseEntity<>(new Message("El usuario no se actualizó",TypesResponse.ERROR),HttpStatus.BAD_REQUEST);
        }
        logger.info("La actualización ha sido realizada correctamente");
        return new ResponseEntity<>(new Message(user1,"El usuario se actualizó correctamente",TypesResponse.SUCCESS),HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> delete(Long id) {
        Optional<User> userOptional = repo.findById(id);
        if(!userOptional.isPresent()){
            return new ResponseEntity<>(new Message("El usuario no existe", TypesResponse.ERROR), HttpStatus.NOT_FOUND);
        }

        try {
            repo.delete(userOptional.get());
            logger.info("El usuario se eliminó correctamente");
            return new ResponseEntity<>(new Message("El usuario fue eliminado correctamente", TypesResponse.SUCCESS), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error al eliminar el usuario", e);
            return new ResponseEntity<>(new Message("No se pudo eliminar el usuario", TypesResponse.ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
