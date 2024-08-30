import request from 'supertest';
import app from '../src/app';

describe('Room API Tests', () => {
  let roomId: string;

  // Teste para criar uma nova sala com horários
  it('Deve criar uma nova sala com horários', async () => {
    const newRoom = {
      link: 'https://example.com/room456',
      times: [
        { date: '2024-09-02T00:00:00.000Z', start: '2024-09-02T00:00:00.000Z', end: '2024-09-02T00:00:00.000Z' },
        { date: '2024-09-03T00:00:00.000Z', start: '2024-09-03T00:00:00.000Z', end: '2024-09-03T00:00:00.000Z' }
      ]
    };

    const res = await request(app)
      .post('/api/room')
      .send(newRoom);

    expect(res.statusCode).toBe(201);  // Verifica se o status é 201 (Criado)
    expect(res.body).toHaveProperty('roomId');  // Verifica se a resposta contém o ID da sala
    expect(res.body).toHaveProperty('link', newRoom.link);  // Verifica se o link corresponde ao enviado
    expect(res.body).toHaveProperty('createdAt');  // Verifica se a resposta contém createdAt
    expect(res.body).toHaveProperty('updatedAt');  // Verifica se a resposta contém updatedAt
    expect(res.body).toHaveProperty('Time');  // Verifica se a resposta contém a lista de horários

    // Armazena o roomId gerado para uso nos próximos testes
    roomId = res.body.roomId;

    // Verifica se a lista de horários contém os elementos corretos
    expect(res.body.Time).toHaveLength(2);
    res.body.Time.forEach((time: any, index: number) => {
      expect(time).toHaveProperty('timeId');  // Verifica se cada horário tem um timeId
      expect(new Date(time.date).toISOString()).toBe(newRoom.times[index].date);  // Compara as datas corretamente
      expect(time).toHaveProperty('start', newRoom.times[index].start);
      expect(time).toHaveProperty('end', newRoom.times[index].end);
      expect(time).toHaveProperty('roomId', roomId);  // Verifica se o roomId corresponde ao gerado
    });
  });

  // Teste para obter a sala criada
  it('Deve retornar a sala criada', async () => {
    const res = await request(app).get(`/api/room/${roomId}`);

    expect(res.statusCode).toBe(200);  // Verifica se a requisição teve sucesso
    expect(res.body).toHaveProperty('roomId', roomId);  // Verifica se o ID corresponde ao gerado
    expect(res.body).toHaveProperty('link', 'https://example.com/room456');  // Verifica se o link está correto
    expect(res.body).toHaveProperty('createdAt');  // Verifica se a resposta contém createdAt
    expect(res.body).toHaveProperty('updatedAt');  // Verifica se a resposta contém updatedAt
    expect(res.body).toHaveProperty('Time');  // Verifica se a resposta contém a lista de horários

    // Verifica se a lista de horários contém os elementos corretos
    expect(res.body.Time).toHaveLength(2);
    res.body.Time.forEach((time: any) => {
      expect(time).toHaveProperty('timeId');  // Verifica se cada horário tem um timeId
      expect(time).toHaveProperty('date');  // Verifica se cada horário tem uma data
      expect(time).toHaveProperty('start');  // Verifica se cada horário tem um start time
      expect(time).toHaveProperty('end');  // Verifica se cada horário tem um end time
      expect(time).toHaveProperty('roomId', roomId);  // Verifica se o roomId corresponde ao gerado
    });
  });

  // Teste para excluir a sala criada
  it('Deve excluir a sala criada', async () => {
    const res = await request(app).delete(`/api/room/${roomId}`);

    expect(res.statusCode).toBe(204);  // Aceita o status 204 para exclusão
  });

  // Teste para verificar que a sala foi excluída
  it('Deve retornar 404 ao tentar obter uma sala que foi excluída', async () => {
    const res = await request(app).get(`/api/room/${roomId}`);

    expect(res.statusCode).toBe(404);  // Verifica se o status retornado é 404 (não encontrado)
  });
});
