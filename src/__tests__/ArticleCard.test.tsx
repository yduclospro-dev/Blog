import { render, screen } from "@testing-library/react";
import ArticleCard from "@/components/ArticleCard";

describe("ArticleCard component", () => {
    it("affiche le titre et l'auteur d'un article", () => {
        const article = {
            id: 1,
            title: "Titre de test",
            author: "Auteur Test",
            date: "2025-10-09",
            content: "Contenu de test",
        };

        render(<ArticleCard article={article} />);

        expect(screen.getByText("Titre de test")).toBeInTheDocument();

        expect(screen.getByText(/Auteur Test/)).toBeInTheDocument();
    });
});
