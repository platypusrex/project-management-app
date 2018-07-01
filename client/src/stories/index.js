import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import styles from "@sambego/storybook-styles";

// Components
import { Welcome } from '@storybook/react/demo';
import { Button } from "../shared/components/Button";
import { Card } from '../shared/components/Card';
import { Input } from '../shared/components/Input';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Buttons')} />);

storiesOf('Atoms')
  .addDecorator(styles({
    padding: '0 25px'
  }))
  .addWithChapters('Buttons', {
    useTheme: false,
    chapters: [
      {
        sections: [
          {
            title: 'Default Button',
            subtitle: 'style and props for the default button',
            sectionFn: () => (
              <Button type="default" onClick={action('Button clicked.')}>
                Default
              </Button>
            ),
            options: {
              allowPropTablesToggling: false
            }
          },

          {
            title: 'Primary Button',
            subtitle: 'style and props for the primary button',
            sectionFn: () => (
              <Button type="primary" onClick={action('Button Clicked')}>
                Primary
              </Button>
            ),
            options: {
              allowPropTablesToggling: false
            }
          },

          {
            title: 'Danger Button',
            subtitle: 'style and props for the primary button',
            sectionFn: () => (
              <Button type="danger" onClick={action('Button Clicked')}>
                Primary
              </Button>
            ),
            options: {
              allowPropTablesToggling: false
            }
          },

          {
            title: 'Disabled Button',
            subtitle: 'style and props for the disabled button',
            sectionFn: () => (
              <Button disabled={true} onClick={action('Button Clicked')}>
                Primary
              </Button>
            ),
            options: {
              showPropTables: true
            }
          }
        ]
      }
    ]
  })
  .addWithChapters('Cards', {
    useTheme: false,
    chapters: [
      {
        sections: [
          {
            title: 'Simple Card',
            subtitle: 'Example of a simple card component',
            sectionFn: () => (
              <Card style={{maxWidth: '400px'}}>
                This is a simple card
              </Card>
            ),
            options: {
              allowPropTablesToggling: false
            }
          },

          {
            title: 'Card with title',
            subtitle: 'Example of a simple card component with title',
            sectionFn: () => (
              <Card title="Card Title" style={{maxWidth: '400px'}}>
                This is a simple card
              </Card>
            ),
            options: {
              allowPropTablesToggling: false
            }
          },

          {
            title: 'Card with title and extra',
            subtitle: 'Example of a simple card component with title and extra',
            sectionFn: () => (
              <Card
                title="Card Title"
                extra={<a style={{color: 'cornflowerblue'}}>extra</a>}
                style={{maxWidth: '400px'}}
              >
                This is a simple card
              </Card>
            ),
            options: {
              showPropTables: true
            }
          }
        ]
      }
    ]
  })
  .addWithChapters('Inputs', {
    useTheme: false,
    chapters: [
      {
        sections: [
          {
            title: 'Simple Input',
            subtitle: 'Example of a simple input',
            sectionFn: () => <Input style={{maxWidth: '400px'}}/>,
            options: {
              allowPropTablesToggling: false
            }
          },

          {
            title: 'Input with Placeholder',
            subtitle: 'Example of a simple input with a placeholder',
            sectionFn: () => <Input style={{maxWidth: '400px'}} placeholder="Some text here..."/>,
            options: {
              allowPropTablesToggling: false
            }
          },

          {
            title: 'Input Type',
            subtitle: 'Inputs can take several different type properties',
            sectionFn: () => <Input style={{maxWidth: '400px'}} placeholder="Password" type="password"/>,
            options: {
              allowPropTablesToggling: false
            }
          },

          {
            title: 'Disabled Input',
            subtitle: 'Example of a disabled input',
            sectionFn: () => <Input style={{maxWidth: '400px'}} placeholder="Password" disabled={true}/>,
            options: {
              showPropTables: true
            }
          },
        ]
      }
    ]
  });

storiesOf('Molecules')
  .addWithChapters('Team Card', {
    useTheme: false,
    chapters: []
  });

