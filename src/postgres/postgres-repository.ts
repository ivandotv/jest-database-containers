import type { Pool } from 'pg'

export type User = {
  name: string
  email: string
  lastName: string
}
export class PostgresRepository {
  constructor(protected pool: Pool) {}

  async getUserByEmail(email: string) {
    const result = await this.pool.query<User>(
      'SELECT * FROM Users WHERE EMAIL = $1',
      [email]
    )

    if (result.rowCount) {
      return result.rows[0]
    }

    return undefined
  }

  async createUser({
    name,
    lastName,
    email
  }: {
    name: string
    lastName: string
    email: string
  }) {
    const result = await this.pool.query<User>(
      'INSERT INTO Users(FIRST_NAME,LAST_NAME,EMAIL) VALUES($1,$2,$3) RETURNING *',
      [name, lastName, email]
    )

    if (result.rowCount) {
      return result.rows[0]
    }

    return undefined
  }

  async getAllUsers() {
    const result = await this.pool.query<User>('Select * from Users')

    return result.rows
  }
}
