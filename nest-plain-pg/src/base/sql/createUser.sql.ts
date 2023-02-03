import { CreateUserDto } from '../dto';

export const createUser = (dto: CreateUserDto) => `
INSERT INTO users (name, password, email)
 SELECT '${dto.name}', '${dto.password}', '${dto.email}'
 WHERE NOT EXISTS (
    SELECT null FROM users 
    WHERE (name) = ('${dto.name}') OR (email) = ('${dto.email}')
 ) RETURNING id, name, email;
`;
