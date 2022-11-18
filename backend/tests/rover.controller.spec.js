const request = require('supertest');
const app = require('../src/server');
const roverRepo = require('../src/data/repositories/roverRepository');

beforeAll(async () => {
    await roverRepo.clear();
});

afterAll(async () => {
    await roverRepo.clear();
});

describe('Rover Route - Integration Test', () => {
    const roverData1 = {
        plateauSize: '14 14',
        initialPosition: '3 3 E',
        instruction: 'MRRMMRMRRLLR',
    };

    const roverData2 = {
        plateauSize: '15 15',
        initialPosition: '5 6 W',
        instruction: 'MRRMMRMRR',
    };

    it('Endpoint POST /rover => Should be able to create new Rover.', async () => {
        const res = await request(app).post('/rover').send(roverData1);
        expect(res.statusCode).toEqual(201);
    });

    it('Endpoint POST /rover => Should be able to create a second rover with response: {"finalPosition": "6 5 N"}', async () => {
        const res = await request(app).post('/rover').send(roverData2);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('finalPosition');
        expect(res.body.finalPosition).toEqual('6 5 N');
    });

    it('Endpoint POST /rover => Should fail, because A rover cannot have the same final position of another one', async () => {
        const res = await request(app).post('/rover').send(roverData1);
        expect(res.statusCode).toEqual(401);
        expect(res.body.error.message).toEqual(
            'A rover cannot have the same final position of another one'
        );
    });

    it('Endpoint POST /rover => Should fail, because All input is required', async () => {
        const res = await request(app).post('/rover').send({
            plateauSize: '14 14',
            initialPosition: '3 3 E',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error.message).toEqual('All input is required');
    });

    it('Endpoint POST /rover => Should fail, because Input initialPosition must have this format: X Y Direction', async () => {
        const res = await request(app).post('/rover').send({
            plateauSize: '14 14',
            initialPosition: '3E',
            instruction: 'MRRMMRMRRLLR',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error.message).toEqual(
            'Input initialPosition must have this format: X Y Direction'
        );
    });

    it('Endpoint POST /rover => Should fail, because Input Direction only accepts (N, S, E, W)', async () => {
        const res = await request(app).post('/rover').send({
            plateauSize: '14 14',
            initialPosition: '3 3 F',
            instruction: 'MRRMMRMRRLLR',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error.message).toEqual(
            'Input Direction only accepts (N, S, E, W)'
        );
    });

    it('Endpoint POST /rover => Should fail, because Input plateauSize must have this format: X Y', async () => {
        const res = await request(app).post('/rover').send({
            plateauSize: '14',
            initialPosition: '3E',
            instruction: 'MRRMMRMRRLLR',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error.message).toEqual(
            'Input plateauSize must have this format: X Y'
        );
    });

    it('Endpoint POST /rover => Should fail, because Input instruction only accepts (R, L, M)', async () => {
        const res = await request(app).post('/rover').send({
            plateauSize: '10 10',
            initialPosition: '1 2 N',
            instruction: 'R  RRR',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error.message).toEqual(
            'Input instruction only accepts (R, L, M)'
        );
    });

    it('Endpoint POST /rover => Should fail, because Rover cannot reach out beyond Plateau size: 10 10', async () => {
        const res = await request(app).post('/rover').send({
            plateauSize: '10 10',
            initialPosition: '1 2 E',
            instruction: 'MMMMMMMMMMMMMMM',
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body.error.message).toEqual(
            'Rover cannot reach out beyond Plateau size: 10 10'
        );
    });

    it('Endpoint GET  /rover => Should return an array of rovers with 2 elements', async () => {
        const res = await request(app).get('/rover');
        expect(res.statusCode).toEqual(200);
        const rovers = res.body.data;
        expect(Array.isArray(rovers)).toBe(true);
        expect(rovers.length).toEqual(2);
    });

    it('Endpoint GET  /rover => Should return a response {"data", "total"}', async () => {
        const res = await request(app).get('/rover');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('total');
    });
});
