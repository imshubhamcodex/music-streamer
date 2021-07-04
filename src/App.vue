<template>
	<div class="container-box no-select">
		<div class="bg-dark h-screen" style="overflow-y:hidden;overflow-x:hidden;">
			<div class="flex" style="height: 90vh;">
				<!--side nav -->
				<div v-show="nav_show" class="w-56 bg-black h-full flex-none side-nav-div">
					<div class="p-6 flex item center justify-between">
						<h1 class="text-xl font-bold text-white">Music Archive</h1>
					</div>
					<div class="mx-2" style="color: white">
						<button
							v-for="page in pages"
							:key="page.id"
							@click="setID = page.id"
							:class="`w-full text-xs font-semibold rounded px-3 py-2 my-2 flex items-center justify-start ${
								setID === page.id ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">{{ page.icon }}</i>
							<p>{{ page.name }}</p>
						</button>
					</div>
					<div class="mx-2" style="color: white">
						<h1 class="text-xs text-lightest tracking-widget uppercase">Playlist</h1>
						<button
							@click="setID = 'favorite'"
							:class="` mt-2 w-full text-xs font-semibold rounded px-3 py-2 flex items-center justify-start ${
								setID === 'favorite' ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">favorite</i>
							<p>Favorite</p>
						</button>
					</div>
					<div class="h-px w-full bg-light my-3"></div>

					<div class="relative pt-3">
						<div class="flex items-center justify-start pl-2">
							<img
								:src="`${this.currentPlaying.src}`"
								alt="playing music"
								style="height: 200px; width: 205px"
							/>
						</div>
						<h1 class="pl-2 mt-2 text-sm font-semibold text-white tracking wide">
							{{ this.currentPlaying.title }}
						</h1>
						<h2 class="pl-2 text-xs text-lightest text-white tracking wide">
							{{ this.currentPlaying.artist }}
						</h2>
					</div>
				</div>

				<!--main content -->
				<div class="w-full h-full relative" style="color: white; overflow-y: auto">
					<!--header -->
					<div class="bg-dark w-full sticky top-0 p-2 h-16" style="z-index: 99">
						<!-- <button class="px-3 py-2 mt-5 ml-2 hover:text-white hover:text-white">
							<i @click="toggleNav()" class="material-icons mr-3 text-white">menu</i>
						</button> -->
						<button
							@click="toggleNav()"
							class="px-3 py-2 mt-5 ml-2 hover:text-white hover:text-white"
							style="zoom: 0.7; width: 50px; height: 50px; border-radius: 50%; border: 1px solid white"
						>
							<i class="material-icons mr-3 text-sm hover:text-white" style="zoom: 1.5">menu</i>
						</button>
						<span class="ml-5"></span>
						<button
							class="px-3 py-2 mt-5 ml-2 hover:text-white hover:text-white"
							style="zoom: 0.5; width: 50px; height: 50px; border-radius: 50%; border: 1px solid white"
						>
							<i class="material-icons mr-3 text-sm hover:text-white" style="zoom: 1.5">arrow_left</i>
						</button>
						<span class="ml-5"></span>
						<button
							class="px-3 py-2 mt-5 ml-2 hover:text-white hover:text-white"
							style="zoom: 0.5; width: 50px; height: 50px; border-radius: 50%; border: 1px solid white"
						>
							<i class="material-icons mr-3 text-sm hover:text-white" style="zoom: 1.5">arrow_right</i>
						</button>
					</div>
					<!--header end-->

					<!--cards recent played -->
					<div class="px-6 py-5">
						<div class="px-3 py-1 flex item center justify-between">
							<h1 class="text-2xl font-semibold text-white tracking-wider">Recent Played</h1>
							<h2 class="text-xs font-semibold text-white tracking-wider hover:underline uppercase">
								see all
							</h2>
						</div>
						<div class="w-full flex flex-wrap flex_div">
							<div class="p-2 w-48 relative" v-for="(recent, index) in recents" :key="index + 'recent'">
								<div
									class="
										absolute
										w-full
										h-full
										flex
										items-end
										justify-end
										p-8
										opacity-0
										hover:opacity-100
									"
									style="cursor: pointer"
								>
									<div
										class="bg-green rounded-full h-10 w-10 flex item center justify-center"
										:id="recent.id"
										@click="recentPlay(recent.id)"
									>
										<i class="material-icons text-2xl pt-1" style="color: white">play_arrow</i>
									</div>
									<div
										class="rounded-full h-10 w-10 flex item center justify-center"
										style="
											color: white;
											top: 10px;
											position: absolute;
											right: 35px;
											background: grey;
										"
									>
										<i class="material-icons text-2xl pt-1">favorite</i>
									</div>
								</div>

								<div class="bg-light w-full h-auto p-5">
									<img :src="`${recent.src}`" class="w-full h-auto shadow rounded mb-2" />
									<h1 class="text-sm font-semibold text-white tracking wide">
										{{ recent.title }}
									</h1>
									<h2 class="text-xs text-lightest text-white tracking wide">
										{{ recent.artist }}
									</h2>
								</div>
							</div>
						</div>
					</div>
					<!--cards recent played  close-->

					<!--cards made for you -->
					<div class="px-6 py-5" style="padding-bottom:25px;">
						<div class="px-3 py-1 flex item center justify-between">
							<h1 class="text-2xl font-semibold text-white tracking-wider">Made for You</h1>
							<h2 class="text-xs font-semibold text-white tracking-wider hover:underline uppercase">
								see all
							</h2>
						</div>
						<h2 class="ml-2 mb-1 text-xs text-lightest text-white tracking-wider">
							Get better recommendation more you listen
						</h2>
						<div class="w-full flex flex-wrap flex_div">
							<div class="p-2 w-48 relative" v-for="(custom, index) in customs" :key="index + 'customes'">
								<div
									class="
										absolute
										w-full
										h-full
										flex
										items-end
										justify-end
										p-8
										opacity-0
										hover:opacity-100
									"
									:id="custom.id + 'hover'"
									style="cursor: pointer"
								>
									<div
										class="bg-green rounded-full h-10 w-10 flex item center justify-center"
										:id="custom.id"
										@click="customPlay(custom.id)"
									>
										<i class="material-icons text-2xl pt-1" style="color: white">play_arrow</i>
									</div>
									<div
										class="rounded-full h-10 w-10 flex item center justify-center"
										style="
											color: white;
											top: 10px;
											position: absolute;
											right: 35px;
											background: grey;
										"
									>
										<i class="material-icons text-2xl pt-1">favorite</i>
									</div>
								</div>

								<div class="bg-light w-full h-auto p-5">
									<img :src="`${custom.src}`" class="w-full h-auto shadow rounded mb-2" />
									<h1 class="text-sm font-semibold text-white tracking wide">
										{{
											custom.title.length > 14
												? custom.title.substring(0, 13) + '...'
												: custom.title
										}}
									</h1>
									<h2 class="text-xs text-lightest text-white tracking wide">
										{{
											custom.artist.length > 14
												? custom.artist.substring(0, 13) + '...'
												: custom.artist
										}}
									</h2>
								</div>
							</div>
						</div>
					</div>
					<!--cards made for you close -->
				</div>
			</div>
			<!--play bar -->
			<div
				@click="showplayer()"
				class="w-full bg-light"
				style="
					height: 10vh;
					color: white;
					cursor: pointer;
					float: both;
					position: fixed;
					bottom: 0px;
					z-index: 9999;
				"
			>
				<div class="px-3 py-1 flex item center justify-between">
					<div class="relative">
						<div class="flex items-center justify-center pl-2">
							<img
								:src="`${this.currentPlaying.src}`"
								class="w-15 h-12 shadow pt-2 mt-1"
								alt="playing music"
								style="width: 40px; height: 45px"
							/>
							<h1 class="pl-2 text-sm font-semibold text-white tracking wide">
								{{ this.currentPlaying.title }}
							</h1>
							<h2 class="pl-2 text-xs text-lightest text-white tracking wide">
								{{ this.currentPlaying.artist }}
							</h2>
						</div>
					</div>
					<div class="flex item center justify-around">
						<i
							class="material-icons mr-3 text-sm hover:text-white mt-1"
							style="zoom: 2; cursor: pointer"
							id="arrow_btn_tog"
							>arrow_drop_up</i
						>

						<i
							class="material-icons mr-3 text-sm hover:text-white mt-1"
							style="zoom: 2; cursor: pointer; margin-right: 0px"
							@click="closeMusic()"
							>close</i
						>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-dark player-div" style="top: 0; height: 50vh; width: 100vw; z-index: 100">
			<Player
				style="z-index: 100"
				:playList="this.playList"
				:playSong="this.currentPlaying.playing"
				@update-selected-index="updateSelectedIndex"
				@click-on-play="clickOnPlay"
				@click-on-pause="clickOnPause"
			/>
		</div>
		<!-- <router-view /> -->
	</div>
</template>

<script>
import Player from './components/Player.vue';
import axios from 'axios';
export default {
	components: {
		Player,
	},
	data() {
		return {
			pages: [
				{ id: 'home', name: 'Home', icon: 'home' },
				{ id: 'search', name: 'Search', icon: 'search' },
				{ id: 'Library', name: 'Your Library', icon: 'bar_chart' },
			],
			recents: [
				{
					src: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/126177408/original/8d52c9af80ab728d2f426db259f49ede0ed4ae21/create-an-outstanding-video-thumbnail.jpg',
					title: 'Title - recent',
					artist: 'Shubham',
					id: 'mid0',
					file: 'https://firebasestorage.googleapis.com/v0/b/streamer-22d50.appspot.com/o/01%20-%20Tera%20Suroor(MyMp3Song.Com).mp3?alt=media&token=c039f798-9e9d-43a4-8e8a-62d8506eb8c3',
				},
				{
					src: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/126177408/original/8d52c9af80ab728d2f426db259f49ede0ed4ae21/create-an-outstanding-video-thumbnail.jpg',
					title: 'Title - recent',
					artist: 'Shubham',
					id: 'mid3',
					file: 'https://firebasestorage.googleapis.com/v0/b/streamer-22d50.appspot.com/o/01%20-%20Tera%20Suroor(MyMp3Song.Com).mp3?alt=media&token=c039f798-9e9d-43a4-8e8a-62d8506eb8c3',
				},
				{
					src: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/126177408/original/8d52c9af80ab728d2f426db259f49ede0ed4ae21/create-an-outstanding-video-thumbnail.jpg',
					title: 'Title - recent',
					artist: 'Shubham',
					id: 'mid4',
					file: 'https://firebasestorage.googleapis.com/v0/b/streamer-22d50.appspot.com/o/01%20-%20Tera%20Suroor(MyMp3Song.Com).mp3?alt=media&token=c039f798-9e9d-43a4-8e8a-62d8506eb8c3',
				},
				{
					src: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/126177408/original/8d52c9af80ab728d2f426db259f49ede0ed4ae21/create-an-outstanding-video-thumbnail.jpg',
					title: 'Title - recent',
					artist: 'Shubham',
					id: 'mid5',
					file: 'https://firebasestorage.googleapis.com/v0/b/streamer-22d50.appspot.com/o/01%20-%20Tera%20Suroor(MyMp3Song.Com).mp3?alt=media&token=c039f798-9e9d-43a4-8e8a-62d8506eb8c3',
				},
				{
					src: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/126177408/original/8d52c9af80ab728d2f426db259f49ede0ed4ae21/create-an-outstanding-video-thumbnail.jpg',
					title: 'Title - recent',
					artist: 'Shubham',
					id: 'mid6',
					file: 'https://firebasestorage.googleapis.com/v0/b/streamer-22d50.appspot.com/o/01%20-%20Tera%20Suroor(MyMp3Song.Com).mp3?alt=media&token=c039f798-9e9d-43a4-8e8a-62d8506eb8c3',
				},
			],
			customs: [],

			currentPlaying: {
				src: 'https://m.media-amazon.com/images/M/MV5BMjE2MTcyMjMyNF5BMl5BanBnXkFtZTgwODg2ODU1MDE@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
				title: 'Select music',
				artist: 'Shubham',
				id: null,
				playing: false,
				file: 'https://firebasestorage.googleapis.com/v0/b/streamer-22d50.appspot.com/o/01%20-%20Tera%20Suroor(MyMp3Song.Com).mp3?alt=media&token=c039f798-9e9d-43a4-8e8a-62d8506eb8c3',
			},

			playList: [],

			setID: 'home',
			player: false,
			nav: false,
			nav_show: false,
		};
	},
	methods: {
		updateSelectedIndex(id) {
			this.stop(this.currentPlaying.id);
			this.startAndSet(id);
		},
		clickOnPlay(id) {
			document.getElementById(id + 'hover').classList.remove('opacity-0');

			document.getElementById(id + 'hover').classList.add('opacity-100');

			document.getElementById(
				id
			).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;padding-left:145px;">stop_arrow</i>`;
		},
		clickOnPause(id) {
			document.getElementById(id + 'hover').classList.remove('opacity-100');

			document.getElementById(id + 'hover').classList.add('opacity-0');

			document.getElementById(
				id
			).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;
		},
		closeMusic() {
			console.log('close');
		},

		showplayer() {
			if (!this.player) {
				let div = document.getElementsByClassName('player-div')[0].style;
				div.position = 'absolute';
				div.visibility = 'visible';
				div.opacity = '1';
				div.transform = 'translateY(0%)';

				document.getElementById('arrow_btn_tog').textContent = 'arrow_drop_down';
			} else {
				let div = document.getElementsByClassName('player-div')[0].style;
				div.visibility = 'hidden';
				div.opacity = '0';
				div.transform = 'translateY(100%)';
				document.getElementById('arrow_btn_tog').textContent = 'arrow_drop_up';
			}

			this.player = !this.player;
		},

		toggleNav() {
			if (!this.nav) {
				let div = document.getElementsByClassName('side-nav-div')[0].style;
				div.visibility = 'visible';
				div.opacity = '1';
				div.transform = 'translateX(0%)';
			} else {
				let div = document.getElementsByClassName('side-nav-div')[0].style;
				div.visibility = 'hidden';
				div.opacity = '0';
				div.transform = 'translateX(-100%)';
			}

			setTimeout(() => {
				this.nav_show = !this.nav_show;
			}, 350);

			this.nav = !this.nav;
		},

		// Handling music play

		startAndSet(id) {
			// start clicked music
			this.start(id);

			// set playing song
			let music = [...this.recents, ...this.customs].filter((ele) => {
				return ele.id === id;
			});

			this.currentPlaying = music[0];
			this.currentPlaying.playing = true;
		},

		start(id) {
			document.getElementById(id + 'hover').classList.remove('opacity-0');

			document.getElementById(id + 'hover').classList.add('opacity-100');

			// start music
			document.getElementById(
				id
			).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;padding-left:145px;">stop_arrow</i>`;

			this.currentPlaying.playing = true;
		},

		stop(id) {
			document.getElementById(id + 'hover').classList.remove('opacity-100');

			document.getElementById(id + 'hover').classList.add('opacity-0');

			// start music
			document.getElementById(
				id
			).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;

			this.currentPlaying.playing = false;
		},

		stopStartAndSet(id) {
			// stop playing song
			document.getElementById(
				this.currentPlaying.id
			).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;

			document.getElementById(this.currentPlaying.id + 'hover').classList.remove('opacity-100');

			document.getElementById(this.currentPlaying.id + 'hover').classList.add('opacity-0');

			this.start(id);

			// set playing song
			let music = [...this.recents, ...this.customs].filter((ele) => {
				return ele.id === id;
			});
			this.currentPlaying = music[0];
			this.currentPlaying.playing = true;
		},

		recentPlay(id) {
			if (this.currentPlaying.id === null) {
				this.startAndSet(id);
			} else {
				if (this.currentPlaying.playing && this.currentPlaying.id === id) {
					this.stop(id);
				} else if (this.currentPlaying.playing && this.currentPlaying.id !== id) {
					this.stopStartAndSet(id);
				} else if (!this.currentPlaying.playing && this.currentPlaying.id === id) {
					this.start(id);
				} else if (!this.currentPlaying.playing && this.currentPlaying.id !== id) {
					this.startAndSet(id);
				}
			}

			if (this.currentPlaying.playing) {
				let arrList = [...this.recents];
				let index = arrList.findIndex((item) => item.id === this.currentPlaying.id);

				if (index >= 0) this.playList = arrList.splice(index);
			}
		},

		customPlay(id) {
			if (this.currentPlaying.id === null) {
				this.startAndSet(id);
			} else {
				if (this.currentPlaying.playing && this.currentPlaying.id === id) {
					this.stop(id);
				} else if (this.currentPlaying.playing && this.currentPlaying.id !== id) {
					this.stopStartAndSet(id);
				} else if (!this.currentPlaying.playing && this.currentPlaying.id === id) {
					this.start(id);
				} else if (!this.currentPlaying.playing && this.currentPlaying.id !== id) {
					this.startAndSet(id);
				}
			}

			if (this.currentPlaying.playing) {
				let arrList = [...this.customs];
				let index = arrList.findIndex((item) => item.id === this.currentPlaying.id);

				if (index >= 0) this.playList = arrList.splice(index);
			}
		},
	},

	mounted() {
		axios
			.get('https://us-central1-streamer-22d50.cloudfunctions.net/getMusic')
			.then((response) => {
				// handle success
				console.log(response.data);
				response.data.forEach((ele) => {
					let obj = {
						artist: ele.artist,
						file: ele.downloadUrl,
						genre: ele.genre,
						id: ele.id,
						title: ele.title,
						src: 'https://www.legalzoom.com/sites/lz.com/files/inline-images/xwoman-blue-dress-playing-blue-guitar.jpg.pagespeed.ic.oksHaDquuG.jpg',
					};
					this.customs.push(obj);
				});
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	},

	created() {
		var x = window.scrollX;
		var y = window.scrollY;
		window.onscroll = function () {
			window.scrollTo(x, y);
		};
	},
};
</script>

<style>
::selection {
	color: none;
	background: none;
}
/* For Mozilla Firefox */
::-moz-selection {
	color: none;
	background: none;
}

button {
	outline: none !important;
}
.player-div {
	visibility: hidden;
	opacity: 0;
	transform: translateY(100%);
	transition: all 0.3s ease-out;
}
.side-nav-div {
	visibility: visible;
	opacity: 1;
	transform: translateX(0%);
	transition: all 0.3s ease-out;
}
.html {
	overflow-x: hidden;
	overflow-y: scroll;
	-ms-overflow-style: none; /* Internet Explorer 10+ */
}
body{
	overflow-x: hidden;
	overflow-y: hidden;
}
html::-webkit-scrollbar {
	/* WebKit */
	width: 0;
	height: 0;
}

.no-select {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-webkit-tap-highlight-color: transparent;
}

@media (max-width: 420px) {
	.flex_div > div {
		flex: 1 0 50%;
	}

	.flex_div > div:first-child {
		flex: 0 1 100%;
	}
}
</style>
