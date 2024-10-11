
import User from '../models/User.js'; // Assurez-vous que ce modèle est défini
import bcrypt from 'bcrypt';
class UsersController {
   static async postNew(req, res) {
       const { email, password } = req.body;

       if (!email) return res.status(400).json({ error: 'Missing email' });
       if (!password) return res.status(400).json({ error: 'Missing password' });

       const existingUser = await User.findOne({ email });
       if (existingUser) return res.status(400).json({ error: 'Already exist' });

       import crypto from 'crypto';

	const password = 'mot_de_passe_utilisateur'; // Mot de passe à hacher
	const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

       const newUser = await User.create({ email, password: hashedPassword });

       res.status(201).json({ id: newUser._id, email: newUser.email });
   }
}

export default UsersController;
