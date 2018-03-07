import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { NavLink } from 'react-router-dom';
import { searchCollections } from 'Actions/collections';
import { getCollectionUrl } from 'Lib/urlHelper';
import { Icon } from 'UI';

export default class Collection extends React.Component {

  static propTypes = {
    collections: ImmutablePropTypes.orderedMap.isRequired,
  };

  state = { query: this.props.searchTerm || '' };

  renderLink = collection => {
    const collectionName = collection.get('name');
    const paidUntil = collection.get('paidUntil');

    if (!collection.get('notTemplate') && !collection.get('hide')) {
      return (
        <div
          key={`${collectionName}-block`}
          style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', flex: '1', justifyContent: 'space-between', paddingRight: '10px' }}
        >
          <NavLink
            key={collectionName}
            to={`/collections/${collectionName}`}
            className="nc-collectionPage-sidebarLink"
            activeClassName="nc-collectionPage-sidebarLink-active"
            style={{ flexDirection: 'column', alignItems: 'flex-start', flex: '1' }}
          >
            {collection.get('label')}

            <br />
            <div style={{ fontSize: '12px', display: 'block' }}> (Active until: {paidUntil ? paidUntil : 'Purchase pending'})</div>

          </NavLink>
          <NavLink
            key={`${collectionName}-settings`}
            to={`/collections/settings/entries/${collectionName}`}
            style={{ marginTop: '16px' }}
          >
            <Icon type={'settings'} />

          </NavLink>
        </div>
      );
    }

  };

  renderSettingsLinks = collection => {
    const collectionName = collection.get('name');
    const paidUntil = collection.get('paidUntil');
    const icon = collection.get('icon');
    if (collection.get('notTemplate')) {
      return (
        <div>
          <NavLink
            key={collectionName}
            to={`/collections/${collectionName}`}
            className="nc-collectionPage-sidebarLink"
            activeClassName="nc-collectionPage-sidebarLink-active"
            style={{ marginTop: '0px', marginBottom: '0px' }}
          >
            {icon ? <Icon type={icon} /> : null}
            {collection.get('label')}
          </NavLink>
        </div>
      );
    }

  };


  render() {
    const { collections } = this.props;
    const { query } = this.state;

    return (
      <div className="nc-collectionPage-sidebar">
        <h1 className="nc-collectionPage-sidebarHeading">Hotels</h1>
        <div className="nc-collectionPage-sidebarSearch"
        >
          <Icon type="search" size="small" />
          <input
            onChange={e => this.setState({ query: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && searchCollections(query)}
            placeholder="Search all"
            value={query}
          />
        </div>
        {collections.toList().map(this.renderLink)}
        <h1 className="nc-collectionPage-sidebarHeading">Other</h1>
        <div>
          {collections.toList().map(this.renderSettingsLinks)}
        </div>
      </div>
    );
  }
}
