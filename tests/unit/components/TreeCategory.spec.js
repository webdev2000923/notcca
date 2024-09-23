import { describe, it, expect, vi, beforeEach } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useCategoryStore } from '@/stores/categoryStore'
import TreeCategory from '@/components/TreeCategory.vue'

describe('TreeCategory', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(TreeCategory, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              category: {
                categories: [
                  {
                    id: '687086d9-e6b9-40a2-a226-5834c67a781d',
                    name: 'Europe',
                    children: [
                      { id: '487086d9-e6b9-40a2-a226-5834c67a781d', name: 'Ukraine' },
                      { id: 'e0a7380f-faec-4e4f-a915-35108857685d', name: 'Great britain' }
                    ]
                  }
                ]
              }
            }
          })
        ]
      }
    })
  })

  it('input default', async () => {
    expect(wrapper.find('ul').exists()).toBe(false)

    const input = wrapper.find('input')
    await input.setValue('vi')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.node-content')).toBeTruthy()
  })

  // it('expands and collapses categories', async () => {
  //   const firstCategory = wrapper.find('.tree-node')
  //   await firstCategory.find('.expand-icon').trigger('click')
  //   expect(firstCategory.find('.child-nodes').exists()).toBe(false)

  //   await firstCategory.find('.expand-icon').trigger('click')
  //   expect(firstCategory.find('.child-nodes').exists()).toBe(true)
  // })

  // it('selects and deselects categories', async () => {
  //   const store = useCategoryStore()
  //   const firstCategory = wrapper.find('.tree-node')

  //   await firstCategory.find('.checkbox').trigger('click')
  //   expect(store.selectCategory).toHaveBeenCalled()

  //   await firstCategory.find('.checkbox').trigger('click')
  //   expect(store.removeCategory).toHaveBeenCalled()
  // })
})
