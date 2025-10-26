import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

export class SQLiteDB {
  private db: Database | null = null;
  private readonly filePath: string;

  constructor(
    filePath: string = "/home/jayden/projects/on-the-record/backend/users.db"
  ) {
    this.filePath = filePath;
  }

  async connect(): Promise<void> {
    this.db = await open({
      filename: this.filePath,
      driver: sqlite3.Database,
    });
    console.log(`Connected to SQLite database at ${this.filePath}`);
  }

  async run(query: string, params: any[] = []): Promise<void> {
    if (!this.db) throw new Error("Database not connected");
    await this.db.run(query, params);
  }

  async get<T = any>(
    query: string,
    params: any[] = []
  ): Promise<T | undefined> {
    if (!this.db) throw new Error("Database not connected");
    return this.db.get<T>(query, params);
  }

  async all<T = any>(query: string, params: any[] = []): Promise<T[]> {
    if (!this.db) throw new Error("Database not connected");
    return this.db.all<T[]>(query, params);
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      console.log("Database connection closed");
    }
  }
}
