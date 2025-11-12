import { pool, testConnection } from './database.js';

async function testDatabase() {
  console.log('🧪 Probando conexión a la base de datos...');
  
  // Probar conexión
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('❌ No se pudo conectar a la base de datos');
    process.exit(1);
  }

  try {
    // Probar consulta de usuarios
    console.log('📊 Consultando usuarios...');
    const result = await pool.query('SELECT * FROM users LIMIT 5');
    
    console.log('✅ Consulta exitosa:');
    console.log(`📋 Número de usuarios encontrados: ${result.rows.length}`);
    
    if (result.rows.length > 0) {
      console.log('👥 Usuarios:');
      result.rows.forEach((user, index) => {
        console.log(`  ${index + 1}. ID: ${user.id}, Nombre: ${user.name}, Email: ${user.email}`);
      });
    } else {
      console.log('ℹ️ No hay usuarios en la base de datos');
    }
    
  } catch (error) {
    console.error('❌ Error en la consulta:', error.message);
  } finally {
    // Cerrar el pool de conexiones
    await pool.end();
    console.log('🔒 Conexiones cerradas');
  }
}

// Ejecutar la prueba
testDatabase();