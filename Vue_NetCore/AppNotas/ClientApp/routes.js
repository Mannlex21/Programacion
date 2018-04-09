import Notes from 'components/notes'
import FetchData from 'components/fetch-data'
import HomePage from 'components/home-page'
import Login from 'components/login'

export const routes = [
    { path: '/', component: HomePage, display: 'Home', style: 'glyphicon glyphicon-home' },
    { path: '/notes', component: Notes, display: 'Notes', style: 'glyphicon glyphicon-education' },
    { path: '/fetch-data', component: FetchData, display: 'Fetch data', style: 'glyphicon glyphicon-th-list' },
    { path: '/login', component: Login, display: 'Login', style: 'glyphicon glyphicon-th-list' }
]