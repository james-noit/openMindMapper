import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('shows node description fields only after selecting a node', () => {
    render(<App />)

    expect(screen.queryByLabelText('Node description')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Central Idea/i }))

    expect(screen.getByLabelText('Node description')).toBeInTheDocument()
  })

  it('adds a child node connected to selected parent', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Central Idea/i }))
    fireEvent.click(screen.getByRole('button', { name: /Add child node/i }))

    expect(screen.getByRole('button', { name: /New node/i })).toBeInTheDocument()
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
