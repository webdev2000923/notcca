import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TreeNode from '@/components/TreeNode.vue'
import { useCategoryStore } from '@/stores/categoryStore'

describe('TreeNode', () => {
  const createWrapper = (node) => {
    return mount(TreeNode, {
      props: { node },
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            category: {
              selectedCategories: []
            }
          }
        })]
      }
    })
  }

  it('renders a node with children', () => {
    const wrapper = createWrapper({ id: '687086d9-e6b9-40a2-a226-5834c67a781d', name: 'Europe' })
    expect(wrapper.find('.node').text()).toBe('Europe')
  })

  it('renders a node without children', () => {
    const wrapper = createWrapper({
      id: '687086ea-e6b9-40a2-a226-5834c67a781d',
      name: 'Asia',
      children: [{ id: '868a248d-26df-433a-aecc-3c004e3c66d3', name: 'China' }]
    })
    expect(wrapper.find('.node-content').exists()).toBe(true)
  })

  it('toggles expansion when clicked', async () => {
    const wrapper = createWrapper({
      id: '687086d9-e6b9-40a2-a226-5834c67a781d',
      name: 'Europe',
      children: [{ id: '487086d9-e6b9-40a2-a226-5834c67a781d', name: 'Ukraine' }]
    })
    await wrapper.find('.node').trigger('click')
    const store = useCategoryStore()
    store.selectedCategories = [{ id: '687086d9-e6b9-40a2-a226-5834c67a781d', name: 'Europe' }]
    await wrapper.vm.$nextTick()
  })

  it('selects execute a node', async () => {
    const wrapper = createWrapper({ id: '687086d9-e6b9-40a2-a226-5834c67a781d', name: 'Europe' })
    const store = useCategoryStore()
    store.executeSelectedCategories = { categories: ['687086d9-e6b9-40a2-a226-5834c67a781d'] }
    await wrapper.vm.$nextTick()
  })
})