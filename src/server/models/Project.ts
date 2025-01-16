import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
  }],
  image: {
    type: String,
    required: true,
  },
  links: {
    demo: String,
    github: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

projectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Définition de l'interface pour le modèle Project
export interface IProject extends mongoose.Document {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  links: {
    demo?: string;
    github?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Export du modèle avec son interface
export const Project = mongoose.model<IProject>('Project', projectSchema);