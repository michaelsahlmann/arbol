import { TreeNode } from '../types/TreeTypes';

export const sampleMaterialsData: TreeNode = {
  id: 'root',
  name: 'Arbol de Contenido',
  children: [
    {
      id: 'construction',
      name: 'Bienvenidos',
      link: 'https://example.com/construction',
      children: [
        {
          id: 'concrete',
          name: 'Concrete',
          link: 'https://example.com/concrete',
          children: [
            {
              id: 'portland-cement',
              name: 'Portland Cement',
              link: 'https://example.com/portland-cement',
            },
            {
              id: 'ready-mix',
              name: 'Ready-Mix Concrete',
              link: 'https://example.com/ready-mix',
            },
            {
              id: 'reinforced',
              name: 'Reinforced Concrete',
              link: 'https://example.com/reinforced',
            }
          ]
        },
        {
          id: 'wood',
          name: 'Wood Products',
          link: 'https://example.com/wood',
          children: [
            {
              id: 'plywood',
              name: 'Plywood',
              link: 'https://example.com/plywood',
            },
            {
              id: 'lumber',
              name: 'Lumber',
              link: 'https://example.com/lumber',
              children: [
                {
                  id: 'softwood',
                  name: 'Softwood Lumber',
                  link: 'https://example.com/softwood',
                },
                {
                  id: 'hardwood',
                  name: 'Hardwood Lumber',
                  link: 'https://example.com/hardwood',
                }
              ]
            },
            {
              id: 'engineered-wood',
              name: 'Engineered Wood',
              link: 'https://example.com/engineered-wood',
            }
          ]
        }
      ]
    },
    {
      id: 'electronics',
      name: 'Electronic Components',
      link: 'https://example.com/electronics',
      children: [
        {
          id: 'semiconductors',
          name: 'Semiconductors',
          link: 'https://example.com/semiconductors',
          children: [
            {
              id: 'transistors',
              name: 'Transistors',
              link: 'https://example.com/transistors',
            },
            {
              id: 'diodes',
              name: 'Diodes',
              link: 'https://example.com/diodes',
            }
          ]
        },
        {
          id: 'passive-components',
          name: 'Passive Components',
          link: 'https://example.com/passive',
          children: [
            {
              id: 'resistors',
              name: 'Resistors',
              link: 'https://example.com/resistors',
            },
            {
              id: 'capacitors',
              name: 'Capacitors',
              link: 'https://example.com/capacitors',
            },
            {
              id: 'inductors',
              name: 'Inductors',
              link: 'https://example.com/inductors',
            }
          ]
        }
      ]
    },
    {
      id: 'textiles',
      name: 'Textile Materials',
      link: 'https://example.com/textiles',
      children: [
        {
          id: 'natural-fibers',
          name: 'Natural Fibers',
          link: 'https://example.com/natural-fibers',
          children: [
            {
              id: 'cotton',
              name: 'Cotton',
              link: 'https://example.com/cotton',
            },
            {
              id: 'wool',
              name: 'Wool',
              link: 'https://example.com/wool',
            },
            {
              id: 'silk',
              name: 'Silk',
              link: 'https://example.com/silk',
            }
          ]
        },
        {
          id: 'synthetic-fibers',
          name: 'Synthetic Fibers',
          link: 'https://example.com/synthetic-fibers',
          children: [
            {
              id: 'polyester',
              name: 'Polyester',
              link: 'https://example.com/polyester',
            },
            {
              id: 'nylon',
              name: 'Nylon',
              link: 'https://example.com/nylon',
            },
            {
              id: 'acrylic',
              name: 'Acrylic',
              link: 'https://example.com/acrylic',
            }
          ]
        }
      ]
    }
  ]
};