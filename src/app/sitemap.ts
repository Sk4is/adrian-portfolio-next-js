import { getPosts } from "@/app/utils/utils"; // Si ya no usas getPosts, puedes eliminar esta importación
import { baseURL, routes as routesConfig } from "@/app/resources";

export default async function sitemap() {
  // Solo obtendremos los posts de la carpeta de trabajos (proyectos)
  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route]);

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  // Retorna solo las rutas activas y los trabajos (proyectos)
  return [...routes, ...works];
}
