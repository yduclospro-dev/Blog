# Architecture des Commentaires

## 📁 Structure

```
components/articles/comments/
├── containers/
│   ├── CommentFormContainer.tsx       # Logique du formulaire de commentaire
│   └── CommentsListContainer.tsx      # Logique de la liste des commentaires
├── presenters/
│   ├── CommentFormPresenter.tsx       # UI du formulaire (pure)
│   └── CommentsListPresenter.tsx      # UI de la liste (pure)
├── CommentForm.tsx                    # ⚠️ Obsolète - remplacé par Container/Presenter
└── CommentsList.tsx                   # ⚠️ Obsolète - remplacé par Container/Presenter
```

## 🏗️ Pattern Container/Presenter

### **Containers** (Logique métier)
- Gestion des états (useState)
- Gestion des effets (useEffect)
- Validation des données
- Appels aux handlers parents
- Calculs et transformations

### **Presenters** (UI pure)
- Affichage uniquement
- Pas de hooks (sauf useRef pour DOM)
- Reçoit tout via props
- Pas de logique métier
- Facilement testable

## 📦 Composants

### 1. CommentFormContainer
**Responsabilités :**
- Gérer le state `content` du formulaire
- Valider que le commentaire n'est pas vide
- Réinitialiser le formulaire après soumission
- Appeler `onSubmit` du parent avec le contenu

**Props :**
```typescript
interface CommentFormContainerProps {
    onSubmit: (content: string) => void;
}
```

**States :**
- `content: string` - Contenu du commentaire

**Handlers :**
- `handleInputChange(value: string)` - Met à jour le contenu
- `handleSubmit()` - Valide et soumet

---

### 2. CommentFormPresenter
**Responsabilités :**
- Afficher le titre "💬 Ajouter un commentaire"
- Afficher le Textarea avec placeholder
- Afficher le bouton "Publier"

**Props :**
```typescript
interface CommentFormPresenterProps {
    content: string;
    onInputChange: (value: string) => void;
    onSubmit: () => void;
}
```

**Aucun state, aucune logique**

---

### 3. CommentsListContainer
**Responsabilités :**
- Gérer l'édition d'un commentaire (`editingId`, `editContent`)
- Gérer la modale de suppression (`deleteConfirmId`)
- Bloquer le scroll quand la modale est ouverte (useEffect)
- Valider le contenu lors de l'édition
- Orchestrer tous les handlers (edit, delete, cancel)

**Props :**
```typescript
interface CommentsListContainerProps {
    comments: Comment[];
    currentUserId?: string;
    onDelete: (commentId: string) => void;
    onUpdate: (commentId: string, content: string) => void;
}
```

**States :**
- `editingId: string | null` - ID du commentaire en cours d'édition
- `editContent: string` - Contenu temporaire pendant l'édition
- `deleteConfirmId: string | null` - ID du commentaire à supprimer

**Handlers :**
- `handleStartEditing(comment)` - Démarre l'édition
- `handleCancelEditing()` - Annule l'édition
- `handleEditContentChange(value)` - Met à jour le contenu
- `handleSaveEdit(commentId)` - Valide et sauvegarde
- `handleShowDeleteConfirm(commentId)` - Affiche la modale
- `handleConfirmDelete()` - Confirme la suppression
- `handleCancelDelete()` - Annule la suppression

---

### 4. CommentsListPresenter
**Responsabilités :**
- Afficher "Aucun commentaire" si la liste est vide
- Afficher le titre avec le nombre de commentaires
- Afficher chaque commentaire avec auteur et date
- Afficher les boutons Edit/Delete pour l'auteur
- Afficher le mode édition avec Textarea
- Afficher la modale de confirmation

**Props :**
```typescript
interface CommentsListPresenterProps {
    comments: Comment[];
    currentUserId?: string;
    editingId: string | null;
    editContent: string;
    deleteConfirmId: string | null;
    onStartEditing: (comment: Comment) => void;
    onCancelEditing: () => void;
    onEditContentChange: (value: string) => void;
    onSaveEdit: (commentId: string) => void;
    onShowDeleteConfirm: (commentId: string) => void;
    onConfirmDelete: () => void;
    onCancelDelete: () => void;
}
```

**Aucun state, aucune logique métier**

---

## 🔄 Flux de données

### Ajout d'un commentaire :
```
ArticleDetailContainer
  └─> ArticleDetailPresenter
        └─> CommentFormContainer
              └─> CommentFormPresenter (UI)
```

### Édition/Suppression :
```
ArticleDetailContainer
  └─> ArticleDetailPresenter
        └─> CommentsListContainer
              └─> CommentsListPresenter (UI + ConfirmModal)
```

## ✅ Avantages de cette architecture

1. **Séparation des préoccupations** : Logique ↔️ UI
2. **Testabilité** : Presenters faciles à tester (snapshots)
3. **Réutilisabilité** : Presenters réutilisables avec différentes logiques
4. **Maintenabilité** : Changements UI n'affectent pas la logique
5. **Lisibilité** : Code plus court et focalisé

## 🎯 Règles à suivre

### ✅ Dans les Containers
- ✅ useState, useEffect, useRef
- ✅ Validation de données
- ✅ Appels aux stores/API
- ✅ Calculs complexes

### ❌ Dans les Presenters
- ❌ Pas de useState (sauf exceptions rares)
- ❌ Pas de useEffect
- ❌ Pas de logique métier
- ❌ Pas d'appels directs aux stores
- ⚠️ useRef OK uniquement pour manipulations DOM

## 📝 Exemples d'utilisation

### Dans ArticleDetailPresenter :
```tsx
import CommentFormContainer from "../comments/containers/CommentFormContainer";
import CommentsListContainer from "../comments/containers/CommentsListContainer";

// ...
<CommentFormContainer onSubmit={onAddComment} />

<CommentsListContainer
    comments={comments}
    currentUserId={currentUserId}
    onDelete={onDeleteComment}
    onUpdate={onUpdateComment}
/>
```

Les Containers gèrent toute la complexité, les Presenters affichent juste l'UI !
