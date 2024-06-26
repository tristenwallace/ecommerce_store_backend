import { pool } from '../dbConfig/db';

export interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
}

export class ProductModel {
  async index(): Promise<Product[]> {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
  }

  async show(id: number): Promise<Product> {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);
    return rows[0];
  }

  async create(
    name: string,
    price: number,
    category?: string,
  ): Promise<Product> {
    const { rows } = await pool.query(
      'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *',
      [name, price, category],
    );
    return rows[0];
  }

  async delete(id: number): Promise<Product> {
    const { rows } = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id],
    );
    return rows[0];
  }

  async update(
    id: number,
    name: string,
    price: number,
    category?: string,
  ): Promise<Product> {
    const { rows } = await pool.query(
      'UPDATE products SET name = $2, price = $3, category = $4 WHERE id = $1 RETURNING *',
      [id, name, price, category],
    );
    return rows[0];
  }
}
