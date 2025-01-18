import { motion } from "framer-motion";
import { MessageCircle, Shield, Sparkles, Users } from "lucide-react";

const Contact = () => {
  const discordInviteLink = "https://dsc.gg/wuzax";

  const features = [
    {
      icon: Users,
      title: "Communauté Active",
      description:
        "Rejoignez plusieurs passionnés de développement et de gaming",
    },
    {
      icon: Shield,
      title: "Support Premium",
      description:
        "Assistance prioritaire et accès aux fonctionnalités exclusives",
    },
    {
      icon: Sparkles,
      title: "Avant-Première",
      description: "Testez les nouvelles fonctionnalités avant tout le monde",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              Rejoignez l'Aventure
            </h1>
            <p className="text-gray-400 text-lg">
              Découvrez une communauté passionnée de développeurs et de gamers
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-gray-900/50 pointer-events-none" />

          <div className="relative p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div className="text-center md:text-left">
                <MessageCircle className="w-16 h-16 text-blue-400 mb-4 mx-auto md:mx-0" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Discord Officiel
                </h2>
                <p className="text-blue-300 text-lg max-w-md">
                  Le meilleur endroit pour échanger, apprendre et contribuer
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-700/50 hover:border-blue-500/50 transition-colors group"
                >
                  <feature.icon className="w-10 h-10 text-blue-400 mb-4 group-hover:text-blue-300 transition-colors" />
                  <h3 className="font-bold text-xl mb-2 text-white group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <a
                href={discordInviteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                Rejoindre le Discord
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-gray-400 text-lg">
            Rejoignez-nous dès maintenant et faites partie d'une communauté en
            pleine croissance !
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
