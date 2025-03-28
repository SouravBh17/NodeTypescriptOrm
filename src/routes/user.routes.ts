import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

const router = Router();

// Create User
router.post('/', async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const userRepository = AppDataSource.getRepository(User);
        const newUser = userRepository.create({ name, email });
        await userRepository.save(newUser);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Get All Users
router.get('/', async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update User
router.put('/:id', async (req: Request, res: Response): Promise<any> =>  {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.update(id, { name, email });
        const updatedUser = await userRepository.findOneBy({ id: parseInt(id) });
        if (!updatedUser) return res.status(404).send('User not found');
        res.json(updatedUser);
        return;
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete User
router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
        const userRepository = AppDataSource.getRepository(User);
        const result = await userRepository.delete(id);
        if (result.affected === 0) return res.status(404).send('User not found');
        res.send('User deleted successfully');
        return;
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
