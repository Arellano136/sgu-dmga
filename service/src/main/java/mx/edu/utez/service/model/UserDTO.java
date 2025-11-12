package mx.edu.utez.service.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UserDTO {

    @NotNull(groups = {Modify.class,ChangeStatus.class},message = "El id no puede ser nulo")
    private Long id;

    @NotBlank(groups = {Register.class,Modify.class},message = "El nombre no puede estar vacío")
    private String nombre;


    @NotBlank(groups = {Register.class,Modify.class},message = "El apellido no puede estar vacío")
    private String apellidos;

    @NotBlank(groups = {Register.class,Modify.class},message = "El correo eletronico no puede estar vacío")
    private String correo_eletronico;

    @NotBlank(groups = {Register.class,Modify.class},message = "El telefono no puede estar vacío")
    private String telefono;

    public UserDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCorreo_eletronico() {
        return correo_eletronico;
    }

    public void setCorreo_eletronico(String correo_eletronico) {
        this.correo_eletronico = correo_eletronico;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public interface Register{}
    public interface Modify{}
    public interface ChangeStatus{}
}
