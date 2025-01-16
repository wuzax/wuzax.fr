import express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Tentative de connexion pour:', username);
    console.log('Mot de passe reçu:', password);
    
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Utilisateur trouvé, mot de passe en base:', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Résultat de la comparaison du mot de passe:', isMatch);
    
    if (!isMatch) {
      console.log('Mot de passe incorrect');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Connexion réussie');
    res.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;