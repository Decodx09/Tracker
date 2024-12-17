const request = require('supertest');
const app = require('../index'); // Import the app from your server file

describe('GET /today-expenditure', () => {
    it('should return the money spent today', async () => {
        const response = await request(app).get('/today-expenditure');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('money_spent');
    });
});

describe('GET /travel', () => {
    it('should return travel expenses for today', async () => {
        const response = await request(app).get('/travel');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('Travel_expense');
    });
});

describe('GET /entertainment', () => {
    it('should return entertainment expenses for today', async () => {
        const response = await request(app).get('/entertainment');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('Entertainment_expense');
    });
});

describe('GET /food', () => {
    it('should return food expenses for today', async () => {
        const response = await request(app).get('/food');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('Food_expense');
    });
});

describe('GET /shopping', () => {
    it('should return shopping expenses for today', async () => {
        const response = await request(app).get('/shopping');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('Shopping_expense');
    });
});
