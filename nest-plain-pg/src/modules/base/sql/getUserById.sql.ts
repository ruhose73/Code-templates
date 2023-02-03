export const getUserById = `
 SELECT id, name, email FROM users WHERE id = $1;
 `;
