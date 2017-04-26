import Vue from 'vue';
import Router from 'vue-router';
import Room from '../components/room/room';
import Begin from '../components/begin/begin';
import App from '../App';
Vue.use(Router);

export default new Router({
	routes: [
	{
		path: '/',
		name: 'app',
		component: App
	},
	{
		path: '/room',
		name: 'room',
		component: Room
	},
	{
		path: '/begin',
		name: 'begin',
		component: Begin
	}
	]
});
