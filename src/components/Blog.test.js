import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('only author and title is defined', () => {
  const blog = {
    title: 'Test article',
    author: 'Test author',
    url: 'https://test.com',
    likes: 3
  }

  const component = render(
    <Blog blog={ blog } />
  )

  expect(component.container).toHaveTextContent('Test article')
  expect(component.container).toHaveTextContent('Test author')
  component.debug()
  expect(component.container).not.toHaveTextContent('https://test.com')
  expect(component.container).not.toHaveTextContent('likes')

})