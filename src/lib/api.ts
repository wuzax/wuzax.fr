const API_URL = "https://wuzax.fr/api";

export async function fetchProjects() {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
}

export async function createProject(project: any) {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error("Failed to create project");
  return response.json();
}

export async function updateProject(id: string, project: any) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error("Failed to update project");
  return response.json();
}

export async function deleteProject(id: string) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete project");
  return response.json();
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error("Invalid credentials");
  return response.json();
}
