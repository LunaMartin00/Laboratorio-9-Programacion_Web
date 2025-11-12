import pkg from 'pg';
const { Pool } = pkg;

// Configuración de la conexión a la base de datos
export const pool = new Pool({
  user: process.env.DB_USER || 'neondb_owner',
  host: process.env.DB_HOST || 'ep-curly-sound-ahcrxe5b-pooler.c-3.us-east-1.aws.neon.tech',
  database: process.env.DB_NAME || 'neondb',
  password: process.env.DB_PASSWORD || 'npg_WUmQdXwNZ2f6',
  port: 5432,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20, // máximo número de clientes en el pool
  idleTimeoutMillis: 30000, // cierra clientes inactivos después de 30 segundos
  connectionTimeoutMillis: 2000, // retorna error después de 2 segundos si no puede conectar
});

// Manejo de eventos del pool
pool.on('connect', () => {
  console.log('🟢 Conectado a la base de datos PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error en el pool de conexiones:', err);
});

// Función para probar la conexión
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexión a la base de datos establecida correctamente');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    return false;
  }
};

export default pool;