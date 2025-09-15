/**
 * Utility script to generate user data with hashed passwords
 * Run with: node scripts/generate-users.js
 */

const bcrypt = require('bcryptjs');

function generateUsers() {
  const users = [
    {
      id: 'demo-user-1',
      username: 'demo',
      passwordHash: bcrypt.hashSync('DemoPassword123', 10),
      role: 'customer'
    },
    {
      id: 'admin-user-1',
      username: 'admin', 
      passwordHash: bcrypt.hashSync('AdminPassword123', 10),
      role: 'admin'
    }
  ];

  console.log('Generated USERS_JSON:');
  console.log(JSON.stringify(users, null, 2));
  
  console.log('\nCopy this to your .env.local file:');
  console.log(`USERS_JSON=${JSON.stringify(users)}`);
}

generateUsers();
