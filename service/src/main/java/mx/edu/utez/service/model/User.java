package mx.edu.utez.service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id//(nombre completo, correo electrónico y número de teléfono)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", columnDefinition = "VARCHAR(30)")
    private String nombre;

    @Column(name = "apellidos", columnDefinition = "VARCHAR(50)")
    private String apellidos;
    @Column(name = "correo_eletronico", columnDefinition = "VARCHAR(250)")
    private String correo_electronico;
    @Column(name = "num_telefono", columnDefinition = "VARCHAR(250)")
    private String telefono;

    public User() {
    }

    public User(Long id, String nombre, String apellidos, String correo_electronico, String telefono) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo_electronico = correo_electronico;
        this.telefono = telefono;
    }

    public User(String nombre, String apellidos, String correo_electronico, String telefono) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo_electronico = correo_electronico;
        this.telefono = telefono;
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

    public String getCorreo_electronico() {
        return correo_electronico;
    }

    public void setCorreo_electronico(String correo_electronico) {
        this.correo_electronico = correo_electronico;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
}
