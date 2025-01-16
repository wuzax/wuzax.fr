import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import * as api from './api';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  links: {
    demo?: string;
    github?: string;
  };
}

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (project: Omit<Project, '_id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'theme-storage' }
  )
);

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: !!Cookies.get('auth'),
  login: async (username, password) => {
    try {
      await api.login(username, password);
      Cookies.set('auth', 'true', { expires: 1 });
      set({ isAuthenticated: true });
      return true;
    } catch (error) {
      return false;
    }
  },
  logout: () => {
    Cookies.remove('auth');
    set({ isAuthenticated: false });
  },
}));

export const useProjects = create<ProjectState>((set) => ({
  projects: [],
  loading: false,
  error: null,
  fetchProjects: async () => {
    set({ loading: true });
    try {
      console.log('Fetching projects...');
      const projects = await api.fetchProjects();
      console.log('Received projects:', projects);
      set({ projects, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching projects:', error);
      set({ error: 'Failed to fetch projects', loading: false });
    }
  },
  addProject: async (project) => {
    try {
      const newProject = await api.createProject(project);
      set((state) => ({
        projects: [...state.projects, newProject],
        error: null,
      }));
    } catch (error) {
      set({ error: 'Failed to add project' });
    }
  },
  updateProject: async (id, project) => {
    try {
      console.log('Updating project with ID:', id);
      console.log('Update data:', project);
      const updatedProject = await api.updateProject(id, project);
      console.log('Server response:', updatedProject);
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === id ? updatedProject : p
        ),
        error: null,
      }));
      console.log('State updated successfully');
    } catch (error) {
      console.error('Error updating project:', error);
      set({ error: 'Failed to update project' });
    }
  },
  deleteProject: async (id) => {
    try {
      await api.deleteProject(id);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
        error: null,
      }));
    } catch (error) {
      set({ error: 'Failed to delete project' });
    }
  },
}));