import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Tabs.css';

export class Tabs extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    const { defaultActiveKey } = this.props;
    let key = '';

    if (!defaultActiveKey) {
      React.Children.forEach(this.props.children, (child, index) => {
        if (index === 0) {
          key = child.props.tabKey;
        }
      })
    } else {
      key = defaultActiveKey
    }

    this.setState(ss => ({...ss, activeKey: key}))
  }

  handleTabClick = (tabKey) => {
    if (tabKey === this.state.activeKey) {
      return;
    }

    this.setState({activeKey: tabKey});
  };

  renderTabNavWithProps = () => {
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: child.props.tabKey === this.state.activeKey,
        onClick: this.handleTabClick
      })
    })
  };

  renderActiveTabContent = () => {
    const { children } = this.props;
    const { activeKey } = this.state;

    const activeChild = children.find(child => child.props.tabKey === activeKey);

    if (activeChild) {
      return activeChild.props.children;
    }
  };

  render () {
    const { isTabCard, tabsPrefixCls } = this.props;
    const tabsClass = isTabCard ? `${tabsPrefixCls} ${tabsPrefixCls}__card` : tabsPrefixCls;

    return (
      <div className={tabsClass}>
        <div className="tabs__nav-wrapper">
          {this.renderTabNavWithProps()}
        </div>

        <div className="tabs__content-wrapper">
          {this.renderActiveTabContent()}
        </div>
      </div>
    );
  }
}

Tabs.defaultProps = {
  tabsPrefixCls: 'tabs'
};

Tabs.propTypes = {
  defaultActiveKey: PropTypes.string,
  isTabCard: PropTypes.bool
};
