import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import RegistrationContainer from '@/components/auth/containers/RegistrationContainer'
import { useUserStore } from '@/stores/userStore'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../../stores/userStore', () => ({
  useUserStore: jest.fn(),
}))

jest.mock('../../../components/auth/presenters/RegistrationPresenter', () => {
  return function MockRegistrationPresenter(props: {
    formData: { username: string; email: string; password: string }
    isLoading: boolean
    error: string
    onSubmit: (e: React.FormEvent) => void
    onInputChange: (field: string, value: string) => void
  }) {
    return (
      <div data-testid="registration-presenter">
        <div data-testid="form-data">{JSON.stringify(props.formData)}</div>
        <div data-testid="loading">{props.isLoading.toString()}</div>
        <div data-testid="error">{props.error}</div>
        <button 
          onClick={(e) => props.onSubmit(e)}
          data-testid="submit-button"
        >
          Submit
        </button>
        <input
          data-testid="username-input"
          onChange={(e) => props.onInputChange('username', e.target.value)}
        />
        <input
          data-testid="email-input"
          onChange={(e) => props.onInputChange('email', e.target.value)}
        />
        <input
          data-testid="password-input"
          onChange={(e) => props.onInputChange('password', e.target.value)}
        />
      </div>
    )
  }
})

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockUseUserStore = useUserStore as jest.MockedFunction<typeof useUserStore>

describe('RegistrationContainer', () => {
  const mockPush = jest.fn()
  const mockAddUser = jest.fn()
  const mockCheckIfUsernameOrEmailExists = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()    
    jest.spyOn(console, 'error').mockImplementation(() => {})
    
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    })

    mockUseUserStore.mockReturnValue({
      addUser: mockAddUser,
      checkIfUsernameOrEmailExists: mockCheckIfUsernameOrEmailExists,
    })
  })

  afterEach(() => {
    // Restaurer console.error après chaque test
    jest.restoreAllMocks()
  })

  it('should render RegistrationPresenter with initial props', () => {
    // Arrange
    
    // Act
    render(<RegistrationContainer />)
    
    // Assert
    expect(screen.getByTestId('registration-presenter')).toBeInTheDocument()
    expect(screen.getByTestId('form-data')).toHaveTextContent('{"username":"","email":"","password":""}')
    expect(screen.getByTestId('loading')).toHaveTextContent('false')
    expect(screen.getByTestId('error')).toHaveTextContent('')
  })

  it('should update form data when onInputChange is called', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<RegistrationContainer />)
    const usernameInput = screen.getByTestId('username-input')
    
    // Act
    await user.type(usernameInput, 'john')
    
    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('form-data')).toHaveTextContent('"username":"john"')
    })
  })

  it('should show error when required fields are missing', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<RegistrationContainer />)
    const submitButton = screen.getByTestId('submit-button')
    
    // Act
    await user.click(submitButton)
    
    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Tous les champs sont obligatoires')
    })
  })

  it('should show error when username or email already exists', async () => {
    // Arrange
    const user = userEvent.setup()
    mockCheckIfUsernameOrEmailExists.mockReturnValue(true)
    render(<RegistrationContainer />)
    
    await user.type(screen.getByTestId('username-input'), 'existinguser')
    await user.type(screen.getByTestId('email-input'), 'test@test.com')
    await user.type(screen.getByTestId('password-input'), 'password123')
    
    const submitButton = screen.getByTestId('submit-button')
    
    // Act
    await user.click(submitButton)
    
    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Le nom d\'utilisateur ou l\'email existe déjà')
    })
  })

  it('should successfully register user and redirect', async () => {
    // Arrange
    const user = userEvent.setup()
    mockCheckIfUsernameOrEmailExists.mockReturnValue(false)
    render(<RegistrationContainer />)

    await user.type(screen.getByTestId('username-input'), 'john')
    await user.type(screen.getByTestId('email-input'), 'john@test.com')
    await user.type(screen.getByTestId('password-input'), 'password123')
    
    const submitButton = screen.getByTestId('submit-button')
    
    // Act
    await user.click(submitButton)
    
    // Assert
    await waitFor(() => {
      expect(mockAddUser).toHaveBeenCalledWith({
        id: expect.any(String),
        username: 'john',
        email: 'john@test.com',
        password: 'password123'
      })
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })

  it('should handle registration error', async () => {
    // Arrange
    const user = userEvent.setup()
    mockCheckIfUsernameOrEmailExists.mockReturnValue(false)
    mockAddUser.mockImplementation(() => {
      throw new Error('Registration failed')
    })
    render(<RegistrationContainer />)
    
    await user.type(screen.getByTestId('username-input'), 'john')
    await user.type(screen.getByTestId('email-input'), 'john@test.com')
    await user.type(screen.getByTestId('password-input'), 'password123')
    
    const submitButton = screen.getByTestId('submit-button')
    
    // Act
    await user.click(submitButton)
    
    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Erreur lors de l\'inscription')
    })
  })
})
