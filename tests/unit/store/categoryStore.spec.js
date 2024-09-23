import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCategoryStore } from '@/stores/categoryStore'

describe('Category Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useCategoryStore()
  })

  it('fetches categories', async () => {
    await store.fetchCategories()
    expect(store.categories)
  })

  it('selects a category', async () => {
    const category = { id: '868a248d-26df-433a-aecc-3c004e3c66d3', name: 'China' }
    store.selectCategory(category)
    expect(store.selectedCategories)
  })

  it('selects children categories', () => {
    const parentCategory = {
      id: '487086d9-e6b9-40a2-a226-5834c67a781d',
      name: 'Ukraine',
      children: [{ id: '9a434c91-13ee-4e19-94c1-47b2f95d7461', name: 'Kharkivska' }]
    }
    store.selectCategory(parentCategory)
    expect(store.selectedCategories).toHaveLength(2)
    expect(store.selectedCategories.map((c) => c.id)).toEqual([
      '487086d9-e6b9-40a2-a226-5834c67a781d',
      '9a434c91-13ee-4e19-94c1-47b2f95d7461'
    ])
  })

  it('removes a category', () => {
    const category = { id: '487086d9-e6b9-40a2-a226-5834c67a781d', name: 'Ukraine' }
    store.selectCategory(category)
    store.removeCategory(category)
    expect(store.selectedCategories).not.toContain(category)
  })
})
