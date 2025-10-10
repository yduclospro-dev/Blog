import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Gradient Backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-sky-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-400/15 to-pink-600/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-teal-400/20 to-green-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-sky-500/10 backdrop-blur-sm border border-sky-500/20 rounded-full">
              <span className="text-sky-600 text-sm font-medium">✨ Plateforme de blogging nouvelle génération</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Découvrez des histoires <br />
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">qui vous inspirent</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Rejoignez notre communauté de passionnés et partagez vos idées avec le monde entier
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registration" className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-sky-600 hover:to-blue-700 transition shadow-xl shadow-sky-500/30 text-lg font-semibold backdrop-blur-sm">
                Commencer gratuitement
              </Link>
              <button className="bg-white/60 backdrop-blur-md border border-gray-200 text-gray-900 px-8 py-4 rounded-xl hover:bg-white/80 transition text-lg font-semibold">
                Explorer les articles
              </button>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Articles en vedette</h2>
            <p className="text-xl text-gray-600">Découvrez les articles les plus populaires de notre communauté</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl overflow-hidden hover:bg-white/80 hover:border-gray-300 transition group flex flex-col shadow-lg">
              <div className="h-48 bg-gradient-to-br from-sky-400 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs font-medium text-sky-600 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full backdrop-blur-sm">Technologie</span>
                  <span className="text-sm text-gray-500">5 min de lecture</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition">
                  L'avenir de l'intelligence artificielle
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Explorez comment l'IA transforme notre quotidien et façonne le monde de demain
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">Marie Dubois</span>
                  </div>
                  <span className="text-sm text-gray-500">Il y a 2 jours</span>
                </div>
              </div>
            </article>

            <article className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl overflow-hidden hover:bg-white/80 hover:border-gray-300 transition group flex flex-col shadow-lg">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs font-medium text-purple-600 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full backdrop-blur-sm">Design</span>
                  <span className="text-sm text-gray-500">8 min de lecture</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                  Les principes du design minimaliste
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Découvrez comment créer des interfaces élégantes et efficaces avec moins d'éléments
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">Thomas Martin</span>
                  </div>
                  <span className="text-sm text-gray-500">Il y a 3 jours</span>
                </div>
              </div>
            </article>

            <article className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl overflow-hidden hover:bg-white/80 hover:border-gray-300 transition group flex flex-col shadow-lg">
              <div className="h-48 bg-gradient-to-br from-green-400 to-teal-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs font-medium text-green-600 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full backdrop-blur-sm">Lifestyle</span>
                  <span className="text-sm text-gray-500">6 min de lecture</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition">
                  10 habitudes pour une vie équilibrée
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Des conseils pratiques pour améliorer votre bien-être au quotidien
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">Sophie Laurent</span>
                  </div>
                  <span className="text-sm text-gray-500">Il y a 5 jours</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir BlogHub ?</h2>
            <p className="text-xl text-gray-600">Tous les outils dont vous avez besoin pour réussir</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-xl border border-gray-200 p-8 rounded-2xl hover:bg-white/80 hover:border-gray-300 transition shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-sky-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Écrire librement</h3>
              <p className="text-gray-600">
                Un éditeur simple et puissant pour donner vie à vos idées en quelques clics
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-gray-200 p-8 rounded-2xl hover:bg-white/80 hover:border-gray-300 transition shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Communauté active</h3>
              <p className="text-gray-600">
                Échangez avec des milliers de lecteurs et écrivains passionnés
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-gray-200 p-8 rounded-2xl hover:bg-white/80 hover:border-gray-300 transition shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Statistiques détaillées</h3>
              <p className="text-gray-600">
                Suivez la performance de vos articles et comprenez votre audience
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/15 to-blue-600/15 backdrop-blur-3xl"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Prêt à partager vos histoires ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Rejoignez des milliers d'écrivains et commencez votre aventure dès aujourd'hui
            </p>
            <Link href="/registration" className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-sky-600 hover:to-blue-700 transition shadow-2xl shadow-sky-500/30 text-lg font-semibold">
              Créer mon compte gratuitement
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}