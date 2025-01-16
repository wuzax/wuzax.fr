import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, LogOut } from 'lucide-react';
import { useAuth, useProjects } from '../lib/store';

const Admin = () => {
  const { isAuthenticated, logout } = useAuth();
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    demoLink: '',
    githubLink: '',
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies.split(',').map((tech) => tech.trim()),
      image: formData.image,
      links: {
        demo: formData.demoLink,
        github: formData.githubLink,
      },
    };

    if (editingProject !== null) {
      updateProject(editingProject, projectData);
    } else {
      addProject(projectData);
    }

    setFormData({
      title: '',
      description: '',
      technologies: '',
      image: '',
      demoLink: '',
      githubLink: '',
    });
    setEditingProject(null);
  };

  const handleEdit = (project: any) => {
    setEditingProject(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      image: project.image,
      demoLink: project.links.demo || '',
      githubLink: project.links.github || '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Administration des projets</h1>
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingProject !== null ? 'Modifier le projet' : 'Ajouter un projet'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Technologies (séparées par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md dark:text-white"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md dark:text-white"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Lien
                </label>
                <input
                  type="url"
                  value={formData.demoLink}
                  onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Lien GitHub
                </label>
                <input
                  type="url"
                  value={formData.githubLink}
                  onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md dark:text-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              {editingProject !== null ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Projets existants</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-md"
              >
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-md transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;