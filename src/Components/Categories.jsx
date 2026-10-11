import { Form } from 'react-bootstrap'

function Categories({ categories = [], categoriesSelect, setCategoriesSelected }) {
  return (
    <aside className="category-sidebar">
      <div className="sidebar-title-row">
        <div><span className="blue-kicker">BROWSE</span><h2>Categories</h2></div>
        <span className="category-count">{categories.length}</span>
      </div>
      <hr />
      <div className="category-options">
        <Form.Check
          checked={!categoriesSelect}
          onChange={() => setCategoriesSelected('')}
          type="radio"
          name="category"
          id="category-all"
          label="All products"
        />
        {categories.map((category) => (
          <Form.Check
            checked={categoriesSelect?.id === category.id}
            onChange={() => setCategoriesSelected(category)}
            key={category.id}
            type="radio"
            name="category"
            id={`category-${category.id}`}
            label={category.name}
          />
        ))}
      </div>
    </aside>
  )
}

export default Categories
