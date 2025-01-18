import { motion } from "framer-motion";
import { Bot, Box } from "lucide-react";
import SkillBar from "../components/SkillBar";

const Home = () => {
  const skills = [
    { name: "Node.js", percentage: 70 },
    { name: "JavaScript", percentage: 60 },
    { name: "Discord.js", percentage: 95 },
    { name: "Discord-JDA", percentage: 20 },
    { name: "Java", percentage: 45 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8 md:space-y-12"
      >
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Développeur Spécialisé
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Bots Discord & Plugins Minecraft
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <Bot className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 dark:text-white">
              Bots Discord
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Création de bots Discord personnalisés avec des fonctionnalités
              avancées, notamment pour la gestion de musique et l'administration
              de serveur.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <Box className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 dark:text-white">
              Plugins Minecraft
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Développement de plugins Minecraft sur mesure pour améliorer
              l'expérience de jeu et ajouter des fonctionnalités uniques.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 dark:text-white">
            Compétences Techniques
          </h2>
          {skills.map((skill) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
