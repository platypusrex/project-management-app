import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';
import { Dropdown } from "../../../shared/components/Dropdown";
import { DropdownMenu } from "../../../shared/components/DropdownMenu";
import Icon from 'react-ionicons';
import { withState } from "../../../shared/containers/withState";
import {removeAuthToken, withUserId} from "../../../shared/utils/localStorageUtil";
import { withUserName } from "../../../api/user/withUserName";
import '../../../styles/layout/UserMenu.css';

const initialState = {
  isMenuOpen: false,
};

const UserMenuComponent = (props) => {
  const { username, menuPrefixCls, state } = props;
  const menuClass = state.isMenuOpen ? `${menuPrefixCls} ${menuPrefixCls}--open` : menuPrefixCls;

  const overlay = (
    <DropdownMenu
      menuItems={['profile', 'logout']}
      onClick={menuItem => props.handleMenuItemClick(menuItem)}
    />
  );

  return (
    <Dropdown overlay={overlay}>
      <div className={menuClass}>
        <span className="user-menu__username">{username}</span>
        <Icon icon="ios-arrow-down" fontSize="18px" style={{cursor: 'pointer'}}/>
      </div>
    </Dropdown>
  );
};

UserMenuComponent.defaultProps = {
  menuPrefixCls: 'user-menu',
};

export const UserMenu = compose(
  withRouter,
  withUserId,
  withUserName,
  withState(initialState),
  withHandlers({
    handleMenuItemClick: (props) => (menuItem) => {
      if (menuItem === 'profile') {

      }

      if (menuItem === 'logout') {
        removeAuthToken();
        props.history.push('/');
      }
    }
  })
)(UserMenuComponent);
