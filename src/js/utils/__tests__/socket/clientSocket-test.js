jest.autoMockOff();

import ClientSocket from '../../socket/clientSocket';

describe('ClientSocket', () => {

  let clientSocket;

  beforeEach(() => {
    this.clientSocket = new ClientSocket();
  });

  it('init a client socket', () => {
    let message = "hello";
    this.clientSocket.send(message);
    //expect(this.clientSocket.send).toBeCalledWith(message);
  });
});
