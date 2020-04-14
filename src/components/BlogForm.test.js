import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('test for the form', () => {
  test('test if form is rendered by change', () => {
    const mockFunc = jest.fn()
    const { container, getByText } = render(
      <BlogForm addTestBlog = { mockFunc } />
    )
    const form = container.querySelector('form')
    const author = container.querySelector('#author')
    const title = container.querySelector('#title')
    const url = container.querySelector('#url')
    const likes = container.querySelector('#likes')

    fireEvent.change(title, {
      target: { value: 'Testing input' }
    })
    fireEvent.change(author, {
      target: { value: 'Test Author' }
    })
    fireEvent.change(url, {
      target: { value: 'test.com' }
    })
    fireEvent.change(likes, {
      target: { value: 1 }
    })

    fireEvent.submit(form)

    expect(mockFunc.mock.calls).toHaveLength(1)
    expect(mockFunc.mock.calls[0][0].author).toBe('Test Author')
  })
})