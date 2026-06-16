import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('shows node description fields only after clicking the edit icon', () => {
    render(<App />)

    // Description field should not be visible initially
    expect(screen.queryByLabelText('Node description')).not.toBeInTheDocument()

    // Click node to select it (no modal yet)
    fireEvent.click(screen.getByRole('button', { name: /Central Idea/i }))
    expect(screen.queryByLabelText('Node description')).not.toBeInTheDocument()

    // Click edit icon to open modal
    fireEvent.click(screen.getByRole('button', { name: /Edit node/i }))

    expect(screen.getByLabelText('Node description')).toBeInTheDocument()
  })

  it('adds a child node after filling in the new node modal and saving', () => {
    render(<App />)

    // Select the root node
    fireEvent.click(screen.getByRole('button', { name: /Central Idea/i }))

    // Click "Add child node" – this now opens the new-node modal
    fireEvent.click(screen.getByRole('button', { name: /Add child node/i }))

    // The new-node modal should be visible
    expect(screen.getByLabelText('Node title')).toBeInTheDocument()

    // Click Save to create the node
    fireEvent.click(screen.getByRole('button', { name: /Save/i }))

    expect(screen.getByRole('button', { name: /New node/i })).toBeInTheDocument()
  })

  it('cancels new node creation when the modal is closed without saving', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Central Idea/i }))
    fireEvent.click(screen.getByRole('button', { name: /Add child node/i }))

    // Close without saving
    fireEvent.click(screen.getByLabelText('Close'))

    expect(screen.queryByRole('button', { name: /New node/i })).not.toBeInTheDocument()
  })

  it('switches to spanish labels', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Language'), {
      target: { value: 'es' },
    })

    expect(screen.getByRole('button', { name: 'Menú' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Agregar subnodo' })).toBeInTheDocument()
  })
})
