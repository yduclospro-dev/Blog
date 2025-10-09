import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Découvrez des histoires <br />
            <span className="text-sky-500">qui vous inspirent</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté de passionnés et partagez vos idées avec le monde entier
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registration" className="bg-sky-500 text-white px-8 py-4 rounded-lg hover:bg-sky-600 transition shadow-lg text-lg font-medium">
              Commencer gratuitement
            </Link>
            <button className="border-2 border-sky-500 text-sky-500 px-8 py-4 rounded-lg hover:bg-sky-50 transition text-lg font-medium">
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
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group flex flex-col">
            <div className="h-48 bg-gradient-to-br from-sky-400 to-blue-500"></div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xs font-medium text-sky-500 bg-sky-50 px-3 py-1 rounded-full">Technologie</span>
                <span className="text-sm text-gray-500">5 min de lecture</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-500 transition">
                L'avenir de l'intelligence artificielle
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Explorez comment l'IA transforme notre quotidien et façonne le monde de demain
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-medium">Marie Dubois</span>
                </div>
                <span className="text-sm text-gray-500">Il y a 2 jours</span>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group flex flex-col">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500"></div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xs font-medium text-sky-500 bg-sky-50 px-3 py-1 rounded-full">Design</span>
                <span className="text-sm text-gray-500">8 min de lecture</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-500 transition">
                Les principes du design minimaliste
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Découvrez comment créer des interfaces élégantes et efficaces avec moins d'éléments
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-medium">Thomas Martin</span>
                </div>
                <span className="text-sm text-gray-500">Il y a 3 jours</span>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group flex flex-col">
            <div className="h-48 bg-gradient-to-br from-green-400 to-teal-500"></div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xs font-medium text-sky-500 bg-sky-50 px-3 py-1 rounded-full">Lifestyle</span>
                <span className="text-sm text-gray-500">6 min de lecture</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-500 transition">
                10 habitudes pour une vie équilibrée
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Des conseils pratiques pour améliorer votre bien-être au quotidien
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
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
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Écrire librement</h3>
            <p className="text-gray-600">
              Un éditeur simple et puissant pour donner vie à vos idées en quelques clics
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Communauté active</h3>
            <p className="text-gray-600">
              Échangez avec des milliers de lecteurs et écrivains passionnés
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="bg-gradient-to-r from-sky-500 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à partager vos histoires ?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Rejoignez des milliers d'écrivains et commencez votre aventure dès aujourd'hui
          </p>
          <Link href="/registration" className="inline-block bg-white text-sky-500 px-8 py-4 rounded-lg hover:bg-gray-50 transition shadow-lg text-lg font-medium">
            Créer mon compte gratuitement
          </Link>
        </div>
      </section>
    </div>
  );
}