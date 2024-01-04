package academy.atl.rover.services;

import academy.atl.rover.models.Direction;
import academy.atl.rover.models.Obstacle;
import academy.atl.rover.models.Rover;
import academy.atl.rover.repository.ObstacleRepository;
import academy.atl.rover.repository.RoverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoverServiceImp implements RoverService {

    private final RoverRepository repository;
    private final ObstacleRepository obstacleRepository;

    @Override
    public List<Rover> getAll() {
        return repository.findAll();
    }

    @Override
    public Rover getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Rover create(Rover rover) {
        // Aquí podrías realizar validaciones adicionales antes de guardar el rover en la base de datos, si es necesario.
        return repository.save(rover);
    }

    @Override
    public Rover update(Long id, Rover updatedRover) {
        Rover rover = repository.findById(id).orElse(null);
        if (rover != null) {
            rover.setX(updatedRover.getX());
            rover.setY(updatedRover.getY());
            rover.setDirection(updatedRover.getDirection());

            // Puedes actualizar más campos aquí según sea necesario.

            return repository.save(rover);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    /**
     * Recuperar el primer rover de una lista de rovers de una base de datos.
     */
    @Override
    public Rover get() {
        List<Rover> roverList = repository.findAll();
        return roverList.get(0);
    }

    /**
     * Permite enviar comandos al rover, como moverlo hacia adelante, hacia atrás o girarlo a la derecha o izquierda.
     * Y luego guarda el estado actualizado del rover después de ejecutar el comando.
     */
    @Override
    public void sendCommand(String command) {
        Rover rover = get();

        switch(command) {
            case "F": moveRover(rover, true); break;
            case "B": moveRover(rover, false); break;
            case "R": turnRover(rover, true); break;
            case "L": turnRover(rover, false); break;
        }
        repository.save(rover);
    }

    /**
     * Mueve el rover hacia adelante o hacia atrás en función de su dirección actual.
     * Verifica si la nueva posición es válida antes de actualizar la posición del rover.
     * @Variable displacement: Indica cuántas unidades debe moverse el rover en la dirección actual.
     */
    private void moveRover(Rover rover, boolean isForward) {
        int posXFinal = rover.getX();
        int posYFinal = rover.getY();
        Direction direction = rover.getDirection();
        int displacement = isForward ? direction.getValue() : -direction.getValue();

        if (Direction.EAST.equals(direction) || Direction.WEST.equals(direction)) {
            posXFinal -= displacement;
        }
        if (Direction.NORTH.equals(direction) || Direction.SOUTH.equals(direction)) {
            posYFinal -= displacement;
        }

        if (canMoveToThisPosition(posXFinal, posYFinal)) {
            rover.setX(posXFinal);
            rover.setY(posYFinal);
        }
    }

    /**
     * Verifica si un rover puede moverse a una posición específica sin chocar con obstáculos.
     * Compara las coordenadas de cada obstáculo con las coordenadas de destino.
     */
    private boolean canMoveToThisPosition(int posXFinal, int posYFinal) {
        List<Obstacle> obstacles = obstacleRepository.findAll();
        for (Obstacle obstacle : obstacles) {
            if (obstacle.getX() == posXFinal && obstacle.getY() == posYFinal) {
                return false;
            }
        }
        return true;
    }

    /**
     * Se utiliza para cambiar la dirección del rover.
     * Girándolo hacia la derecha o hacia la izquierda según el valor de isRight.
     * El nuevo valor de dirección se establece en el rover al final del método.
     */
    private void turnRover(Rover rover, boolean isRight) {
        Direction direction = rover.getDirection();
        Direction finalDirection = null;

        if (isRight) {
            switch (direction) {
                case NORTH: finalDirection = Direction.EAST; break;
                case EAST: finalDirection = Direction.SOUTH; break;
                case SOUTH: finalDirection = Direction.WEST; break;
                case WEST: finalDirection = Direction.NORTH; break;
            }
        } else {
            switch (direction) {
                case NORTH: finalDirection = Direction.WEST; break;
                case WEST: finalDirection = Direction.SOUTH; break;
                case SOUTH: finalDirection = Direction.EAST; break;
                case EAST: finalDirection = Direction.NORTH; break;
            }
        }
        rover.setDirection(finalDirection);
    }

}
