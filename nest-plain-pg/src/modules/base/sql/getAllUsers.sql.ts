export const getAllUsers = `
 SELECT id, name, email FROM users LIMIT $1 OFFSET $2`;
