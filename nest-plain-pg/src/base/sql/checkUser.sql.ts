export const checkUser = `
 SELECT COUNT(*) FROM (
    SELECT * FROM users WHERE id <> $3
    ) as foo 
  WHERE name = $1 OR email = $2;
 `;
