export const updateUserById = `
UPDATE users SET 
    name = COALESCE($2, name),
    password = COALESCE($3, password),
    email = COALESCE($4, email)
WHERE id = $1 RETURNING id, name, email;
`;
