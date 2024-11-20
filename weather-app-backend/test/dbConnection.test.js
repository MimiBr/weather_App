const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

jest.setTimeout(30000); 

describe('MongoDB Connection', () => {
  let mongoServer;

  // הפעלת שרת MongoDB זמני לפני הבדיקות
  beforeAll(async () => {
    try {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();

      // המתן לחיבור
      await mongoose.connect(uri);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error; // זרוק שגיאה אם החיבור נכשל
    }
  });

  // ניתוק החיבור וניקוי משאבים לאחר הבדיקות
  afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  test('should connect to MongoDB successfully', async () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 = מחובר
  });

  test('should fail to connect with invalid URI', async () => {
    const invalidUri = 'mongodb://invalid:27017/test';
    await expect(mongoose.connect(invalidUri)).rejects.toThrow();
  });
});
