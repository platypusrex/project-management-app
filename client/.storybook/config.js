import { configure, setAddon } from '@storybook/react';
import chaptersAddon, { setDefaults } from 'react-storybook-addon-chapters';

setDefaults({
  sectionOptions: {
    showSource: true,
    allowSourceToggling: true,
    showPropTables: false,
    allowPropTablesToggling: true,
  }
});

setAddon(chaptersAddon);

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
