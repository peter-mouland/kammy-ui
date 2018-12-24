/* eslint-disable react/prop-types */
import React from 'react';
import Loadable from 'react-loadable';

export const AdminHomepage = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/admin-page'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const AdminCup = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/admin-cup-page'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const AdminPlayersPage = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/admin-players-page'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const Cup = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/cup-page'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const RulesPage = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/rules-page'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const PremierLeagueTeams = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/premier-league-teams'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const ChampionshipTeams = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/championship-teams'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const LeagueOneTeams = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/league-one-teams'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const PremierLeagueRankings = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/premier-league-rankings'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const ChampionshipRankings = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/championship-rankings'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const LeagueOneRankings = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/league-one-rankings'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const TransfersPage = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/transfers-page'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const PremierLeaguePlayersPage = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/premier-league-players-page'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const ChampionshipPlayersPage = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/championship-players-page'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});

export const LeagueOnePlayersPage = Loadable.Map({
  loader: {
    Component: () => import('@kammy-ui/league-one-players-page'),
  },
  loading() {
    return ('Loading...');
  },
  render(loaded, props) {
    return React.createElement(loaded.Component.default, props, null);
  },
});
