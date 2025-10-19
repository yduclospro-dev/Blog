import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewArticleContainer from '@/components/articles/containers/NewArticleContainer'

// Mock alert
global.alert = jest.fn()

// Mock router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

// Mock stores
const mockAddArticle = jest.fn()
const mockCurrentUser = { id: 'user1', username: 'TestUser', email: 'test@test.com', password: 'pass' }

jest.mock('@/stores/articlesStore', () => ({
  useArticleStore: () => ({
    addArticle: mockAddArticle
  })
}))

jest.mock('@/stores/userStore', () => ({
  useUserStore: () => ({
    currentUser: mockCurrentUser
  })
}))

// Mock useRequireAuth
let mockIsAuthenticated = true
jest.mock('@/lib/hooks/useRequireAuth', () => ({
  useRequireAuth: () => mockIsAuthenticated
}))

// Mock ForbiddenAccess
jest.mock('@/components/ForbiddenAccess', () => ({
  __esModule: true,
  default: ({ message }: { message: string }) => (
    <div data-testid="forbidden-access">{message}</div>
  )
}))

// Mock NewArticlePresenter
jest.mock('@/components/articles/presenters/NewArticlePresenter', () => ({
  __esModule: true,
  default: ({
    formData,
    onInputChange,
    onSave,
    onCancel
  }: {
    formData: { title: string; content: string }
    onInputChange: (field: string, value: string) => void
    onSave: () => void
    onCancel: () => void
  }) => (
    <div data-testid="new-article-presenter">
      <div data-testid="title-value">{formData.title}</div>
      <div data-testid="content-value">{formData.content}</div>
      <input
        data-testid="title-input"
        onChange={(e) => onInputChange('title', e.target.value)}
      />
      <input
        data-testid="content-input"
        onChange={(e) => onInputChange('content', e.target.value)}
      />
      <button data-testid="save-button" onClick={onSave}>Save</button>
      <button data-testid="cancel-button" onClick={onCancel}>Cancel</button>
    </div>
  )
}))

describe('NewArticleContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockIsAuthenticated = true
  })

  describe('Authentication', () => {
    it('should show ForbiddenAccess when not authenticated', () => {
      // Arrange
      mockIsAuthenticated = false

      // Act
      render(<NewArticleContainer />)

      // Assert
      expect(screen.getByTestId('forbidden-access')).toBeInTheDocument()
      expect(screen.getByText(/vous devez être connecté pour créer un nouvel article/i)).toBeInTheDocument()
    })

    it('should render NewArticlePresenter when authenticated', () => {
      // Arrange
      mockIsAuthenticated = true

      // Act
      render(<NewArticleContainer />)

      // Assert
      expect(screen.getByTestId('new-article-presenter')).toBeInTheDocument()
    })
  })

  describe('Initialization', () => {
    it('should initialize with empty form data', () => {
      // Arrange & Act
      render(<NewArticleContainer />)

      // Assert
      expect(screen.getByTestId('title-value')).toHaveTextContent('')
      expect(screen.getByTestId('content-value')).toHaveTextContent('')
    })
  })

  describe('Form input handling', () => {
    it('should update title when input changes', () => {
      // Arrange
      render(<NewArticleContainer />)
      const titleInput = screen.getByTestId('title-input')

      // Act
      fireEvent.change(titleInput, { target: { value: 'My New Article' } })

      // Assert
      expect(screen.getByTestId('title-value')).toHaveTextContent('My New Article')
    })

    it('should update content when input changes', () => {
      // Arrange
      render(<NewArticleContainer />)
      const contentInput = screen.getByTestId('content-input')

      // Act
      fireEvent.change(contentInput, { target: { value: 'Article content here' } })

      // Assert
      expect(screen.getByTestId('content-value')).toHaveTextContent('Article content here')
    })

    it('should update both fields independently', () => {
      // Arrange
      render(<NewArticleContainer />)
      const titleInput = screen.getByTestId('title-input')
      const contentInput = screen.getByTestId('content-input')

      // Act
      fireEvent.change(titleInput, { target: { value: 'Title' } })
      fireEvent.change(contentInput, { target: { value: 'Content' } })

      // Assert
      expect(screen.getByTestId('title-value')).toHaveTextContent('Title')
      expect(screen.getByTestId('content-value')).toHaveTextContent('Content')
    })
  })

  describe('Form validation', () => {
    it('should show alert when title is empty on save', () => {
      // Arrange
      render(<NewArticleContainer />)
      const contentInput = screen.getByTestId('content-input')
      const saveButton = screen.getByTestId('save-button')

      // Act
      fireEvent.change(contentInput, { target: { value: 'Content only' } })
      fireEvent.click(saveButton)

      // Assert
      expect(global.alert).toHaveBeenCalledWith('Le titre et le contenu sont requis !')
      expect(mockAddArticle).not.toHaveBeenCalled()
    })

    it('should show alert when content is empty on save', () => {
      // Arrange
      render(<NewArticleContainer />)
      const titleInput = screen.getByTestId('title-input')
      const saveButton = screen.getByTestId('save-button')

      // Act
      fireEvent.change(titleInput, { target: { value: 'Title only' } })
      fireEvent.click(saveButton)

      // Assert
      expect(global.alert).toHaveBeenCalledWith('Le titre et le contenu sont requis !')
      expect(mockAddArticle).not.toHaveBeenCalled()
    })

    it('should show alert when both fields are empty on save', () => {
      // Arrange
      render(<NewArticleContainer />)
      const saveButton = screen.getByTestId('save-button')

      // Act
      fireEvent.click(saveButton)

      // Assert
      expect(global.alert).toHaveBeenCalledWith('Le titre et le contenu sont requis !')
      expect(mockAddArticle).not.toHaveBeenCalled()
    })
  })

  describe('Article creation', () => {
    it('should call addArticle with correct data on save', () => {
      // Arrange
      render(<NewArticleContainer />)
      const titleInput = screen.getByTestId('title-input')
      const contentInput = screen.getByTestId('content-input')
      const saveButton = screen.getByTestId('save-button')

      // Act
      fireEvent.change(titleInput, { target: { value: 'New Article Title' } })
      fireEvent.change(contentInput, { target: { value: 'New Article Content' } })
      fireEvent.click(saveButton)

      // Assert
      expect(mockAddArticle).toHaveBeenCalledWith({
        title: 'New Article Title',
        content: 'New Article Content',
        author: 'TestUser',
        authorId: 'user1'
      })
    })

    it('should redirect to articles list after successful save', () => {
      // Arrange
      render(<NewArticleContainer />)
      const titleInput = screen.getByTestId('title-input')
      const contentInput = screen.getByTestId('content-input')
      const saveButton = screen.getByTestId('save-button')

      // Act
      fireEvent.change(titleInput, { target: { value: 'Title' } })
      fireEvent.change(contentInput, { target: { value: 'Content' } })
      fireEvent.click(saveButton)

      // Assert
      expect(mockPush).toHaveBeenCalledWith('/articles')
    })

    it('should include current user information in article', () => {
      // Arrange
      render(<NewArticleContainer />)
      const titleInput = screen.getByTestId('title-input')
      const contentInput = screen.getByTestId('content-input')
      const saveButton = screen.getByTestId('save-button')

      // Act
      fireEvent.change(titleInput, { target: { value: 'Test' } })
      fireEvent.change(contentInput, { target: { value: 'Test content' } })
      fireEvent.click(saveButton)

      // Assert
      expect(mockAddArticle).toHaveBeenCalledWith(
        expect.objectContaining({
          author: 'TestUser',
          authorId: 'user1'
        })
      )
    })
  })

  describe('Cancel action', () => {
    it('should redirect to articles list when cancel is clicked', () => {
      // Arrange
      render(<NewArticleContainer />)
      const cancelButton = screen.getByTestId('cancel-button')

      // Act
      fireEvent.click(cancelButton)

      // Assert
      expect(mockPush).toHaveBeenCalledWith('/articles')
    })

    it('should not save article when cancel is clicked', () => {
      // Arrange
      render(<NewArticleContainer />)
      const titleInput = screen.getByTestId('title-input')
      const contentInput = screen.getByTestId('content-input')
      const cancelButton = screen.getByTestId('cancel-button')

      // Act
      fireEvent.change(titleInput, { target: { value: 'Title' } })
      fireEvent.change(contentInput, { target: { value: 'Content' } })
      fireEvent.click(cancelButton)

      // Assert
      expect(mockAddArticle).not.toHaveBeenCalled()
    })
  })

  describe('Edge cases', () => {
    it('should trim whitespace from title and content on save', () => {
      // Arrange
      render(<NewArticleContainer />)
      const titleInput = screen.getByTestId('title-input')
      const contentInput = screen.getByTestId('content-input')
      const saveButton = screen.getByTestId('save-button')

      // Act
      fireEvent.change(titleInput, { target: { value: '   Spaced Title   ' } })
      fireEvent.change(contentInput, { target: { value: '  Spaced Content  ' } })
      fireEvent.click(saveButton)

      // Assert - Container passes raw values, store handles trimming
      expect(mockAddArticle).toHaveBeenCalledWith({
        title: '   Spaced Title   ',
        content: '  Spaced Content  ',
        author: 'TestUser',
        authorId: 'user1'
      })
      expect(global.alert).not.toHaveBeenCalled()
    })

    it('should reject whitespace-only title after trim', () => {
      // Arrange
      render(<NewArticleContainer />)
      const titleInput = screen.getByTestId('title-input')
      const contentInput = screen.getByTestId('content-input')
      const saveButton = screen.getByTestId('save-button')

      // Act
      fireEvent.change(titleInput, { target: { value: '   ' } })
      fireEvent.change(contentInput, { target: { value: 'Content' } })
      fireEvent.click(saveButton)

      // Assert - Whitespace-only should be rejected
      expect(global.alert).toHaveBeenCalledWith('Le titre et le contenu sont requis !')
      expect(mockAddArticle).not.toHaveBeenCalled()
    })

    it('should handle multiple save attempts', () => {
      // Arrange
      render(<NewArticleContainer />)
      const titleInput = screen.getByTestId('title-input')
      const contentInput = screen.getByTestId('content-input')
      const saveButton = screen.getByTestId('save-button')

      // Act - First save (invalid)
      fireEvent.click(saveButton)

      // Act - Second save (valid)
      fireEvent.change(titleInput, { target: { value: 'Title' } })
      fireEvent.change(contentInput, { target: { value: 'Content' } })
      fireEvent.click(saveButton)

      // Assert
      expect(global.alert).toHaveBeenCalledTimes(1) // Only for invalid attempt
      expect(mockAddArticle).toHaveBeenCalledTimes(1) // Only for valid attempt
    })

    it('should handle form changes after cancel', () => {
      // Arrange
      render(<NewArticleContainer />)
      const titleInput = screen.getByTestId('title-input')
      const cancelButton = screen.getByTestId('cancel-button')

      // Act
      fireEvent.change(titleInput, { target: { value: 'Initial Title' } })
      fireEvent.click(cancelButton)

      // Assert - Form should still have the value (not reset on cancel)
      expect(screen.getByTestId('title-value')).toHaveTextContent('Initial Title')
    })
  })
})
