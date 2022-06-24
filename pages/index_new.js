import Tabs from '../components/Tabs.js';

const tabs = new Tabs (
    '.navigation__link',
    '.tab-content',
    (tab) => {
        tabs.changeTab(tab)
    }
);
tabs.setListeners();



