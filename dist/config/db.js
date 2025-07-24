"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.database = void 0;
const client_1 = require("@prisma/client");
class Database {
    constructor() {
        this.prisma = new client_1.PrismaClient({
            log: ['query', 'warn', 'error'],
        });
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async connect() {
        try {
            await this.prisma.$connect();
            console.log('Database connected successfully');
        }
        catch (error) {
            console.log('Database connection failed:', error);
            throw error;
        }
    }
    async disconnect() {
        try {
            await this.prisma.$disconnect();
            console.log('Database disconnected successfully');
        }
        catch (error) {
            console.log('Database disconnection failed:', error);
            throw error;
        }
    }
}
exports.database = Database.getInstance();
exports.prisma = exports.database.prisma;
