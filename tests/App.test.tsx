import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App'
import type { Application } from '../src/types'

vi.mock('../src/components/ApplicationGraph', () => ({
  ApplicationGraph: () => <div data-testid="application-graph" />,
}))

const STORAGE_KEY = 'gambit-applications'

const renderApp = () =>
  render(
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>,
  )

describe('application state updates', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('updates and clears the selected resource state', async () => {
    const user = userEvent.setup()
    renderApp()
    const resource = screen.getByRole('checkbox', {
      name: 'Select payments-api-prod',
    })
    const createButton = screen.getByRole('button', {
      name: 'Create application',
    })

    expect(resource).not.toBeChecked()
    expect(createButton).toBeDisabled()

    await user.click(resource)

    expect(resource).toBeChecked()
    expect(screen.getByText('resource selected')).toBeInTheDocument()
    expect(createButton).toBeEnabled()

    await user.click(screen.getByRole('button', { name: 'Clear selection' }))

    expect(resource).not.toBeChecked()
    expect(screen.queryByText('resource selected')).not.toBeInTheDocument()
    expect(createButton).toBeDisabled()
  })

  it('updates filtered resources and restores them when filters are cleared', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.type(
      screen.getByRole('searchbox', { name: 'Search resources by name' }),
      'receipt',
    )

    expect(screen.getByText('1 of 12 resources')).toBeInTheDocument()
    expect(screen.getByText('receipt-archive')).toBeInTheDocument()
    expect(screen.queryByText('payments-api-prod')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Clear filters' }))

    expect(screen.getByText('12 of 12 resources')).toBeInTheDocument()
    expect(screen.getByText('payments-api-prod')).toBeInTheDocument()
  })

  it('creates and persists an application from the selected resources', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(
      screen.getByRole('checkbox', { name: 'Select payments-api-prod' }),
    )
    await user.click(
      screen.getByRole('checkbox', { name: 'Select transactions-ledger' }),
    )
    await user.click(
      screen.getAllByRole('button', { name: 'Create application' })[0],
    )

    const dialog = screen.getByRole('dialog')
    await user.type(
      within(dialog).getByRole('textbox', { name: 'Application name' }),
      'Payments platform',
    )
    await user.type(
      within(dialog).getByRole('textbox', { name: /Description/ }),
      'Processes customer payments',
    )
    await user.click(
      within(dialog).getByRole('button', { name: 'Create application' }),
    )

    expect(
      await screen.findByRole('heading', { name: 'Payments platform' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Processes customer payments')).toBeInTheDocument()
    expect(screen.getByText('2 resources')).toBeInTheDocument()

    await waitFor(() => {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? '[]',
      ) as Application[]
      expect(stored).toHaveLength(1)
      expect(stored[0]).toMatchObject({
        name: 'Payments platform',
        description: 'Processes customer payments',
        resourceIds: ['r-001', 'r-002'],
      })
    })
  })

  it('loads and deletes a persisted application', async () => {
    const user = userEvent.setup()
    const storedApplication: Application = {
      id: 'app-1',
      name: 'Stored application',
      description: 'Loaded from local storage',
      resourceIds: ['r-001'],
      createdAt: '2026-01-15T12:00:00.000Z',
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify([storedApplication]))

    renderApp()
    await user.click(screen.getByRole('button', { name: /Applications/ }))

    expect(
      screen.getByRole('heading', { name: 'Stored application' }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Delete Stored application' }),
    )

    expect(
      screen.getByRole('heading', { name: 'No applications yet' }),
    ).toBeInTheDocument()
    await waitFor(() => {
      expect(localStorage.getItem(STORAGE_KEY)).toBe('[]')
    })
  })
})
