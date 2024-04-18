import { Component } from '@/types/Component'
import { useEffect, useState } from 'react'
import ComponentCard from '../ComponentCard'

const MainComponentsInterface = (): JSX.Element => {
  const [components, setComponents] = useState<Component[]>()
  const testComponents: Component[] = [
    {
      id: '1',
      catalogId: '1',
      name: 'Responsive Navbar',
      type: 'CODE',
      desc: 'A responsive navbar design using HTML and CSS',
      data: '<nav>\n  <ul>\n    <li><a href="#">Home</a></li>\n    <li><a href="#">About</a></li>\n    <li><a href="#">Contact</a></li>\n  </ul>\n</nav>'
    },
    {
      id: '2',
      catalogId: '7',
      name: 'Grid Layout',
      type: 'CODE',
      desc: 'A CSS grid layout for building responsive web pages',
      data: '.container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 20px;\n}'
    },
    {
      id: '3',
      catalogId: '9',
      name: 'Carousel Component',
      type: 'CODE',
      desc: 'A simple carousel component using HTML, CSS, and JavaScript',
      data: '<div class="carousel">\n  <img src="image1.jpg" alt="Image 1">\n  <img src="image2.jpg" alt="Image 2">\n  <img src="image3.jpg" alt="Image 3">\n</div>'
    },
    {
      id: '4',
      catalogId: '4',
      name: 'Login Form',
      type: 'CODE',
      desc: 'A basic login form with username and password fields',
      data: '<form>\n  <input type="text" placeholder="Username">\n  <input type="password" placeholder="Password">\n  <button type="submit">Login</button>\n</form>'
    },
    {
      id: '5',
      catalogId: '3',
      name: 'Accordion Component',
      type: 'CODE',
      desc: 'An accordion component for displaying collapsible content',
      data: '<div class="accordion">\n  <div class="accordion-item">\n    <h2 class="accordion-header">Section 1</h2>\n    <div class="accordion-content">Content 1</div>\n  </div>\n  <div class="accordion-item">\n    <h2 class="accordion-header">Section 2</h2>\n    <div class="accordion-content">Content 2</div>\n  </div>\n</div>'
    },
    {
      id: '6',
      catalogId: '10',
      name: 'Modal Dialog',
      type: 'CODE',
      desc: 'A modal dialog box for displaying messages or forms',
      data: '<div class="modal">\n  <div class="modal-content">\n    <span class="close">&times;</span>\n    <p>This is a modal dialog.</p>\n  </div>\n</div>'
    },
    {
      id: '7',
      catalogId: '1',
      name: 'Sticky Sidebar',
      type: 'CODE',
      desc: 'A sticky sidebar that remains fixed while scrolling',
      data: '.sidebar {\n  position: sticky;\n  top: 0;\n}'
    },
    {
      id: '8',
      catalogId: '9',
      name: 'Dropdown Menu',
      type: 'CODE',
      desc: 'A dropdown menu with nested submenus',
      data: '<ul class="dropdown">\n  <li>Item 1</li>\n  <li>Item 2\n    <ul>\n      <li>Subitem 1</li>\n      <li>Subitem 2</li>\n    </ul>\n  </li>\n</ul>'
    },
    {
      id: '9',
      catalogId: '1',
      name: 'Toggle Switch',
      type: 'CODE',
      desc: 'A toggle switch component for on/off settings',
      data: '<label class="switch">\n  <input type="checkbox">\n  <span class="slider"></span>\n</label>'
    },
    {
      id: '10',
      catalogId: '4',
      name: 'Tabs Component',
      type: 'CODE',
      desc: 'A tabs component for switching between different content sections',
      data: '<div class="tabs">\n  <button class="tab">Tab 1</button>\n  <button class="tab">Tab 2</button>\n  <div class="tab-content">Content 1</div>\n  <div class="tab-content">Content 2</div>\n</div>'
    },
    {
      id: '11',
      catalogId: '3',
      name: 'Pagination Component',
      type: 'CODE',
      desc: 'A pagination component for navigating through pages of content',
      data: '<ul class="pagination">\n  <li><a href="#">1</a></li>\n  <li><a href="#">2</a></li>\n  <li><a href="#">3</a></li>\n</ul>'
    },
    {
      id: '12',
      catalogId: '6',
      name: 'Alert Component',
      type: 'CODE',
      desc: 'An alert component for displaying important messages',
      data: '<div class="alert">This is an alert message.</div>'
    },
    {
      id: '13',
      catalogId: '1',
      name: 'Tooltip Component',
      type: 'CODE',
      desc: 'A tooltip component for displaying additional information',
      data: '<div class="tooltip">Hover over me <span class="tooltiptext">Tooltip text</span></div>'
    },
    {
      id: '14',
      catalogId: '1',
      name: 'Form Validation',
      type: 'CODE',
      desc: 'Basic form validation using JavaScript',
      data: 'document.getElementById("myForm").addEventListener("submit", function(event) {\n  if (!isValid()) {\n    event.preventDefault();\n  }\n});'
    },
    {
      id: '15',
      catalogId: '2',
      name: 'Responsive Image Gallery',
      type: 'CODE',
      desc: 'A responsive image gallery with grid layout',
      data: '<div class="gallery">\n  <img src="image1.jpg" alt="Image 1">\n  <img src="image2.jpg" alt="Image 2">\n  <img src="image3.jpg" alt="Image 3">\n</div>'
    }
  ]

  useEffect(() => {
    const fetchingComponents = async (): Promise<void> => {
      const fetchedComponents = await window.db.db.fetchComponents()
      setComponents(fetchedComponents)
    }

    fetchingComponents()
  }, [])

  console.log('components: ', components)

  return (
    <ul className="bg-zinc-700 p-4 border-2 border-blue-700 rounded-lg max-h-fit grid grid-flow-row grid-cols-3 gap-4 max-lg:grid-cols-2">
      {testComponents.map(({ id, catalogId, name, type, desc, data }) => (
        <ComponentCard
          key={id}
          catalogId={catalogId}
          id={id}
          name={name}
          desc={desc}
          type={type}
          data={data}
        />
      ))}
    </ul>
  )
}

export default MainComponentsInterface
