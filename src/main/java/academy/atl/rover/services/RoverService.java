package academy.atl.rover.services;

import academy.atl.rover.models.Rover;
import java.util.List;

public interface RoverService {

    Rover get();

    public void sendCommand(String command);

    List<Rover> getAll(); // Método para obtener todos los Rovers

    Rover getById(Long id); // Método para obtener un Rover por su ID

    Rover create(Rover rover); // Método para crear un nuevo Rover

    Rover update(Long id, Rover updatedRover); // Método para actualizar un Rover existente

    void delete(Long id); // Método para eliminar un Rover por su ID
}
