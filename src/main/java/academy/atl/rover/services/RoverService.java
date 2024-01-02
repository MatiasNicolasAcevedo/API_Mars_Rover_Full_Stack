package academy.atl.rover.services;

import academy.atl.rover.models.Rover;

public interface RoverService {

    public Rover get();

    public void sendCommand(String command);

    public void delete(Long id);

}
